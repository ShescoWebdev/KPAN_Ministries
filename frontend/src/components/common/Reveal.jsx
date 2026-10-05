import React, { useEffect, useRef, useState } from 'react'

const hiddenClass = {
  'expand-slide': 'opacity-0 scale-50 translate-x-24',
  expand: 'opacity-0 scale-50',
  'slide-down': 'opacity-0 -translate-y-10',
}

const shownClass = {
  'expand-slide': 'opacity-100 scale-100 translate-x-0',
  expand: 'opacity-100 scale-100',
  'slide-down': 'opacity-100 translate-y-0',
}

export default function Reveal({
  children,
  delay = 0,
  effect = 'expand-slide',
  origin = 'origin-top',
  className = '',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const type = hiddenClass[effect] ? effect : 'expand-slide'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
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
      className={`${origin} transition-[opacity,transform,scale,translate] duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? shownClass[type] : hiddenClass[type]
      } ${className}`}
    >
      {children}
    </div>
  )
}