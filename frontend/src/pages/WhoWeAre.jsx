import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import Reveal from '../components/common/Reveal'

// Hero video 
const HERO_VIDEO = 'https://res.cloudinary.com/detg3ravj/video/upload/v1792355286/WhoWeAre_u2fch3.mp4'

// Family photo
const FAMILY_IMAGE = '/Give-hero.jpeg'

// Purple brand gradient
const BRAND_GRADIENT =
  'radial-gradient(circle at 85% 15%, rgba(255, 106, 0, 0.28), transparent 45%), linear-gradient(135deg, #4e38a0 0%, #3a2684 55%, #22145c 100%)'

// Pillars on the page
const pillars = [
  {
    number: '01',
    title: 'Authentic worship',
    text: 'Overwhelmed by the gift of salvation we have found in Jesus, our worship is a heartfelt response, honest and wholehearted.',
  },
  {
    number: '02',
    title: 'The local church',
    text: 'We are passionate about the local church: a family where every person belongs, grows and serves.',
  },
  {
    number: '03',
    title: 'Kingdom mission',
    text: 'We are on mission to see God’s kingdom established across the earth, one city and one family at a time.',
  },
]

// Letters of KPAN
const nameWords = [
  { letter: 'K', word: 'Kingdom' },
  { letter: 'P', word: 'Priesthood' },
  { letter: 'A', word: 'Apostolic' },
  { letter: 'N', word: 'Network' },
]

// Weekly Meetings
const week = [
  { day: 'Sunday', name: 'Equipping Meeting', mode: 'In person' },
  { day: 'Monday', name: 'Cell Meeting', mode: 'In person' },
  { day: 'Tuesday', name: 'School of the Kingdom', mode: 'Online' },
  { day: 'Thursday', name: 'Bible Study', mode: 'In person' },
  { day: 'Friday', name: 'Intercessory Prayers', mode: 'Online' },
  { day: 'Saturday', name: 'School of Prayer & the Supernatural', mode: 'In person' },
  { day: 'Monday – Friday', name: 'Daily Sight & Activating Encounters', mode: 'Online' },
]

// Shared label style
const labelClass =
  'font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 sm:text-xs'

// Shared rounded card style
const cardClass =
  'rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#05070f] sm:p-10'

// Shared underlined link style
const cardLinkClass =
  'font-brand-sans mt-8 inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base'

// Sizes for faint backdrop words
const INITIALS_SIZE = 'text-[length:clamp(8rem,28vw,24rem)]'
const NAME_SIZE = 'text-[length:15vw] md:text-[length:clamp(4rem,9.5vw,10rem)]'

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
function Faint({ text, size, italic = false }) {
  return (
    <span
      aria-hidden="true"
      className={`font-brand-serif pointer-events-none -mb-[0.3em] block select-none whitespace-normal leading-[0.85] text-[#ff6a00]/[0.07] md:whitespace-nowrap dark:text-[#ff6a00]/[0.09] ${size} ${
        italic ? 'italic' : ''
      }`}
    >
      {text}
    </span>
  )
}

