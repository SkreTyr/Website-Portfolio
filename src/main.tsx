import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Footer from './Footer'
import SmoothScroll from '@/components/SmoothScroll'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
      <Footer />
    </SmoothScroll>
  </StrictMode>,
)
