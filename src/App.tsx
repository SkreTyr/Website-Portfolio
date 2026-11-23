import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import ProjectDetails from '@/pages/ProjectDetails'
import Contact from '@/pages/Contact'
import Certifications from '@/pages/Certifications'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import { AnimatedNotification } from '@/components/lightswind/animated-notification'
import profileImg from '@/assets/Profile3.webp'

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
        fixedUser={{ name: 'Shann Michael', initials: 'SA', avatarUrl: profileImg, color: '#f3f3f3' }}
      />
    </>
  )
}

export default App