import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
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
    <div className='bg-[#F8F7F5] dark:bg-[#101828]'>

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


      <Reveal>      
      <section className=" px-4 text-center p-10 rounded-4xl shadow-md sm:px-6 lg:px-8 m-10 flex flex-col items-center justify-center bg-white dark:bg-black">
        <Reveal>
          <h2 className="text-xl sm:text-[22px] md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#999898] transition-colors duration-500 dark:text-white">The Fullness Church is a church that believes in Jesus, a  <br className='hidden md:block' /> church that loves God and people.</h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-4 text-[13px] sm:text-[13px] md:text-4xl lg:text-lg xl:text-lg text-[#939292] transition-colors duration-500 dark:text-slate-300">
            Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for authentic worship, <br className='hidden md:block' /> are passionate about the local church, and are on mission to see God’s kingdom established across <br className='hidden md:block' /> the earth.
          </p>
        </Reveal>

        <div className='border-b w-56 mt-14 border-gray-300 dark:border-[#AD8968]'></div>

        <Reveal delay={300}>
          <h1 className="home-h1 mt-5 ml-10 text-sm md:text-base text-center m-auto font-bold text-[#2563EE] transition-colors duration-500 dark:text-blue-400">
            Get involved in our daily meetings
          </h1 >
        </Reveal>
      </section>
      </Reveal>      


      <Reveal>      
      <section className="mt-12 md:mt-16 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-13 md:gap-8 lg:gap-16 items-center mb-10 shadow-md pb-5 bg-white dark:bg-black p-10 rounded-4xl">
  {/* Text content (comes first in the code, images come second) */}
  <div className="w-full min-w-0 md:flex-1">
    <Reveal>
      <h2 className="home-h2 text-[17px] md:text-base font-bold text-[#282828] text-center md:text-start transition-colors duration-500 dark:text-[#AD8968] border-b-4  border-[#5c5c5c] dark:border-[#AD8968] mb-7 rounded-2xl p-2 w-fit md:w-full">
        Equipping Meeting
      </h2>
    </Reveal>

    <Reveal delay={150}>
      <p className="home-p mt-2 text-sm md:text-lg text-[#6b6b6b] text-center md:text-start transition-colors duration-500 dark:text-slate-300">
        Join us for our Equipping Meetings, where we provide practical teachings and resources to help you grow in your faith and live out your calling.
          <br /><br />
        It comes on the <b>1st day of the week</b>, that's <b>every Sunday, at 02:00 PM.</b> We encourage you to come and be equipped for the journey ahead.

        <br /><br />
        <b>Venue:</b> NAAT Multi-Purpose Hall, behind June 12 FACOOP Supermarket, UNIBEN.

        <br /><br />
        Do well to come with your <b>Bible</b>, <b>notebook</b>, and <b>pen</b>. We look forward to seeing you there!
      </p>
    </Reveal>
  </div>

  <div className="w-full min-w-0 md:flex-1">
    <Reveal delay={300}>
      <img
        className="
        mx-auto
        block
        h-auto
        w-auto
        max-w-full
        max-h-[25rem]
        sm:max-h-[30rem]
        md:max-h-[39rem]
        rounded-lg
        shadow-md
        "
        src="/Equipping Meeting.jpeg"
        alt="Equipping Meeting"
        loading="lazy"
      />
    </Reveal>
  </div>
</section>
</Reveal>

 <Reveal>
 <section className="mt-32 md:mt-40 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:gap-8 lg:gap-16 items-center mb-10 shadow-md pb-5 bg-white dark:bg-black p-10 rounded-4xl">
      <div className="w-full min-w-0 md:flex-1 order-2 md:order-1">
        <Reveal>
          <img 
          className="
          mx-auto
          block
          h-auto
          w-auto
          max-w-full
          max-h-[25rem]
          sm:max-h-[30rem]
          md:max-h-[38rem]
          rounded-lg
          shadow-md
          "
          src="/Cell Meeting.jpeg" 
          alt="Cell Meeting" />
        </Reveal>
      </div>

      <div className="w-full min-w-0 md:flex-1 order-1 md:order-2">
        <Reveal delay={150}>
          <h2 className="home-h2 text-[17px] md:text-lg font-bold text-[#282828] text-center md:text-start transition-colors duration-500 dark:text-[#AD8968] border-b-4  border-[#5c5c5c] dark:border-[#AD8968] mb-7 rounded-2xl p-2 w-fit md:w-full">
            Cell Meeting
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="home-p mt-2 text-sm md:text-base text-[#6b6b6b] text-center md:text-start transition-colors duration-500 dark:text-slate-300">
            <b>Don't miss</b> Cell meeting! <br />
            It's a day of intentional gathering and fellowship together as we meet.
            Join us for our Cell Meetings, where we gather in small groups to study the Bible, pray, and support one another in our faith journey.

            <br /><br />
            These meetings have been designed to bring us closer with one another even as we grow in fellowship with the Lord.
            <br /><br />

             It comes up every <b>2nd day of the week</b>, that's <b>every Monday, at 05:00 PM. </b> 
             <b>Join in a cell centre closest to you</b>. We encourage you to come and be a part of this vibrant community of believers.
          </p>
        </Reveal>
      </div>
 </section>
 </Reveal>

  <Reveal>
 <section className="mt-32 md:mt-40 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:gap-8 lg:gap-16 items-center mb-10 shadow-md pb-5 bg-white dark:bg-black p-10 rounded-4xl">
  <div className="w-full min-w-0 md:flex-1">
    <Reveal>
      <h2 className="home-h2 text-[17px] md:text-lg font-bold text-[#282828] text-center md:text-start transition-colors duration-500 dark:text-[#AD8968] border-b-4  border-[#5c5c5c] dark:border-[#AD8968] mb-7 rounded-2xl p-2 w-fit md:w-full">
        Bible Study Meeting
      </h2>
    </Reveal>

    <Reveal delay={150}>
      <p className="home-p mt-2 text-sm md:text-lg text-[#6b6b6b] text-center md:text-start transition-colors duration-500 dark:text-slate-300">
        Join us for our Bible Study Meetings, where we dive deep into the Word of God and explore its relevance to our daily lives.
        It comes on every <b>5th day of the week</b>, that's <b>every Thursday, at 04:00 PM.</b>

        <br /><br />
        <b>Venue:</b> NAAT Multi-Purpose Hall, behind June 12 FACOOP Supermarket, UNIBEN. <br />
        Let's come together to study the Bible, ask questions, and grow in our understanding of God's Word. We look forward to seeing you there!
      </p>
    </Reveal>
  </div>

  <div className="w-full min-w-0 md:flex-1">
    <Reveal delay={300}>
      <img
        className="
        mx-auto
        block
        h-auto
        w-auto
        max-w-full
        max-h-[25rem]
        sm:max-h-[30rem]
        md:max-h-[39rem]
        rounded-lg
        shadow-md
        "
        src="/SOTK.jpeg"
        alt="Bible Study Meeting"
        loading="lazy"
      />
    </Reveal>
  </div>
</section>
</Reveal>



<Reveal>
<section className="mt-32 md:mt-40 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10 md:gap-8 lg:gap-16 items-center mb-10 shadow-md pb-5 bg-white dark:bg-black p-10 rounded-4xl mb-10">
      <div className="w-full min-w-0 md:flex-1 order-2 md:order-1">
        <Reveal>
          <img 
          className="
          mx-auto
          block
          h-auto
          w-auto
          max-w-full
          max-h-[25rem]
          sm:max-h-[30rem]
          md:max-h-[38rem]
          rounded-lg
          shadow-md
          "
          src="/SOPS.jpeg" 
          alt="SOPS" />
        </Reveal>
      </div>

      <div className="w-full min-w-0 md:flex-1 order-1 md:order-2">
        <Reveal delay={150}>
          <h2 className="home-h2 text-[17px] md:text-lg font-bold text-[#282828] text-start md:text-start transition-colors duration-500 dark:text-[#AD8968] border-b-4 border-[#5c5c5c] dark:border-[#AD8968] mb-7 rounded-2xl p-2  w-fit md:w-full">
            School Of Prayer And The Supernatural (SOPS)
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="home-p mt-2 text-sm md:text-base text-[#6b6b6b] text-start md:text-start transition-colors duration-500 dark:text-slate-300">
            Dear beloved,
            Do you desire to enlarge your prayer capacity or have burdens on your heart? Come as we are taught the practice of prayer and the supernatural in SOPS meeting.

            <br /><br />
            <b>Time:</b> 4pm <br />
            <b> Venue:</b> NAAT Multi-purpose Hall, UNIBEN.
            <br />
            <b>Day:</b> Every 7th day of the week, that's <b>every Saturday.</b>
          </p>
        </Reveal>
      </div>
 </section>
 </Reveal>
    </div>
  )
}

export default Home