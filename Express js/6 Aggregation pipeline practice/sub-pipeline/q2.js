// Q3. Filter Courses Based on Title
// While populating enrolledCourses, return only those courses that contain "MongoDB" in the title.

// 📌 Use $match inside the sub-pipeline.

import { pipeline } from "stream"


    const q2 = asyncHandler(async(req,res)=>{    //assume asyncHandler is created and imported 
        const students = await Student.aggregate([
            {
                $lookup:{
                    from:"courses",
                    localField:"enrolledCourses",
                    foreignField:"_id",
                    as:"allCourses",
                    pipeline:[
                        {
                            $match:{
                                title:{
                                    $regex:"MongoDB",
                                    $options:"i"
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