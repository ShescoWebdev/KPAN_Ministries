import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import Reveal from '../components/common/Reveal'

// Hero videos
const heroVideos = [
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791241911/Vid_8_reanwp.mp4',
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791241769/Vid_10_zhzwgb.mp4',
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791241759/Vid_9_dblahi.mp4',
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791106529/Vid_5_fdzbu3.mp4',
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791106534/Vid_4_shgqrz.mp4',
]

// Settle animation duration
const SETTLE_MS = 500

// Mobile mode for carousel slide
const isMobileView = () => window.matchMedia('(max-width: 767px)').matches

// Live stream link
const LIVE_URL = 'https://youtube.com/@apstjoshuaokorie_kpan?si=MFTECfFDLTPz961h'

// Shared small label style
const labelClass =
  'font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 sm:text-xs'

// Faint word sizes
const INITIALS_SIZE = 'text-[length:clamp(8rem,28vw,24rem)]'
const NAME_SIZE = 'text-[length:18vw] md:text-[length:clamp(5rem,11vw,11rem)]'

// Italic orange heading word
function Accent({ children }) {
  return <em className="italic text-[#ff6a00]">{children}</em>
}

// Orange line and label
function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-[#ff6a00] sm:w-14" />
      <span className="font-brand-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00] sm:text-xs">
        {children}
      </span>
    </div>
  )
}

