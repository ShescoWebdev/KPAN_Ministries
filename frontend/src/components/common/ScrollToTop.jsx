import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
  ScrollToTop: every page opens at the top.
  Place it ONCE inside <BrowserRouter>, above <Routes>.
*/
export default function ScrollToTop() {
  const { pathname } = useLocation()

  // Stop the browser from restoring the old scroll position on refresh / back / forward
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Jump to the top whenever the route changes (before the new page paints)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}