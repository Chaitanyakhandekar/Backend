import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Playlist} from "../models/playlist.model.js"


const createPlaylist = asyncHandler(async (req,res)=>{
    
        const {name,description} = req.body

        if(!(name && description)){
            throw new ApiError(400,"Name and Description are required Fields")
        }

        const playlist = await Playlist.create({
            name,
            description,
            owner:req.user._id
        })

        if(!playlist){
            throw new ApiError(500,"Server Error")
        }

        return res
                .status(200)
                .json(
                    new ApiResponse(200,playlist,"Playlist Created Successfully")
                )

})

export {
    createPlaylist
}