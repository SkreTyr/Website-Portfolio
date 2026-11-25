import { useEffect, useState } from 'react'

/**
 * Reactively tracks the active theme.
 *
 * This app marks Light Mode by adding the `dark` class to <html> (the palette
 * is inverted via CSS), so `isLight` is true when that class is present.
 */
export function useIsLightMode(): boolean {
  const [isLight, setIsLight] = useState<boolean>(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const update = () =>
      setIsLight(document.documentElement.classList.contains('dark'))

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return isLight
}