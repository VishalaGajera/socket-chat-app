import { useContext, useState } from 'react'
import Dashboard from './Components/Dashboard/Dashboard'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import { AuthContext } from './Context/AuthContext'
import { ChatContextProvider } from './Context/ChatContext'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <div>
      <ChatContextProvider user ={user}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={user ? <Dashboard /> : <Login />} />
            <Route path='/signup' element={user ? <Dashboard /> : <Signup />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Login />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
        </ChatContextProvider>
      </div>
    </>
  )
}

export default App
