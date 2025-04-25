import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:0
        }
    }
)

const orderSchema = new mongoose.Schema({
    orderPrice:{
        type:Number,
        default:0,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:[orderItemSchema],
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","DELIVERED","CANCELED"],
        default:"PENDING"
    }
},{timestamps:true})

export const Order = mongoose.model("Order",orderSchema)