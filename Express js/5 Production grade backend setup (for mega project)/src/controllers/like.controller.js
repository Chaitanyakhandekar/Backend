import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Like} from "../models/like.model.js"


const toggleVideoLike  = asyncHandler(async (req,res)=>{       // verifyJWT middleware

    const {id} = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400,"Invalid ID")
    }

    const isLiked = await Like.findOne({
        video:id,
        likedBy:req.user._id
    })

    console.log("isLiked = ",isLiked)
    console.log("video = ",id)
    console.log("likedBy = ",req.user._id)

    let toggledLike,message;

    if(!isLiked){        // means user doesnt like this video so create like document

         toggledLike = await Like.create({
            video:id,
            likedBy:req.user._id
        })

        if(!toggledLike){
            throw new ApiError(500,"Server Error")
        }

        message = "Liked to this Video Successfully"


    }
    else{       // means user already liked this video so now remove like

      toggledLike = await Like.findByIdAndDelete(isLiked._id)

        if(!toggledLike){
            throw new ApiError(500,"Server Error")
        }

        message = "Removed Like from this Video Successfully"

    }

    return res
        .status(200)
        .json(
            new ApiResponse(200,toggledLike,message)
        )

})

const toggleCommentLike = asyncHandler(async (req,res)=>{      // verifyJWT middleware

    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400,"Invalid ID")
    }

    let toggledLike,message

    const isLiked = await Like.findOne({
        comment:id,
        likedBy:req.user._id
    })

    if(!isLiked){       // means user not liked this comment
        
        toggledLike = await Like.create({
            comment:id,
            likedBy:req.user._id
        })

        if(!toggledLike){
            throw new ApiError(500,"Server Error")
        }

        message = "Liked to this Comment Successfully"

    }
    else{       // means user already liked this comment

        toggledLike = await Like.findByIdAndDelete(isLiked._id)

        if(!toggledLike){
            throw new ApiError(500,"Server Error")
        }

        message = "Remove Like from this Comment Successfully"

    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,toggledLike,message)
            )

})

const toggleTweetLikes = asyncHandler(async (req,res)=>{        // verifyJWT middleware

    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400,"Invalid ID")
    }

    let toggledLike,message

    const isLiked = await Like.findOne({
        tweet:id,
        likedBy:req.user._id
    })

    if(!isLiked){       // means user not liked this tweet
        
        toggledLike = await Like.create({
            tweet:id,
            likedBy:req.user._id
        })

        if(!toggledLike){
            throw new ApiError(500,"Server Error")
        }

        message = "Liked to this Tweet Successfully"

    }
    else{       // means user already liked this tweet

        toggledLike = await Like.findByIdAndDelete(isLiked._id)

        if(!toggledLike){
            throw new ApiError(500,"Server Error")
        }

        message = "Remove Like from this Tweet Successfully"

    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,toggledLike,message)
            )


})

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLikes
}