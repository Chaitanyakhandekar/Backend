import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  
  const [jokes,setJokes] = useState([])

  useEffect(()=>{
    axios.get('/api/jokes')
    .then((response)=>{
      console.log(response)
      setJokes(response.data)
    })
    .catch()
  },[])

  return (
    <>
      <div className="bg-red-400 p-3 text-white text-3xl rounded-md font-bold">
        <h1>Server is Ready</h1>
        <h1>Jokes:{jokes.length}</h1>
      </div>

      <div className="bg-green-400 p-3 mt-5 rounded-md text-white font-bold">
        {
          jokes.map((joke)=>(
              <div 
               key={joke.id}>
                  <div className="bg-blue-400 m-5 p-3 rounded-md text-black">
                    <h1>{joke.setup}</h1>
                    <h1>{joke.punchline}</h1>
                  </div>
              </div>
          ))
        }
      </div>
    </>
  )
}

export default App
