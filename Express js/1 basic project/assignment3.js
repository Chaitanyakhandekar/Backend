const express = require('express')
require('dotenv').config()

const server = express()
const port = process.env.PORT

server.get('/search',(req,res)=>{
    const {q} = req.query
    res.send(`You search for ${q}`)
})

server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})