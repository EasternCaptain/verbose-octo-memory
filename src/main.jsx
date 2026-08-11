import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'; 
import ExchangeRate from './App.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExchangeRate />
  </StrictMode>
)
