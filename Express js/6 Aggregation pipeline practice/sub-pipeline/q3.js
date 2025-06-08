// Q4. Enrich Students with Instructor List (Flattened)
// Return each student document with a new field courseInstructors
// containing an array of instructors' names teaching their enrolled courses.

// 📌 Use $lookup → $lookup → $project → $map combo.


import { pipeline } from "stream"


    const q3 = asyncHandler(async(req,res)=>{    //assume asyncHandler is created and imported 
       const students = await Student.aggregate([
        {
            $lookup:{
                from:"courses",
                localField:"enrolledCourses",
                foreignField:"_id",
                as:"allCourses",
                pipeline:[
                    {
                        $lookup:{
                            from:"instructors",
                            localField:"instructor",
                            foreignField:"_id",
                            as:"instructors",
                        }
                    },
                    {
                        $addFields:{
                            courseInstructors:{    
                                    $map:{
                                    input:"$instructors",
                                    as:"instructor",
                                    in:"$$instructor.fullName"
                                    
                                }
                            }
                        }
                    },
                    {
                        $project:{
                            courseInstructors:1,
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                courseInstructors:{
                    $reduce:{
                        input:"$allCourses.courseInstructors",
                        initialValue:[],
                        in:{$concatArrays:["$$value" , "$$this"]},
                    }
                }
            }
        }
       ])

        return res
                .status(200)
                .json(
                    new ApiResponse(200,students,"successfull")         //assume class Created and imported
                )
    })