import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import ProjectDetails from '@/pages/ProjectDetails'
import Contact from '@/pages/Contact'
import Certifications from '@/pages/Certifications'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import { AnimatedNotification, CustomMessage } from '@/components/lightswind/animated-notification'
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <AnimatedNotification
        position="top-right"
        autoInterval={10000}
        autoDismissTimeout={5000}
        customMessages={customMessages}
        fixedUser={{ name: 'Shann Michael', initials: 'SA', avatarUrl: profileImg, color: '#f3f3f3' }}
      />
      <SpeedDial />
    </>
  )
}

export default App