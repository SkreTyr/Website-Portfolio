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
    onClick: () => document.querySelector('#Lets Connect')?.scrollIntoView({ behavior: 'smooth' }),
  },
]

export default function SpeedDial() {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <ExpandableSpeedDial direction="up" actions={actions} />
    </div>
  )
}