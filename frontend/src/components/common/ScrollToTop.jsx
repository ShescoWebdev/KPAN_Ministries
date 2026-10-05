import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function ScrollToTop() {
  const { pathname } = useLocation()

  // To stop saved scroll positions
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Jump to the top of page
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}