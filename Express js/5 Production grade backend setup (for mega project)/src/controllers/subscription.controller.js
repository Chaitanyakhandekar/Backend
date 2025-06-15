import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Subscription} from "../models/subscription.model.js"

const subscribeToUser = asyncHandler(async (req,res)=>{     // verifyJWT middleware

    const {channel} = req.params

    if(!channel || !mongoose.Types.ObjectId.isValid(channel)){
        throw new ApiError(400,"Channel is required")
    }

    if(req.user._id.toString() === channel){
        throw new ApiError(400,"You cannot subscribe to yuorself")
    }

    const alreadySubscribed = await Subscription.findOne({
        subscriber:req.user._id,
        channel
    })

    if(alreadySubscribed){
        throw new ApiError(400,"Already subscribed to this channel")
    }

    const subscription = await Subscription.create({
        subscriber:req.user._id,
        channel
    })


    if(!subscription){
        throw new ApiError(404,"Server error")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(201,subscription,"subscribed to user successfully ")
            )

})

const unsubscribeFromUser = asyncHandler(async (req,res)=>{  // verifyJWT middleware
    
    const {channel} = req.params

    if(!channel || !mongoose.Types.ObjectId.isValid(channel) || channel === req.user._id.toString()){
        throw new ApiError(400,"Invalid Channel ID")
    }

    const requestedChannel = await Subscription.findOne({
        subscriber:req.user._id,
        channel
    })

    if(!requestedChannel){
        throw new ApiError(400,"You are not subscribed to this channel")
    }

    const isUnsubscribed = await Subscription.findByIdAndDelete(requestedChannel._id).select("-createdAt -updatedAt -__v")

    if(!isUnsubscribed){
        throw new ApiError(404,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,isUnsubscribed,"Channel Unsubscribed Successfully")
            )

})

const getUserSubscribers = asyncHandler(async (req,res)=>{      // verifyJWT middleware

    
    
})

const getUserSubscriptions = asyncHandler(async (req,res)=>{

})

const isSubscribedToUser = asyncHandler(async (req,res)=>{

})

export{
    subscribeToUser,
    unsubscribeFromUser,
    getUserSubscribers,
    getUserSubscriptions,
    isSubscribedToUser,
}