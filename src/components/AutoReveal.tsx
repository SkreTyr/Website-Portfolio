import React, { useEffect, useRef, useState } from 'react'

interface AutoRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  translate?: boolean
}

export function AutoReveal({
  children,
  className = '',
  threshold = 0.15,
  rootMargin = '0px',
  direction = 'up',
  translate = true,
}: AutoRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const hiddenTransform =
    direction === 'left'
      ? 'opacity-0 -translate-x-8'
      : direction === 'right'
      ? 'opacity-0 translate-x-8'
      : direction === 'down'
      ? 'opacity-0 -translate-y-8'
      : 'opacity-0 translate-y-8'

  const visibleTransform = translate ? 'opacity-100 translate-x-0 translate-y-0 blur-0' : 'opacity-100 blur-0'

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-out ${
        isVisible ? visibleTransform : (translate ? `${hiddenTransform} blur-md` : 'opacity-0 blur-md')
      } ${className}`}
      style={{ filter: isVisible ? 'blur(0px)' : 'blur(8px)' }}
    >
      {children}
    </div>
  )
}

export default AutoReveal
