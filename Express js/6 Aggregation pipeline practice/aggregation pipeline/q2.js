    /*🔹 Q2. Check if Current User Has Liked a Video
    📘 Collections:

    videos: { _id, title }

    likes: { _id, videoId, userId }

    ✅ Task:
    For a given video ID, fetch:

    total number of likes (likesCount)

    whether the currently logged-in user (req.user._id) has liked it (isLiked: true/false) */



import mongoose from "mongoose";

const videoInfo = async (req,res)=>{
    try {
        
        const {videoId} = req.params

        if(!videoId){
            throw "error"
        }

       const likes = await Video.aggregate([
            {
                $match:{
                    _id:videoId
                }
            },
            {
                $lookup:{
                    from:"likes",
                    localField:"_id",
                    foreignField:"videoId",
                    as:"likesDocs"
                }
            },
            {
                $addFields:{
                    likesCount:{
                        $size:"$likesDocs"
                    },
                    isLiked:{
                        $anyElementTrue:{
                            $map:{
                                input:"$likesDocs",
                                as:"doc",
                                in:{$eq:[{$literal:req.user._id},"$$doc.userId"]}
                            }
                        }
                    }
                }
            },
            {
                $project:{
                    title:1,
                    likesCount:1,
                    isLiked:1
                }
            }
        ])

    } catch (error) {
       
    }
}