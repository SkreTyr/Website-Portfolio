import React, { useEffect, useRef, useState } from 'react'

interface AutoRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  translate?: boolean
  blur?: boolean
}

export function AutoReveal({
  children,
  className = '',
  threshold = 0.15,
  direction = 'up',
  translate = true,
}: AutoRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Deterministic scroll-driven visibility check.
    // IntersectionObserver is unreliable with Lenis smooth scrolling (callbacks
    // get throttled/missed) and with `overflow-hidden` / `content-visibility`
    // ancestors. getBoundingClientRect is read every frame instead.
    const vh = () => window.innerHeight || document.documentElement.clientHeight
    let visible = false

    const check = () => {
      const rect = node.getBoundingClientRect()
      const viewportH = vh()
      const inView = rect.top < viewportH * (1 - threshold) && rect.bottom > 0
      const fullyOut = rect.bottom <= 0 || rect.top >= viewportH

      let next = visible
      if (inView) next = true
      else if (fullyOut) next = false

      if (next !== visible) {
        visible = next
        setIsVisible(next)
      }
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        check()
        ticking = false
      })
    }

    // initial check (handles above-the-fold elements)
    check()

    // Re-check across the first ~1s. This covers cases where the element is
    // revealed by scroll restoration on route change or laid out late by
    // `content-visibility: auto` — situations where no scroll event fires.
    let rafId = 0
    let frames = 0
    const recheck = () => {
      check()
      frames += 1
      if (!visible && frames < 90) {
        rafId = requestAnimationFrame(recheck)
      }
    }
    rafId = requestAnimationFrame(recheck)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [threshold])

  const hiddenTransform =
    direction === 'left'
      ? 'opacity-0 -translate-x-8'
      : direction === 'right'
      ? 'opacity-0 translate-x-8'
      : direction === 'down'
      ? 'opacity-0 -translate-y-8'
      : 'opacity-0 translate-y-8'

  const visibleTransform = translate ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-100'

  const hidden = hiddenTransform
  const visible = visibleTransform

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[1000ms] ease-out ${
        isVisible ? visible : hidden
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default AutoReveal