import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import mongoose from "mongoose"

export const fieldNameType = asyncHandler(async (req,res,next)=>{
     let {id,to} = req.query

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
                throw new ApiError(400,"Invalid ID")
            }
        
            if(!to){
                throw new ApiError(400,"Its Required Field")
            }
        
        let search = {
            [to]:id,
            likedBy:req.user._id
        }

        req.search = search
        req.info = {id,to}

        next()
})
