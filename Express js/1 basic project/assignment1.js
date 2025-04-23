const express = require('express')
require('dotenv').config()

const server = express()
const port = process.env.PORT

server.get('/about',(req,res)=>{
    res.send('This is a backend server built by [Chaitanya]')
})

server.listen(port,()=>{
    console.log(`server  is listening on port ${port}`)
})