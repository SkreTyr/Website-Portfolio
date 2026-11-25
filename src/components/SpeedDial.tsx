import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home as HomeIcon, UserRoundPen, FolderOpen, BadgeCheck, Mail } from 'lucide-react'
import { ExpandableSpeedDial, SpeedDialAction } from '@/components/lightswind/expandable-speed-dial'

const actions: SpeedDialAction[] = [
  {
    label: 'Home',
    icon: <HomeIcon size={20} />,
    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
  {
    label: 'About',
    icon: <UserRoundPen size={20} />,
    onClick: () => document.querySelector('#About')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    label: 'Projects',
    icon: <FolderOpen size={20} />,
    onClick: () => document.querySelector('#Project')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    label: 'Certifications',
    icon: <BadgeCheck size={20} />,
    onClick: () => document.querySelector('#Certifications')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    label: 'Connect',
    icon: <Mail size={20} />,
    onClick: () => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }),
  },
]

export default function SpeedDial() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome])

  return (
    <AnimatePresence>
      {isHome && pastHero && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="speed-dial-root fixed bottom-6 right-6 z-50 lg:hidden"
        >
          <ExpandableSpeedDial direction="up" actions={actions} showLabels />
        </motion.div>
      )}
    </AnimatePresence>
  )
}