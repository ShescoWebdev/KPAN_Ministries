import React, { useEffect, useState } from 'react'

const MIN_VISIBLE_MS = 1000 
const MAX_WAIT_MS = 5000 
const FADE_MS = 600

const ringStyle = {
  background: 'conic-gradient(from 0deg, rgba(173, 137, 104, 0) 0%, #ad8968 100%)',
  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
}

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const startedAt = performance.now()
    let finished = false
    let fadeTimer
    let removeTimer

    const finish = () => {
      if (finished) return
      finished = true
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt))
      fadeTimer = setTimeout(() => {
        setFading(true)
        removeTimer = setTimeout(() => setVisible(false), FADE_MS)
      }, wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish)
    const maxTimer = setTimeout(finish, MAX_WAIT_MS)

    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(maxTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  // To keep the page from scrolling behind the loader
  useEffect(() => {
    if (!visible) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ transitionDuration: `${FADE_MS}ms` }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity ease-in-out dark:bg-[#05070f] ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute left-5 top-5 sm:left-8">
        <img
          src="/kpan logo black.png"
          alt="Church Logo"
          className="block h-12 w-auto sm:h-14 dark:hidden"
        />
        <img
          src="/kpan logo white.png"
          alt="Church Logo"
          className="hidden h-12 w-auto sm:h-14 dark:block"
        />
      </div>

      <div className="h-36 w-36 animate-spin rounded-full sm:h-44 sm:w-44" style={ringStyle} />

      <p className="font-brand-sans mt-8 text-lg text-[#1c2333] dark:text-white">Loading...</p>
    </div>
  )
}