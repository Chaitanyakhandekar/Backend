import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  
  const [quotes,setQuotes] = useState([]
  )
  const [choice,setChoice] = useState('all')

  useEffect(()=>{
      console.log(choice)
      if(choice==='all'){
       axios.get('/api/quotes')
       .then((response)=>setQuotes(response.data))
       .catch((error)=>console.log(error))
      }
      else{
        axios.get(`/api/quotes/random?category=${choice}`)
        .then((response)=>setQuotes(response.data))
        .catch((error)=>console.log(error))
      }
  },[choice])

  return (
    <div className="h-screen bg-gray-800 w-screen">
     <h1 className="bg-red-800 text-white text-3xl font-bold p-3 rounded-md">Quotes Dashboard</h1>

     <select name="category" id="cat" className="bg-gray-600 text-white text-xl rounded-md mt-4"
     onChange={(e)=>setChoice(e.target.value)} >
        <option value="all">All</option>
        <option value="philosophy">Philosophy</option>
        <option value="humor">Humor</option>
        <option value="motivation">Motivation</option>
     </select>

     <div className=" mt-5 flex flex-col justify-center items-center">
        {quotes.map((quote)=>(
          <div key={quote.id} className={`${quote.category==='philosophy' ? "bg-green-800": quote.category==='humor' ? "bg-blue-800" : quote.category==='motivation' ? "bg-yellow-800 text-black":""} mt-3 text-white p-3 font-bold rounded-md w-64 text-center`}>
            <h1><p className={`${quote.category==='motivation' ?"text-white" : "text-red-400"} inline`}>Author</p> : {quote.author}</h1>
            <h1><p className={`${quote.category==='motivation' ?"text-white" : "text-red-400"} inline`}>Category</p> : {quote.category}</h1>
            <h1><p className={`${quote.category==='motivation' ?"text-white" : "text-red-400"} inline`}>Quote</p> : {quote.quote}</h1>
          </div>
        ))}
     </div>
    </div>
  )
}

export default App