// Giant faint backdrop word
function Faint({ words, size, italic = false }) {
  return (
    <span
      aria-hidden="true"
      className={`font-brand-serif pointer-events-none -mb-[0.3em] block select-none leading-[0.8] text-[#ff6a00]/[0.07] dark:text-[#ff6a00]/[0.09] ${size} ${
        italic ? 'italic' : ''
      }`}
    >
      {words.map((word, i) => (
        <span key={word} className="block md:inline">
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

// Day, time and venue card
function InfoCard({ card, line }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#05070f] sm:p-10">
      <div className="flex items-center gap-4">
        <span className={`h-px w-12 ${line}`} />
        <span className={labelClass}>{card.day}</span>
      </div>

      <p className={`${labelClass} mt-8`}>{card.label}</p>
      <h3 className="font-brand-serif mt-2 text-4xl italic leading-tight text-[#1c2333] dark:text-white sm:text-5xl">
        {card.name}
      </h3>

      <p className="font-brand-sans mt-6 flex items-start gap-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#ff6a00]" />
        <span>{card.venue}</span>
      </p>

      <div className="my-8 border-t border-slate-200 dark:border-white/10" />

      <p className={labelClass}>Service times</p>
      <p className="font-brand-serif mt-3 text-4xl text-[#1c2333] dark:text-white sm:text-5xl">{card.time}</p>
      <p className="font-brand-sans mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#ff6a00]">
        {card.note}
      </p>

      {card.extra && (
        <div className="mt-8">
          <p className={labelClass}>{card.extra.label}</p>
          <p className="font-brand-sans mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {card.extra.text}
          </p>
        </div>
      )}

      <Link
        to="/location"
        className="font-brand-sans mt-8 inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base"
      >
        Plan your visit
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

// Weekly chapters data
const chapters = [
  {
    tag: 'Equip',
    faint: ['Equipping', 'Meeting'],
    faintSize: NAME_SIZE,
    faintItalic: true,
    title: (
      <>
        Be <Accent>equipped</Accent> for the journey ahead.
      </>
    ),
    intro:
      'Practical teaching and resources to help you grow in your faith and live out your calling. Come, be equipped, and step into all God has for you.',
    line: 'bg-[#ff6a00]',
    card: {
      day: 'Sunday',
      label: 'KPAN',
      name: 'Equipping Meeting',
      venue: 'NAAT Multi-Purpose Hall, behind June 12 FACOOP Supermarket, UNIBEN',
      time: '2:00 PM',
      note: 'Every Sunday · 1st day of the week',
      extra: {
        label: 'Bring along',
        text: 'Your Bible, notebook, and pen. We look forward to seeing you there!',
      },
    },
    image: '/Equipping Meeting.jpeg',
    alt: 'Equipping Meeting',
    imageFirst: false,
  },
  {
    tag: 'Connect',
    faint: ['Cell', 'Meeting'],
    faintSize: NAME_SIZE,
    faintItalic: true,
    title: (
      <>
        Closer to one another, closer to the <Accent>Lord</Accent>.
      </>
    ),
    intro:
      'A day of intentional gathering and fellowship. We meet in small groups to study the Bible, pray, and support one another in our faith journey.',
    line: 'bg-[#4f46a5] dark:bg-[#8b7cf6]',
    card: {
      day: 'Monday',
      label: 'KPAN',
      name: 'Cell Meeting',
      venue: 'Join in a cell centre closest to you',
      time: '5:00 PM',
      note: 'Every Monday · 2nd day of the week',
      extra: {
        label: 'Don’t miss it',
        text: 'These meetings are designed to bring us closer to one another as we grow in fellowship with the Lord. Come and be part of this vibrant community of believers.',
      },
    },
    image: '/Cell Meeting.jpeg',
    alt: 'Cell Meeting',
    imageFirst: true,
  },
  {
    tag: 'Study',
    faint: ['BSM'],
    faintSize: INITIALS_SIZE,
    faintItalic: false,
    title: (
      <>
        Dive deep into the <Accent>Word</Accent> of God.
      </>
    ),
    intro:
      'Explore the Word of God and discover its relevance to your daily life, one passage at a time.',
    line: 'bg-[#14b8a6]',
    card: {
      day: 'Thursday',
      label: 'KPAN',
      name: 'Bible Study Meeting',
      venue: 'NAAT Multi-Purpose Hall, behind June 12 FACOOP Supermarket, UNIBEN',
      time: '4:00 PM',
      note: 'Every Thursday · 5th day of the week',
      extra: {
        label: 'Come ready',
        text: 'Let’s come together to study the Bible, ask questions, and grow in our understanding of God’s Word. We look forward to seeing you there!',
      },
    },
    image: '/SOTK.jpeg',
    alt: 'Bible Study Meeting',
    imageFirst: false,
  },
  {
    tag: 'Pray',
    faint: ['SOPS'],
    faintSize: INITIALS_SIZE,
    faintItalic: false,
    title: (
      <>
        Enlarge your <Accent>prayer</Accent> capacity.
      </>
    ),
    intro:
      'Dear beloved, do you desire to enlarge your prayer capacity or carry burdens on your heart? Come as we are taught the practice of prayer and the supernatural.',
    line: 'bg-[#ff6a00]',
    card: {
      day: 'Saturday',
      label: 'School of Prayer & the Supernatural',
      name: 'SOPS',
      venue: 'NAAT Multi-Purpose Hall, UNIBEN',
      time: '4:00 PM',
      note: 'Every Saturday · 7th day of the week',
      extra: {
        label: 'Come expectant',
        text: 'Bring your burdens and your hunger for more of God.',
      },
    },
    image: '/SOPS.jpeg',
    alt: 'SOPS',
    imageFirst: true,
  },
]

// One weekly chapter
function Chapter({ chapter, index }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <section className="relative overflow-hidden pt-16 md:pt-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <Faint words={chapter.faint} size={chapter.faintSize} italic={chapter.faintItalic} />

        <div className="relative">
          <Reveal origin="origin-left">
            <Eyebrow>
              Chapter {number} — {chapter.tag}
            </Eyebrow>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal origin="origin-left" delay={100}>
              <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                {chapter.title}
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                {chapter.intro}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={150}>
              <InfoCard card={chapter.card} line={chapter.line} />
            </Reveal>

            <Reveal delay={300} className={chapter.imageFirst ? 'lg:order-first' : ''}>
              <img
                className="mx-auto block h-auto max-h-[25rem] w-auto max-w-full rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 sm:max-h-[30rem] md:max-h-[34rem] lg:max-h-[38rem]"
                src={chapter.image}
                alt={chapter.alt}
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  const [current, setCurrent] = useState(0)
  const videoRefs = useRef([])
  const heroRef = useRef(null)
  const total = heroVideos.length

  const [dragX, setDragX] = useState(0)
  const [dragDir, setDragDir] = useState(1) 
  const [phase, setPhase] = useState('idle') 
  const [instant, setInstant] = useState(false)
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    width: 0,
    dx: 0,
    dir: 1,
    locked: 'ignore',
    mobile: false,
  })
  const settleTimer = useRef(null)
  const instantTimer = useRef(null)

  const goTo = (index) => {
    if (!total) return
    setCurrent((index + total) % total)
  }

  // To smoothly scroll past hero to the first section
  const scrollToContent = () => {
    if (!heroRef.current) return
    window.scrollTo({ top: heroRef.current.offsetHeight, behavior: 'smooth' })
  }

  // Back to idle state after a drag or settle animation
  const finishSwipe = (commit, dir) => {
    setInstant(true)
    setPhase('idle')
    setDragX(0)
    if (commit) {
      goTo(current + dir)
    } else if (total > 1 && videoRefs.current[current]?.ended) {
      goTo(current + 1)
    }
    instantTimer.current = setTimeout(() => setInstant(false), 80)
  }

  // To animate to next or previous video after a drag or settle animation
  const settle = (commit) => {
    const { width, dir } = touchRef.current
    touchRef.current.locked = 'ignore'
    setPhase('settling')
    setDragX(commit ? -dir * width : 0)
    settleTimer.current = setTimeout(() => finishSwipe(commit, dir), SETTLE_MS)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) {
      if (touchRef.current.locked === 'x') settle(false)
      touchRef.current.locked = 'ignore'
      return
    }
    if (total <= 1 || phase === 'settling') {
      touchRef.current.locked = 'ignore'
      return
    }
    const t = e.touches[0]
    touchRef.current = {
      startX: t.clientX,
      startY: t.clientY,
      startTime: Date.now(),
      width: e.currentTarget.offsetWidth,
      dx: 0,
      dir: 1,
      locked: null,
      mobile: isMobileView(),
    }
  }

  const handleTouchMove = (e) => {
    const touch = touchRef.current
    if (!touch.mobile || touch.locked === 'ignore' || touch.locked === 'y' || e.touches.length !== 1) return
    const dx = e.touches[0].clientX - touch.startX
    const dy = e.touches[0].clientY - touch.startY

    if (touch.locked === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      touch.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (touch.locked === 'y') return
      setPhase('dragging')
    }

    touch.dx = Math.max(-touch.width, Math.min(touch.width, dx))
    touch.dir = touch.dx < 0 ? 1 : -1
    setDragDir(touch.dir)
    setDragX(touch.dx)
  }

  const handleTouchEnd = (e) => {
    const touch = touchRef.current
    if (touch.locked === 'ignore') return

    if (!touch.mobile) {
      const diffX = e.changedTouches[0].clientX - touch.startX
      const diffY = e.changedTouches[0].clientY - touch.startY
      touch.locked = 'ignore'
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        goTo(diffX < 0 ? current + 1 : current - 1)
      }
      return
    }

    if (touch.locked !== 'x') {
      touch.locked = 'ignore'
      return
    }
    const velocity = Math.abs(touch.dx) / Math.max(1, Date.now() - touch.startTime)
    const isSwipe =
      Math.abs(touch.dx) >= 50 && (Math.abs(touch.dx) > touch.width * 0.25 || velocity > 0.4)
    settle(isSwipe)
  }

  const handleTouchCancel = () => {
    if (touchRef.current.locked === 'x') settle(false)
    else touchRef.current.locked = 'ignore'
  }

  useEffect(
    () => () => {
      clearTimeout(settleTimer.current)
      clearTimeout(instantTimer.current)
    },
    []
  )

  //To Play only the active video
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      video.muted = true
      if (i === current) {
        video.currentTime = 0
        const playPromise = video.play()
        if (playPromise !== undefined) playPromise.catch(() => {})
      } else {
        video.pause()
      }
    })
  }, [current])

  return (
    <div className="bg-[#F8F7F5] transition-colors duration-500 dark:bg-[#101828]">

      <Reveal>
      <section
        ref={heroRef}
        aria-label="Hero"
        className="relative min-h-svh w-full overflow-hidden bg-black touch-pan-y touch-pinch-zoom"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {/* Video carousel */}
        {heroVideos.map((src, i) => {
          const isCurrent = i === current
          const neighbor = dragDir === 1 ? (current + 1) % total : (current - 1 + total) % total
          const isNeighbor = phase !== 'idle' && !isCurrent && i === neighbor

          let transform = 'none'
          if (phase !== 'idle') {
            if (isCurrent) transform = `translate3d(${dragX}px, 0, 0)`
            else if (isNeighbor) transform = `translate3d(calc(${dragDir * 100}% + ${dragX}px), 0, 0)`
          }

          const transition =
            phase === 'dragging'
              ? 'none'
              : phase === 'settling'
                ? `transform ${SETTLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : instant
                  ? 'none'
                  : 'opacity 1000ms ease-in-out'

          return (
            <video
              key={`${src}-${i}`}
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              src={src}
              muted
              playsInline
              loop={total === 1}
              preload={
                i === current || i === (current + 1) % total || i === (current - 1 + total) % total
                  ? 'auto'
                  : 'metadata'
              }
              onEnded={() => {
                if (phase === 'idle') goTo(current + 1)
              }}
              onError={() => {
                if (i === current && total > 1) goTo(current + 1)
              }}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                transform,
                transition,
                opacity: isCurrent || isNeighbor ? 1 : 0,
                willChange: phase !== 'idle' ? 'transform' : 'auto',
              }}
            />
          )
        })}

        {/* Dim bluish overlay for text visibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(78, 56, 160, 0.45) 0%, rgba(58, 38, 132, 0.58) 55%, rgba(34, 20, 92, 0.8) 100%)',
          }}
        />

        {/* Faint oversized name behind the text */}
        <span
          aria-hidden="true"
          className="font-brand-serif pointer-events-none absolute -bottom-[0.12em] -left-[0.03em] z-[1] select-none whitespace-nowrap text-[length:clamp(9rem,30vw,32rem)] italic leading-none text-white/10"
        >
          K-PAN
        </span>

        {/* Hero text */}
        <div className="relative z-[2] mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-5 pb-8 pt-28 sm:px-8 xl:px-10">
          <div className="flex flex-1 flex-col items-start justify-center py-10 text-left">
            <Reveal origin="origin-left" delay={200}>
              <p className="font-brand-serif text-3xl italic text-white sm:text-4xl">Welcome to</p>
              <div className="mt-2 flex items-center gap-4">
                <span className="h-px w-10 bg-white/70" />
                <span className="font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs">
                  The Fullness Church
                </span>
              </div>
            </Reveal>

            <Reveal origin="origin-left" delay={350}>
              <h1 className="font-brand-serif mt-4 text-[length:clamp(3.25rem,10.5vw,10.5rem)] leading-[0.92] tracking-tight text-white">
                K-PAN <em className="italic text-[#ff6a00]">Ministries</em>
              </h1>
            </Reveal>

            <Reveal origin="origin-left" delay={500}>
              <div className="my-6 h-px w-16 bg-white/60 sm:my-9" />
              <p className="font-brand-sans max-w-2xl text-base text-white/85 sm:text-xl lg:text-2xl">
                A community of believers dedicated to sharing the love of Christ.
              </p>
            </Reveal>

            <Reveal origin="origin-left" delay={650}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-10">
                <Link
                  to="https://youtube.com/@apstjoshuaokorie_kpan?si=MFTECfFDLTPz961h"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#ff6a00] px-7 py-4 text-white transition-colors duration-300 hover:bg-[#ff8a33] sm:px-8 sm:py-5"
                >
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
                  <span className="font-brand-serif text-2xl italic sm:text-[1.7rem]">Watch live now</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/location"
                  className="font-brand-sans group inline-flex items-center gap-2 border-b border-white/70 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] sm:text-sm"
                >
                  Plan your visit
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            {/* Prev / next arrows */}
            {total > 1 && (
              <Reveal origin="origin-left" delay={800}>
                <div className="mt-8 flex items-center gap-3 sm:mt-10">
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous video"
                    className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(current + 1)}
                    aria-label="Next video"
                    className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Dot indicators */}
                  <div className="ml-3 flex items-center gap-3">
                    {heroVideos.map((src, i) => (
                      <button
                        key={`${src}-dot-${i}`}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Show video ${i + 1}`}
                        aria-current={i === current}
                        className={`h-2.5 cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
                          i === current ? 'w-8 bg-[#ff6a00]' : 'w-2.5 bg-white/60 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal origin="origin-left" delay={900}>
              <button
                type="button"
                onClick={scrollToContent}
                className="group flex cursor-pointer items-center gap-4 text-white"
              >
                <span className="font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] sm:text-xs">
                  Scroll to discover
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition-colors duration-300 group-hover:bg-white/15">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </button>
            </Reveal>

            <Reveal origin="origin-right" delay={1000}>
              <div className="text-left sm:text-right">
                <p className="font-brand-serif text-2xl italic text-white sm:text-3xl">
                  One city, one family.
                </p>
                <p className="font-brand-sans mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                  Touched · Transformed · Empowered
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Intro */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint words={['TFC']} size={INITIALS_SIZE} />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-3xl leading-[1.1] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-4xl xl:text-5xl">
                  The Fullness Church is a church that believes in <Accent>Jesus</Accent>, a church that
                  loves God and people.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for
                  authentic worship, are passionate about the local church, and are on mission to see
                  God’s kingdom established across the earth.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                  <span className={`${labelClass} text-center`}>Get involved in our daily meetings</span>
                  <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly chapters */}
      {chapters.map((chapter, i) => (
        <Chapter key={chapter.tag} chapter={chapter} index={i} />
      ))}

      {/* Watch live band */}
      <section className="pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="border-t border-slate-200 pt-10 dark:border-white/10">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-brand-sans flex items-start gap-4 text-lg text-slate-600 dark:text-slate-300 sm:items-center sm:text-xl">
                  <span className="mt-2 h-3 w-3 shrink-0 animate-pulse rounded-full bg-[#ff6a00] sm:mt-0" />
                  <span>
                    Can’t make it in person?{' '}
                    <strong className="font-semibold text-[#1c2333] dark:text-white">
                      Worship live with us online.
                    </strong>
                  </span>
                </p>

                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-brand-sans inline-flex w-fit items-center gap-2 rounded-full bg-[#0f172a] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#ff6a00] dark:bg-[#ff6a00] dark:hover:bg-white dark:hover:text-[#0f172a]"
                >
                  Watch live
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home