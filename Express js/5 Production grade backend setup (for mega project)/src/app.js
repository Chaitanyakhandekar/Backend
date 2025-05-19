import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const server = express()

server.use(cors({
    origin:process.env.ALLOW_ORIGIN,
    credentials:true
}))

server.use(express.json({limit:"16kb"}))
server.use(express.urlencoded({extended:true, limit:"16kb"}))
server.use(express.static("public"))
server.use(cookieParser())



//best practice to import Routes here instead of index.js

//Import 

import userRouter from './routes/user.routes.js'

// routes declaration

server.use("/api/v1/users", userRouter)

export {server}