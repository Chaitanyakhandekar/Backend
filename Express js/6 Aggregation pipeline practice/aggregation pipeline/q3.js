    /* 🔹 Q3. List Users with Subscriber Count
    📘 Collections:

    users

    subscriptions: { _id, subscriber, channel }

    ✅ Task:
    For all users in the users collection:

    Count how many subscribers they have (subscribersCount)

    Count how many channels they are subscribed to (subscribedToCount)

*/

import { subscribe } from "diagnostics_channel";
import mongoose from "mongoose";

const usersDetails = async (req,res)=>{
    try {
        
        const users = await User.aggregate([
            {
                $lookup:{
                    from:"subscriptions",
                    localField:"_id",
                    foreignField:"channel",
                    as:"subscribers"
                }
            },
            {
                $lookup:{
                    from:"subscriptions",
                    localField:"_id",
                    foreignField:"subscriber",
                    as:"subscribedTo"
                }
            },
            {
                $addFields:{
                    subscribersCount:{
                        $size:"$subscribers"
                    },
                    subscribedToCount:{
                        $size:"$subscribedTo"
                    }
                }
            },
            {
                $project:{
                    username:1,
                    subscribersCount:1,
                    subscribedToCount:1
                }
            }
        ])

      
    } catch (error) {
       
    }
}