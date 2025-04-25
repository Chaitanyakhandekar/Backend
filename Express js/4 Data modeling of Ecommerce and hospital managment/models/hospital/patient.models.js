import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    blood:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["M","F","O"]
    },
    diagnosedWith:{
        type:String,
        required:true
    },
    admittedIn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    }
},{timestamps:true})

export const Parient = mongoose.model("Patient",patientSchema)