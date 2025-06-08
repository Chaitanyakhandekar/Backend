    /*🔹 Q4. Match Non-Unique Field + Lookup
    📘 Suppose users have a non-unique field department.

    ✅ Task:

    Fetch all users from "Engineering" department

    Lookup tasks assigned to them (userId in tasks)

    Add number of tasks (taskCount)

    Project only name, department, and taskCount
*/


import mongoose from "mongoose";

const taskDetails = async (req,res)=>{
    try {
        
       const users = await User.aggregate([
        {
            $match:{
                department:"Engineering"  // this field is in DB
            }
        },
        {
            $lookup:{
                from:"tasks",
                localField:"_id",
                foreignField:"userId",
                as:"tasks"
            }
        },
        {
            $addFields:{
                taskCount:{
                    $size:"$tasks"
                }
            }
        },
        {
            $project:{
                name:1,  // present in DB
                department:1,
                taskCount:1
            }
        }
       ])

      
    } catch (error) {
       
    }
}