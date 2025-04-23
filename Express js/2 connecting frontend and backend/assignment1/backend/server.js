const express = require('express')
require('dotenv').config()

const server = express()
const port = process.env.PORT || 3000

const quotes = [
    {
      "id": 1,
      "author": "Albert Einstein",
      "category": "philosophy",
      "quote": "This is sample quote number 1. Keep learning and growing!"
    },
    {
      "id": 2,
      "author": "Mark Twain",
      "category": "humor",
      "quote": "This is sample quote number 2. Keep learning and growing!"
    },
    {
      "id": 3,
      "author": "Maya Angelou",
      "category": "humor",
      "quote": "This is sample quote number 3. Keep learning and growing!"
    },
    {
      "id": 4,
      "author": "Maya Angelou",
      "category": "humor",
      "quote": "This is sample quote number 4. Keep learning and growing!"
    },
    {
      "id": 5,
      "author": "Yoda",
      "category": "motivation",
      "quote": "This is sample quote number 5. Keep learning and growing!"
    }
  ]
  

server.get('/api/quotes',(req,res)=>{  // API for ending all quotes
    res.send(quotes)
    console.log('All Quotes Sent Succesfully..')
})

server.get('/api/quotes/random',(req,res)=>{  // API for sending categorywise quotes 
    let filteredQuotes = quotes
    filteredQuotes = filteredQuotes.filter((quote)=>quote.category===req.query.category)
    res.send(filteredQuotes)
    console.log(` Quotes of ${req.query.category} category Sent Succesfully..`)

})

server.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`)
})