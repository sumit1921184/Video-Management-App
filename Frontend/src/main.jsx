import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import { Router } from 'react-router-dom'
import  ModalProvider  from './ContextApi/Modal/ModalContext.jsx'
import ModalContainer from './ContextApi/Modal/ModalContainer.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ChakraProvider>
      <ModalProvider>
     <ModalContainer/>
    <App />
    </ModalProvider>
    
    </ChakraProvider>
    </Provider>
    
    
   
)
