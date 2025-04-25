import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    addressLine1:{
        type:String,
        requred:true,
    },
    addressLine2:{
        type:String,
        requred:true,
    },
    totDoctors:{
        type:Number
    },
    specializedIn:[
        {
            type:String
        }
    ],
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Hospital = mongoose.model("Hospital",hospitalSchema)