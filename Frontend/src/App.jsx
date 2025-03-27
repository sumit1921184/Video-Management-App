import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import AllRoutes from './Routing/AllRoutes'
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {
  
  return (
    
    <>
    <Router>
    <Navbar/>
    <AllRoutes/>
    </Router>
     
    </>
    
  )
}

export default App
