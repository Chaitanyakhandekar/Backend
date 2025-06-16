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

const getAllVideos = asyncHandler(async (req,res)=>{        // verifyJWT middleware

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const totalVideos = await Video.countDocuments();

    const videos = await Video.aggregate([
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $skip:skip
        },
        {
            $limit:limit
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            username:1,
                            fullName:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
        {
            $unwind:"$owner"
        }
        
    ])

    if(!videos){
        throw new ApiError(404,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    videos,
                    page,
                    limit,
                    totalVideos,
                    totalPages:Math.ceil(totalVideos / limit),
                    hasMore:page * limit < totalVideos
                },
                "Videos Fetched Successfully")
            )

})


export {
    uploadVideo,
    getAllVideos
}