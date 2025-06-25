import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Playlist} from "../models/playlist.model.js"


const createPlaylist = asyncHandler(async (req,res)=>{      // verifyJWT middleware
    
        const {name,description} = req.body

        if(!(name && description)){
            throw new ApiError(400,"Name and Description are required Fields")
        }

        if(!name.trim() || !description.trim()){
            throw new ApiError(400,"Name and Description cannot be empty")
        }

        const playlist = await Playlist.create({
            name:name.trim(),
            description:description.trim(),
            owner:req.user._id
        })

        if(!playlist){
            throw new ApiError(500,"Server Error")
        }

        return res
                .status(201)
                .json(
                    new ApiResponse(201,playlist,"Playlist Created Successfully")
                )

})

const updatePlaylist = asyncHandler(async (req,res)=>{      // verifyJWT , validateOwnership middleware

    const {name,description,pid} = req.body

    if(!(name || description)){
        throw new ApiError(400,"Atleast One Field is Required for Update Playlist")
    }

    if((name && !name.trim()) || (description && !description.trim())){
        throw new ApiError(400,"Field Cannot be Empty")
    }

    const isExists = await Playlist.findById(pid)

    if(!isExists){
        throw new ApiError(400,"Playlist with given ID doesnt Exists")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        pid,
        {
            $set:{
                name:name.trim() || isExists.name,
                description:description.trim() || isExists.description
            }
        },
        {
            new:true
        }
    )

    if(!updatedPlaylist){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,updatedPlaylist,"Playlist Updated Successfully")
            )

})

const addVideoToPlaylist = asyncHandler(async (req,res)=>{     // verifyJWT , validateOwnership middlewre

    const video = req.body.video

    if(!video || !mongoose.Types.ObjectId.isValid(video)){
        throw new ApiError(400,"Invalid ID")
    }

    const isExists = await Playlist.findById(req.info.pid)

    if(!isExists){
        throw new ApiError(400,"This Playlist Doesn't Exists")
    }

    if(isExists.videos.some(v => v.toString() === video)){
        throw new ApiError(400,"Video is Already Present in this Playlist")
     }

    const addedVideo = await Playlist.findByIdAndUpdate(
        req.info.pid,
        {
            $addToSet:{
                videos:video
            }
        },
        {
            new:true
        }
    )

    if(!addedVideo){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,addedVideo,"Video Added to Playlist Successfully")
            )

})

export {
    createPlaylist,
    updatePlaylist,
    addVideoToPlaylist
}