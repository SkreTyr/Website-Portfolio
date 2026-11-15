import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop, scrollToEl } from '@/lib/smooth-scroll'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      // runs before first paint: DOM committed, layout forced by getBoundingClientRect
      scrollToEl(hash)
      // strip the hash so a page reload doesn't jump to the section again
      window.history.replaceState(null, '', pathname)

      // safety net: correct if late-loading images/fonts reflow the page;
      // stops once the user takes over or after 6s
      let cancelled = false
      const ro = new ResizeObserver(() => {
        if (!cancelled) scrollToEl(hash)
      })
      ro.observe(document.body)

      const stop = () => {
        cancelled = true
        ro.disconnect()
      }
      window.addEventListener('wheel', stop, { once: true, passive: true })
      window.addEventListener('touchstart', stop, { once: true, passive: true })

      const cleanup = setTimeout(() => ro.disconnect(), 6000)

      return () => {
        cancelled = true
        clearTimeout(cleanup)
        ro.disconnect()
        window.removeEventListener('wheel', stop)
        window.removeEventListener('touchstart', stop)
      }
    }
    scrollToTop()
  }, [pathname, hash])

  return null
}

export default ScrollToTop