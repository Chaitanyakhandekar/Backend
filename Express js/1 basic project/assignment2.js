const express = require('express')
require('dotenv').config()

const server = express()
const port = process.env.port

server.get('/user/:username',(req,res)=>{
    const {username} = req.params
    res.send(`Welcome , ${username}!`)
})

server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})