function WhoWeAre() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  // Keep hero video playing
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const playPromise = video.play()
    if (playPromise !== undefined) playPromise.catch(() => {})
  }, [])

  // Smooth scroll past the hero
  const scrollToContent = () => {
    if (!heroRef.current) return
    window.scrollTo({ top: heroRef.current.offsetHeight, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#F8F7F5] transition-colors duration-500 dark:bg-[#101828]">
      {/* Hero with video background */}
      <section ref={heroRef} aria-label="Hero" className="relative min-h-svh w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          poster={HERO_VIDEO.replace('.mp4', '.jpg')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dim bluish overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(78, 56, 160, 0.45) 0%, rgba(58, 38, 132, 0.58) 55%, rgba(34, 20, 92, 0.8) 100%)',
          }}
        />

        <span
          aria-hidden="true"
          className="font-brand-serif pointer-events-none absolute -bottom-[0.12em] -left-[0.03em] z-[1] select-none whitespace-nowrap text-[length:clamp(9rem,30vw,32rem)] italic leading-none text-white/10"
        >
          TFC
        </span>

        {/* Hero text and buttons */}
        <div className="relative z-[2] mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-5 pb-8 pt-28 sm:px-8 xl:px-10">
          <div className="flex flex-1 flex-col items-start justify-center py-10 text-left">
            <Reveal origin="origin-left" delay={200}>
              <Eyebrow>About us</Eyebrow>
            </Reveal>

            <Reveal origin="origin-left" delay={350}>
              <h1 className="font-brand-serif mt-4 text-[length:clamp(3.25rem,10.5vw,10.5rem)] leading-[0.92] tracking-tight text-white">
                Who we <em className="italic text-[#ff6a00]">are</em>
              </h1>
            </Reveal>

            <Reveal origin="origin-left" delay={500}>
              <div className="my-6 h-px w-16 bg-white/60 sm:my-9" />
              <p className="font-brand-sans max-w-2xl text-base text-white/85 sm:text-xl lg:text-2xl">
                A family of believers in Benin City, touched, transformed and empowered to shape lives,
                territories and nations.
              </p>
            </Reveal>

            <Reveal origin="origin-left" delay={650}>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-10">
                <Link
                  to="/about/leadership"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#ff6a00] px-7 py-4 text-white transition-colors duration-300 hover:bg-[#ff8a33] sm:px-8 sm:py-5"
                >
                  <span className="font-brand-serif text-2xl italic sm:text-[1.7rem]">Meet our leadership</span>
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
          </div>

          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal origin="origin-left" delay={800}>
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

            <Reveal origin="origin-right" delay={950}>
              <div className="text-left sm:text-right">
                <p className="font-brand-serif text-2xl italic text-white sm:text-3xl">One city, one family.</p>
                <p className="font-brand-sans mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                  Touched · Transformed · Empowered
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who we are section */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="TFC" size={INITIALS_SIZE} />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>The Fullness Church</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-3xl leading-[1.1] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-4xl xl:text-5xl">
                  A church that believes in <Accent>Jesus</Accent> and loves God and people.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  We are a community overwhelmed by the gift of salvation we have found in Jesus. It shapes
                  everything we do: a heart for authentic worship, a passion for the local church, and a
                  mission to see God’s kingdom established across the earth.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                  <span className={`${labelClass} text-center`}>Touched · Transformed · Empowered</span>
                  <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Family photo and text */}
      <section className="pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={150}>
              <img
                className="mx-auto block h-auto w-full max-w-full rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40"
                src={FAMILY_IMAGE}
                alt="The Fullness Church family gathered together around a cake"
                loading="lazy"
              />
            </Reveal>

            <div>
              <Reveal origin="origin-left">
                <Eyebrow>Our family</Eyebrow>
              </Reveal>

              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif mt-6 text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  One city, <Accent>one family</Accent>.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans mt-6 max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  We gather in Benin City, and our heart reaches far beyond it. Whoever you are and
                  wherever you are from, there is a place for you at our table.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What we hold dear */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="Heart" size={NAME_SIZE} italic />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>What we hold dear</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  Worship, church and <Accent>mission</Accent>.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Three convictions run through everything we do.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.number} delay={150 + i * 150}>
                  <div className={`${cardClass} h-full`}>
                    <p className="font-brand-serif text-5xl italic text-[#ff6a00]">{pillar.number}</p>
                    <h3 className="font-brand-serif mt-6 text-3xl italic leading-tight text-[#1c2333] dark:text-white sm:text-4xl">
                      {pillar.title}
                    </h3>
                    <p className="font-brand-sans mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                      {pillar.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our heart */}
      <section className="pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-14 lg:p-20"
              style={{ background: BRAND_GRADIENT }}
            >
              <Eyebrow>Our heart</Eyebrow>

              <p className="font-brand-serif mt-8 max-w-4xl text-3xl italic leading-snug text-white sm:text-4xl lg:text-5xl">
                “Gaining power and influence with God to shape lives, territories, spheres and nations.”
              </p>

              <p className="font-brand-sans mt-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                Touched · Transformed · Empowered
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What K-PAN stands for */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="K-PAN" size={INITIALS_SIZE} italic />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>Our name</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  What <Accent>K-PAN</Accent> stands for.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Four words that carry who we are.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {nameWords.map((item, i) => (
                <Reveal key={item.letter} delay={150 + i * 120}>
                  <div className={`${cardClass} h-full !p-7`}>
                    <span className="block h-px w-12 bg-[#ff6a00]" />
                    <p className="font-brand-serif mt-6 text-7xl leading-none text-[#1c2333] dark:text-white sm:text-8xl">
                      {item.letter}
                    </p>
                    <p className="font-brand-serif mt-4 text-2xl italic text-slate-600 dark:text-slate-300">
                      {item.word}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* A week with us */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="Weekly" size={NAME_SIZE} italic />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="self-start lg:sticky lg:top-32">
              <Reveal origin="origin-left">
                <Eyebrow>A week with us</Eyebrow>
              </Reveal>

              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif mt-6 text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  Every week, a place for <Accent>you</Accent>.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans mt-6 max-w-md text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Join one meeting or all of them, in person at UNIBEN or online from wherever you are.
                </p>

                <Link to="/" className={cardLinkClass}>
                  See times and venues
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <ul className={cardClass}>
                {week.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-slate-200 py-6 first:pt-0 last:border-b-0 last:pb-0 dark:border-white/10"
                  >
                    <div>
                      <p className={labelClass}>{item.day}</p>
                      <p className="font-brand-serif mt-2 text-2xl italic text-[#1c2333] dark:text-white sm:text-3xl">
                        {item.name}
                      </p>
                    </div>

                    <span
                      className={`font-brand-sans rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        item.mode === 'Online'
                          ? 'border-slate-300 text-slate-500 dark:border-white/20 dark:text-slate-300'
                          : 'border-[#ff6a00] text-[#ff6a00]'
                      }`}
                    >
                      {item.mode}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing invitation and links */}
      <section className="pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-14 lg:p-20"
              style={{ background: BRAND_GRADIENT }}
            >
              <Eyebrow>Come and see</Eyebrow>

              <h2 className="font-brand-serif mt-6 max-w-3xl text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                There is a <em className="italic text-[#ff6a00]">seat</em> for you.
              </h2>

              <p className="font-brand-sans mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Join us in person at the NAAT Multi-Purpose Hall, UNIBEN, or worship with us online from
                wherever you are.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <Link
                  to="/location"
                  className="font-brand-sans inline-flex w-fit items-center gap-2 rounded-full bg-[#ff6a00] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white hover:text-[#22145c]"
                >
                  Plan your visit
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/about/leadership"
                  className="font-brand-sans inline-flex items-center gap-2 border-b border-white/70 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] sm:text-sm"
                >
                  Meet our leadership
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default WhoWeAre