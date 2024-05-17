import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Book from './pages/Book'
import Add from './pages/Add'
import Update from './pages/Update'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Book/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/update' element = {<Update/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}


