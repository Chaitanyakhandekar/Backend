const express = require('express')

const server = express()
const port = 3000

server.get('/',(req,res)=>{
    res.send('Hello')
})

server.get('/api/jokes',(req,res)=>{
    const jokes=[
        {
          "id": 1,
          "setup": "Why don't scientists trust atoms?",
          "punchline": "Because they make up everything!"
        },
        {
          "id": 2,
          "setup": "What do you call fake spaghetti?",
          "punchline": "An impasta!"
        },
        {
          "id": 3,
          "setup": "Why did the scarecrow win an award?",
          "punchline": "Because he was outstanding in his field!"
        },
        {
          "id": 4,
          "setup": "Why don’t skeletons fight each other?",
          "punchline": "They don’t have the guts."
        },
        {
          "id": 5,
          "setup": "What do you call cheese that isn't yours?",
          "punchline": "Nacho cheese!"
        }
      ]

      res.send(jokes)
})


server.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`)
})