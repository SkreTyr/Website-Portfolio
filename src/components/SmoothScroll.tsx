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