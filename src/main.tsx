import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import Footer from './Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollToTop from '@/components/ScrollToTop'
import Background from '@/Background'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Background />
        <App />
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  </StrictMode>,
)
