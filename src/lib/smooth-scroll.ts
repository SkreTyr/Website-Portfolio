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

export const scrollToTop = () => {
  if (instance) {
    instance.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

export const scrollToEl = (selector: string) => {
  const el = document.querySelector(selector)
  if (!el) {
    scrollToTop()
    return
  }
  if (instance) {
    // recompute dimensions first — the cached limit is stale right after a
    // route change and would clamp the jump target to the previous page's height
    instance.resize()
    instance.scrollTo(el as HTMLElement, { offset: -80, immediate: true })
  } else {
    el.scrollIntoView({ behavior: 'auto' })
  }
}