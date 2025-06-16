import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js";
import { Video } from "../models/video.model.js";


const uploadVideo = asyncHandler(async (req, res) => {     // verifyJWT ,multer middleware

    const {title,description} = req.body

    if(!req.file){
        throw new ApiError(400,"Video File is required")
    }

    if(!(title && description)){
        throw new ApiError(400,"Title and Description are required Fields")
    }

    const cloudResult = await uploadFileOnCloudinary(req.file.path, "video")
    console.log(cloudResult)

    if(!cloudResult){
        throw new ApiError(404,"Error while uploading video")
    }

    let thumbnailUrl = cloudResult.secure_url
                                .replace("/video/upload" , "/video/upload/so_1")
                                .split(".")
    thumbnailUrl[thumbnailUrl.length - 1] = "jpg"
    thumbnailUrl=thumbnailUrl.join(".")     

    
    const newVideo = await Video.create({
        videoUrl:cloudResult.secure_url,
        thumbnail:thumbnailUrl,
        title,
        description,
        duration:cloudResult.duration,
        isPublished:true,
        owner:req.user._id
    }) 

    if(!newVideo){
        throw new ApiError(404,"Server Error")
    }
                                

    return res
        .status(201)
        .json(
            new ApiResponse(201, {
                newVideo,
                public_id: cloudResult.public_id,
                playbackUrl: cloudResult.playback_url,
                width: cloudResult.width,
                height: cloudResult.height,
                format: cloudResult.format,
                frameRate: cloudResult.frame_rate,
                rotation: cloudResult.rotation,
                uploadedAt: cloudResult.created_at,
                audio: cloudResult.audio,        // Optional: only if needed
                video: cloudResult.video         // Optional: only if needed
            }, "Video uploaded successfully")
        )
})


export {
    uploadVideo,
}