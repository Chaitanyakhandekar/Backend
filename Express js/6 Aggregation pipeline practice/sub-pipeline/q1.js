    // Q1. Enriched Student Courses
    // Fetch each student and populate their enrolledCourses array with the full course documents.

    import { pipeline } from "stream"


    const q1 = asyncHandler(async(req,res)=>{    //assume asyncHandler is created and imported 
        const students = await Student.aggregate([
            {
                $lookup:{
                    from:"courses",
                    localField:"enrolledCourses",
                    foreignField:"_id",
                    as:"courses",
                    pipeline:[
                        {
                            $lookup:{
                                from:"instructors",
                                localField:"instructor",
                                foreignField:"_id",
                                as:"instructors"
                            }
                        },
                        {
                            $addFields:{
                                instructor:{
                                    $first:"$instructors"
                                }
                            }
                        },
                        {
                            $project:{
                                title:1,
                                instructor:{
                                    fullName:1,
                                    email:1,
                                }

                            }
                        }
                        
                    ]
                }
            }
        ])

        return res
                .status(200)
                .json(
                    new ApiResponse(200,students,"successfull")         //assume class Created and imported
                )
    })