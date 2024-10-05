import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home/Home'
import MarketPlace from './component/MarketPlace/MarketPlace'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/marketPlace' element={<MarketPlace/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App