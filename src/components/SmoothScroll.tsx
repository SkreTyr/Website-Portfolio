import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { registerLenis } from '@/lib/smooth-scroll'

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      // Let the project's inner scroll container handle its own wheel.
      prevent: (node) => !!(node as HTMLElement)?.closest?.('.project-scroll'),
    })
    registerLenis(lenis)

    return () => {
      registerLenis(null)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll