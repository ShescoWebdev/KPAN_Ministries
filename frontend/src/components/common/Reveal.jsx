import React, { useEffect, useRef, useState } from 'react'

/*
  Reveal: fades + slides its children up the first time they scroll into view.

  Usage:
    <Reveal><h2>Title</h2></Reveal>
    <Reveal delay={150}><p>Some text</p></Reveal>
    <Reveal delay={300}><img src="/pic.jpeg" alt="..." /></Reveal>

  Props:
    delay      - milliseconds to wait AFTER the element enters the screen.
                 Give siblings increasing delays to make them appear one after the other.
    className  - extra classes for the wrapper div (only if you need to adjust layout)
*/
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

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
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}