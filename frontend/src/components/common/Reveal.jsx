import React, { useEffect, useRef, useState } from 'react'

/*
  Reveal: the first time its children scroll into view, they appear and settle into place.

  Usage:
    <Reveal><h2>Title</h2></Reveal>
    <Reveal delay={150}><p>Some text</p></Reveal>
    <Reveal delay={300} effect="slide-down"><img src="/pic.jpeg" alt="..." /></Reveal>

  Props:
    delay      - milliseconds to wait AFTER the element enters the screen.
                 Give siblings increasing delays to make them appear one after the other.
    effect     - 'expand' (default): starts small and spreads out to its full size
                 'slide-down': starts slightly above and slides down into place
    origin     - the point an 'expand' grows from (a Tailwind origin class, default 'origin-top')
    className  - extra classes for the wrapper div (only if you need to adjust layout)
*/

const hiddenClass = {
  expand: 'opacity-0 scale-50',
  'slide-down': 'opacity-0 -translate-y-10',
}

const shownClass = {
  expand: 'opacity-100 scale-100',
  'slide-down': 'opacity-100 translate-y-0',
}

export default function Reveal({
  children,
  delay = 0,
  effect = 'expand',
  origin = 'origin-top',
  className = '',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const type = hiddenClass[effect] ? effect : 'expand'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect "reduce motion" settings, and browsers without IntersectionObserver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // animate once, then stop watching
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`${origin} transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? shownClass[type] : hiddenClass[type]
      } ${className}`}
    >
      {children}
    </div>
  )
}