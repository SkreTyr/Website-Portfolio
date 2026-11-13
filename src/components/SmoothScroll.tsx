import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      anchors: true,
    })

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}

export default SmoothScroll