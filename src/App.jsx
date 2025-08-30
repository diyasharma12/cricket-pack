import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Settings from './pages/Settings'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/collection" element={<Collection/>} />
      <Route path="/settings" element={<Settings/>} />
    </Routes>
  )
}
