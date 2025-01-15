import { useState } from 'react'
import './App.css'
import { ContextProvider } from './context/ContextProvider'
import { AppRoutes } from './Routes/AppRoutes'
import { Container } from 'react-bootstrap'
function App() {

  return (
    
  
      <ContextProvider>
        <AppRoutes/>
      </ContextProvider>
   
   
  )
}

export default App
