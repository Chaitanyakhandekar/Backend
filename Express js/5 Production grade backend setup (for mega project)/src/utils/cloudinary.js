import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadFileOnCloudinary = async function(localFilePath){
    try {
        if(!localFilePath) return null

        const uploadInfo = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        })

        fs.unlinkSync(localFilePath)
        console.log("File Upload Succesfully ",uploadInfo)
        return uploadInfo;

    } catch (error) {
        console.log("upload file on cloudinary :: error :: ",error)
        return {
            success:false,
            message:"Upload falied"
        };
    }
}