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
  rootMargin = '0px',
  direction = 'up',
  translate = true,
  blur = true,
}: AutoRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasEnteredRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio

        if (ratio >= threshold) {
          hasEnteredRef.current = true
          setIsVisible(true)
        } else if (ratio === 0 && hasEnteredRef.current) {
          setIsVisible(false)
        }
      },
      { threshold: [0, threshold], rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const hiddenTransform = translate
    ? direction === 'left'
      ? 'opacity-0 -translate-x-8'
      : direction === 'right'
      ? 'opacity-0 translate-x-8'
      : direction === 'down'
      ? 'opacity-0 -translate-y-8'
      : 'opacity-0 translate-y-8'
    : 'opacity-0'

  const visibleTransform = translate
    ? 'opacity-100 translate-x-0 translate-y-0'
    : 'opacity-100'

  const hidden = blur ? `${hiddenTransform} blur-md` : hiddenTransform
  const visible = blur ? `${visibleTransform} blur-0` : visibleTransform

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-out ${
        isVisible ? visible : hidden
      } ${className}`}
      style={blur ? { filter: isVisible ? 'blur(0px)' : 'blur(8px)' } : undefined}
    >
      {children}
    </div>
  )
}

export default AutoReveal
