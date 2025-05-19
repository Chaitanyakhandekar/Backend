import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadFileOnCloudinary = async function(localFilePath){   //! we assume that we already stored file on Local folder at "Public/temp"
    try {
        if(!localFilePath) return null

        const uploadInfo = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log('File upload successfully ',uploadInfo)
        fs.unlinkSync(localFilePath)        //! Remove file from Local folder (our Server) after successfully upload on Cloudinary

        return uploadInfo;
    } catch (error) {
        console.log("Cloudinary File Upload ERROR :: ",error);
    }
}