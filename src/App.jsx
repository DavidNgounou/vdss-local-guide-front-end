import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Select from 'react-select';
import SignUp from './SignUp.jsx'
import SignIn from './SignIn.jsx'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
 
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
