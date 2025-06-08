    /*🔹 Q6. Project Nested Fields After Lookup
    📘 After a $lookup, the resulting field is an array of documents.

    ✅ Task:
    From a user’s subscribers, extract only the subscriber’s username and return a list of usernames in a new field subscriberUsernames.

*/



import mongoose from "mongoose";

const getUsernames = async (req,res)=>{
    try {
        const {userId} = req.params

       const usernames = await User.aggregate([
        {
            $match:{
                _id:userId      // present in DB
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $addFields:{
                subscriberIds:{
                    $map:{
                        input:"$subscribers",
                        as:"sub",
                        in:"$$sub.subscriber"
                    }
                }
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"subscriberIds",
                foreignField:"_id",
                as:"users"
            }
        },
        {
            $addFields:{
                SubscribersUsernames:{
                    $map:{
                        input:"$users",
                        as:"user",
                        in:"$$user.username"   // username present in DB
                    }
                }
            }
        },
        {
            $project:{
                SubscribersUsernames:1
            }
        }
       ])

      
    } catch (error) {
       
    }
}