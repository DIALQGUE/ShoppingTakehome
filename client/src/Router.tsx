import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Shopping } from './routes'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="shopping" element={<Shopping/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router