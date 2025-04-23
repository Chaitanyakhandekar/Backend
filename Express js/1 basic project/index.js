const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT


const githubData = {
    "login": "Chaitanyakhandekar",
    "id": 170877232,
    "node_id": "U_kgDOCi9hMA",
    "avatar_url": "https://avatars.githubusercontent.com/u/170877232?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Chaitanyakhandekar",
    "html_url": "https://github.com/Chaitanyakhandekar",
    "followers_url": "https://api.github.com/users/Chaitanyakhandekar/followers",
    "following_url": "https://api.github.com/users/Chaitanyakhandekar/following{/other_user}",
    "gists_url": "https://api.github.com/users/Chaitanyakhandekar/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Chaitanyakhandekar/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Chaitanyakhandekar/subscriptions",
    "organizations_url": "https://api.github.com/users/Chaitanyakhandekar/orgs",
    "repos_url": "https://api.github.com/users/Chaitanyakhandekar/repos",
    "events_url": "https://api.github.com/users/Chaitanyakhandekar/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Chaitanyakhandekar/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": null,
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 14,
    "public_gists": 0,
    "followers": 2,
    "following": 1,
    "created_at": "2024-05-26T15:41:53Z",
    "updated_at": "2025-04-03T14:08:36Z"
  }

app.get('/',(req,res)=>{
    res.send('Welcome in our Application')
})

app.get('/home',(req,res)=>{
    res.send('<h1>Welcome to Home Page</h1>')
})


app.get('/login',(req,res)=>{
    res.send('<h1>Login Page</h1>')
})

app.get('/github',(req,res)=>{
    res.json(githubData)
})

app.listen(port , ()=>{
    console.log(`Server is Live and listening on port ${port}`)
})