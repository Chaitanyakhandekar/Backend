import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        default:0
    },
    worksIn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    },
    salary:{
        type:Number
    }

},{timestamps:true})

export const Doctor = mongoose.model("Doctor",doctorSchema)