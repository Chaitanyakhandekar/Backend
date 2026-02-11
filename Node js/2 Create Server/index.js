import http from "http"
import fs from "fs"
import { error } from "console"

const server = http.createServer((req,res)=>{
    const log = `${Date.now()} : New Request At URL: ${req.url}\n`
    fs.appendFile("logs.txt" , log , ()=>{
        res.end("Recieved A Request")
    })
})

server.listen(3000,()=>{
    console.log("Server Is Listening")
})