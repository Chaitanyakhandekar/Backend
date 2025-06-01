    /* 🔹 Q1. Basic Lookup + Count
    📘 Problem:
    You have two collections:

    users: { _id, name, city }

    orders: { _id, userId, amount }

    ✅ Task:
    Write an aggregation to fetch all users from city "Mumbai" along with:

    total number of their orders (orderCount)

    total amount they have spent (totalSpent) */


    import mongoose from "mongoose";

    const users = User.aggregate([
        {
            $match:{
                city:"Mumbai"
            }
        },
        {
            $lookup:{
                from:"orders",
                localField:"_id",
                foreignField:"userId",
                as:"orders"
            }
        },
        {
            $addFields:{

                totalOrders:{
                    $size:"$orders"
                },

                totalAmount:{
                  $sum:{
                     $map:{
                    input:"$orders",
                    as:"order",
                    in:"$$order.amount"
                   }
                  }
                }

            }
        },
        {
            $project:{
                name:1,
                city:1,
                totalOrders:1,
                totalAmount:1
            }
        }
    ])