import type Lenis from 'lenis'

let instance: Lenis | null = null
let lockCount = 0

export const registerLenis = (lenis: Lenis | null) => {
  instance = lenis
  if (lenis && lockCount > 0) lenis.stop()
}

export const lockScroll = () => {
  lockCount++
  instance?.stop()
}

export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) instance?.start()
}