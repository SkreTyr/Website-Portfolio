import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import Footer from './Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollToTop from '@/components/ScrollToTop'
import Background from '@/Background'
import { AnimatedNotification, CustomMessage } from '@/components/lightswind/animated-notification'
import { ToggleTheme } from '@/components/lightswind/toggle-theme'
import SpeedDial from '@/components/SpeedDial'
import profileImg from '@/assets/Profile3.webp'

const customMessages: CustomMessage[] = [
  { text: 'Check out my LinkedIn Profile', href: 'https://www.linkedin.com/' },
  { text: 'Explore my other Socials', href: '/#connect' },
  { text: 'View More About Me', href: '/about' },
  { text: 'See the projects I have built', href: '/projects' },
  { text: 'Check out my Certifications', href: '/certifications' },
  'Thanks for stopping by my portfolio! 👋',
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Background />
      <div className="theme-surface">
        <SmoothScroll>
          <ScrollToTop />
          <App />
          <Footer />
        </SmoothScroll>
      </div>
      <AnimatedNotification
        position="top-right"
        autoInterval={10000}
        autoDismissTimeout={5000}
        customMessages={customMessages}
        fixedUser={{ name: 'Shann Michael', initials: 'SA', avatarUrl: profileImg, color: '#f3f3f3' }}
      />
      <SpeedDial />
      <ToggleTheme
        animationType="diag-up-right"
        aria-label="Toggle theme"
        className="fixed bottom-6 left-6 z-[60] p-2 rounded-full bg-[#151515] text-[#f3f3f3] shadow-lg"
      />
    </BrowserRouter>
  </StrictMode>,
)