import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from 'lucide-react'
import Reveal from '../components/common/Reveal'

const HERO_IMAGE = '/Leadership.jpeg'

// POST target for the join form
const WORKFORCE_API = '/api/workforce'

const HERO_OVERLAY =
  'radial-gradient(circle at 85% 15%, rgba(255, 106, 0, 0.22), transparent 45%), linear-gradient(to bottom, rgba(78, 56, 160, 0.45) 0%, rgba(58, 38, 132, 0.6) 55%, rgba(34, 20, 92, 0.85) 100%)'

const PURPLE_GRADIENT =
  'radial-gradient(circle at 85% 15%, rgba(255, 106, 0, 0.28), transparent 45%), linear-gradient(135deg, #4e38a0 0%, #3a2684 55%, #22145c 100%)'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea'

const labelClass =
  'font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 sm:text-xs'

const cardClass =
  'rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#05070f] sm:p-10'

const leaderCardClass =
  'group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-500 hover:-translate-y-1 hover:border-[#ff6a00]/50 hover:shadow-xl hover:shadow-black/10 dark:border-white/10 dark:bg-[#05070f] dark:hover:shadow-black/40'

const fieldClass =
  'font-brand-sans w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#1c2333] outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[#ff6a00] dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:[color-scheme:dark] sm:text-base'

const pillDarkClass =
  'font-brand-sans inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#0f172a] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#ff6a00] dark:bg-[#ff6a00] dark:hover:bg-white dark:hover:text-[#0f172a]'

const textLinkClass =
  'font-brand-sans inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base'

const INITIALS_SIZE = 'text-[length:clamp(8rem,28vw,24rem)]'
const NAME_SIZE = 'text-[length:15vw] md:text-[length:clamp(4rem,9.5vw,10rem)]'

// Leadership team data
const people = [
  {
    slug: 'apostle-joshua-okorie',
    image: '/Apostle.jpeg',
    title: 'Apostle',
    name: 'Joshua Okorie',
    role: 'Lead Pastor',
    serves: 'Every meeting, in person and online',
    short:
      'A shepherd with a heart for people, a hunger for the Word, and a burden to see God’s kingdom established across the earth. He leads K-PAN Ministries and The Fullness Church with warmth, conviction and a servant’s humility.',
    bio: [
      'Apostle Joshua Okorie leads K-PAN Ministries and The Fullness Church with a deep love for God’s Word and a shepherd’s heart for people. His life and ministry are given to raising believers who are rooted in Christ, full of the Spirit and equipped for every good work.',
      'Through teaching, prayer and personal care, his desire is simple: one city, one family, touched, transformed and empowered.',
    ],
    verse: {
      text: 'Feed the flock of God which is among you, taking the oversight thereof, not by constraint, but willingly.',
      ref: '1 Peter 5:2',
    },
  },
  {
    slug: 'raphael-odion',
    image: '/Pastor Raphael.jpg',
    title: 'Pastor',
    name: 'Raphael Odion',
    role: 'Associate Pastor',
    serves: 'Meeting Facilitation (Every meeting, in person and online)',
    short:
      'Stands with the Apostle in shepherding the house, with a steady hand and a servant’s heart.',
    bio: [
      'Pastor Raphael works closely with the Apostle in the day-to-day shepherding of the church, helping believers settle, grow and find their place in the family.',
      'He gives himself to patient teaching, open doors and walking with people through every season.',
    ],
    verse: {
      text: 'Be thou diligent to know the state of thy flocks, and look well to thy herds.',
      ref: 'Proverbs 27:23',
    },
  },
  {
    slug: 'meshack-ignatius',
    image: '/Meshack.jpeg',
    title: 'Minister',
    name: 'Meshack Ignatius',
    role: 'Visual & Media Arts Minister',
    serves: 'Projects visuals on screen',
    short:
      'Works with the media and oversees the best outputs for all videos, photos and audios.',
    bio: [
      'Minister Meshack overees that all necessary videos, audios, songs, texts, are cast on the big screen. Assisting the congregation to follow and sing along during worships, praises, prayers, etc.', 
      'He also projects bible verses on the screen for the congregation to follow as well. He preceeds over the video and audio edits, makes sure that sermon sessions, worship sessions, praise sessions, etc are eidted to give out the best outputs for future uses.',
    ],
    verse: {
      text: 'Write the vision, and make it plain upon tables, that he may run that readeth it.',
      ref: 'Habakkuk 2:2',
    },
  },
  {
    slug: 'victor-nwokolo',
    image: '/Victor Nwokolo.jpg',
    title: 'Minister',
    name: 'Victor Nwokolo',
    role: 'Manages service protocol activities',
    serves: 'Audio & Sound Unit',
    short:
      'Assists in coordinating church services by supporting ministers, and ensuring smooth service operations.',
    bio: [
      'Minister Victor serves as the dedicated Audio & Stage Technician, ensuring every speaker, testifier, and minister is seamlessly equipped with a working microphone. He oversees pre-service sound checks to guarantee optimal audio quality for the entire congregation.',
      'Beyond managing live audio transitions during the service, he coordinates the careful handling and breakdown of all musical instruments and equipment once service concludes, maintaining order and readiness for the next gathering.',
    ],
    verse: {
      text: 'Let all things be done decently and in order.',
      ref: '1 Corinthians 14:40',
    },
  },
  {
    slug: 'oluchi-agadi',
    image: '/Luchy.jpg',
    title: 'Minister',
    name: 'Oluchi Agadi',
    role: 'Media',
    serves: 'Media Unit',
    short:
      '',
    bio: [
      'Minister Oluchi serves with dedication in the Media Unit, helping to broadcast the message of the ministry and amplify its reach across digital and physical platforms. ',
      'With a keen eye for technical excellence and communication, she ensures that every service, broadcast, and digital touchpoint engages the congregation seamlessly and projects the standard of the house.'
    ],
    verse: {
      text: 'he Lord gave the word: great was the company of those that published it.',
      ref: 'Psalm 68:11',
    },
  },
  {
    slug: 'samuel-aigbe',
    title: 'Pastor',
    name: 'Samuel Aigbe',
    role: 'Prayer & Intercession',
    serves: 'SOPS & Intercessory Prayers',
    short:
      'Stands in the gap for the church, the city and the nations until God’s will prevails.',
    bio: [
      'Pastor Samuel leads the church’s prayer life, from the School of Prayer & the Supernatural to the online intercessory sessions.',
      'He teaches that prayer is a relationship, not a ritual, and trains others to hold the line with him.',
    ],
    verse: {
      text: 'God forbid that I should sin against the LORD in ceasing to pray for you.',
      ref: '1 Samuel 12:23',
    },
  },
  {
    slug: 'ruth-omoregie',
    title: 'Pastor',
    name: 'Ruth Omoregie',
    role: 'Teaching & Discipleship',
    serves: 'Bible Study & School of the Kingdom',
    short: 'Opens the Word with clarity and helps believers apply it to everyday life.',
    bio: [
      'Pastor Ruth leads the teaching and discipleship track, building believers who know the Word and live it.',
      'From the Thursday Bible Study to the School of the Kingdom, her focus is depth, one passage at a time.',
    ],
    verse: {
      text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.',
      ref: '2 Timothy 2:15',
    },
  },
  {
    slug: 'michael-uyi',
    title: 'Pastor',
    name: 'Michael Uyi',
    role: 'Youth & Campus',
    serves: 'Campus & youth fellowship',
    short: 'Raises a generation on campus that is bold in faith and clear in purpose.',
    bio: [
      'Pastor Michael gives oversight to the church’s youth and campus work, helping young people hold on to Christ in a demanding season.',
      'He believes the best investment a church can make is in people who are just getting started.',
    ],
    verse: {
      text: 'Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.',
      ref: '1 Timothy 4:12',
    },
  },
  {
    slug: 'joy-enaruna',
    title: 'Pastor',
    name: 'Joy Enaruna',
    role: 'Administration & Operations',
    serves: 'Church administration',
    short: 'Keeps the house in order, so the ministry can move without friction.',
    bio: [
      'Pastor Joy coordinates the administrative backbone of the ministry: schedules, teams, records and the many small details that make a service feel effortless.',
      'Behind every smooth Sunday is a steady plan, and she is usually the one who drew it.',
    ],
    verse: {
      text: 'Let all things be done decently and in order.',
      ref: '1 Corinthians 14:40',
    },
  },
].map((person) => ({ image: `/leaders/${person.slug}.jpg`, ...person }))

const featured = people[0]
const team = people.slice(1)

const departments = [
  {
    name: 'Media',
    blurb: 'Photography, video, livestream and graphics: carrying the message beyond the walls.',
    link: { label: 'See our media', to: '/media' },
  },
  {
    name: 'Ushering',
    blurb: 'The first smile at the door and the last word at the gate, welcoming every guest with grace.',
  },
  {
    name: 'Choir',
    blurb: 'Voices lifted together, leading the congregation into the presence of God.',
  },
  {
    name: 'Music',
    blurb: 'Keys, drums, bass and guitar, giving worship its rhythm and room to breathe.',
  },
  {
    name: 'Sound & Technical',
    blurb: 'Sound, lighting and projection, so every word and every note lands clearly.',
  },
  {
    name: 'Protocol & Security',
    blurb: 'Order, safety and calm, so the house can gather without worry.',
  },
  // {
  //   name: 'Children’s Ministry',
  //   blurb: 'Teaching and caring for the youngest members of the family.',
  // },
  {
    name: 'Welfare & Hospitality',
    blurb: 'Meeting practical needs and making every visitor feel at home.',
  },
]

const profileHref = (slug) => `?leader=${slug}`

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const splitName = (name) => {
  const words = name.split(' ')
  return [words.slice(0, -1).join(' '), words[words.length - 1]]
}

const initialsOf = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')

function Accent({ children }) {
  return <em className="italic text-[#ff6a00]">{children}</em>
}

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

function PersonName({ person }) {
  const [first, last] = splitName(person.name)
  return (
    <>
      {person.title} {first} <Accent>{last}</Accent>
    </>
  )
}

function Portrait({ person, className = '', initialsClass = 'text-7xl', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const label = `${person.title} ${person.name}`

  useEffect(() => setFailed(false), [person.image])

  if (failed) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`grid place-items-center bg-gradient-to-br from-[#4e38a0] via-[#3a2684] to-[#22145c] ${className}`}
      >
        <span className={`font-brand-serif italic text-white/30 ${initialsClass}`}>
          {initialsOf(person.name)}
        </span>
      </div>
    )
  }

  return (
    <img
      src={person.image}
      alt={label}
      loading={loading}
      onError={() => setFailed(true)}
      className={`block object-cover ${className}`}
    />
  )
}

function Hero({ onMeet, onJoin }) {
  const mediaRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const progress = Math.min(1, window.scrollY / window.innerHeight)
      if (mediaRef.current) mediaRef.current.style.transform = `scale(${1 + progress * 0.08})`
      if (textRef.current) {
        textRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.3))
        textRef.current.style.transform = `translate3d(0, ${progress * 60}px, 0)`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Hero section
  return (
    <section
      aria-label="Hero"
      className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-[#22145c]"
    >
      <img
        ref={mediaRef}
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      <div aria-hidden="true" className="absolute inset-0" style={{ background: HERO_OVERLAY }} />

      <span
        aria-hidden="true"
        className="font-brand-serif pointer-events-none absolute -bottom-[0.12em] -left-[0.03em] z-[1] select-none whitespace-nowrap text-[length:clamp(6rem,22vw,24rem)] italic leading-none text-white/10"
      >
        Leaders
      </span>

      <div
        ref={textRef}
        className="relative z-[2] mx-auto flex h-full w-full max-w-[1600px] flex-col justify-end px-5 pb-14 pt-28 will-change-transform sm:px-8 sm:pt-36 md:pb-20 xl:px-10"
      >
        <Reveal origin="origin-left" delay={100}>
          <Eyebrow>About · Leadership</Eyebrow>
        </Reveal>

        <Reveal origin="origin-left" delay={250}>
          <h1 className="font-brand-serif mt-4 text-[length:clamp(3rem,9vw,9rem)] leading-[0.95] tracking-tight text-white">
            Shepherds &amp; <em className="italic text-[#ff6a00]">Servants</em>
          </h1>
        </Reveal>

        <Reveal origin="origin-left" delay={400}>
          <div className="my-6 h-px w-16 bg-white/60 sm:my-8" />
          <p className="font-brand-serif max-w-2xl text-2xl italic text-white/90 sm:text-3xl lg:text-4xl">
            The men and women who pray, teach and serve, so that everyone finds a family.
          </p>
        </Reveal>

        <Reveal origin="origin-left" delay={550}>
          <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <button
                type="button"
                onClick={onMeet}
                className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full bg-[#ff6a00] px-7 py-4 text-white transition-colors duration-300 hover:bg-[#ff8a33]"
              >
                <span className="font-brand-serif text-2xl italic">Meet the team</span>
                <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onJoin}
                className="font-brand-sans inline-flex cursor-pointer items-center gap-2 border-b border-white/70 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] sm:text-sm"
              >
                Join a workforce
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <p className="font-brand-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
              Led by the Spirit · Serving with love
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Intro section with the Apostle and a short description of the leadership team
function Intro() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <Faint text="Serve" size={INITIALS_SIZE} italic />

        <div className="relative">
          <Reveal origin="origin-left">
            <Eyebrow>Our leadership</Eyebrow>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal origin="origin-left" delay={100}>
              <h2 className="font-brand-serif text-3xl leading-[1.1] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-4xl xl:text-5xl">
                Led by the Spirit, <Accent>serving</Accent> with love.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                K-PAN Ministries is led by a team of men and women who have given their lives to God
                and to people. They pray, teach, plan and serve, so that everyone who walks through
                our doors finds a family.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                <span className={`${labelClass} text-center`}>Meet the Apostle</span>
                <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// Section that highlights the Apostle and gives a short bio, with a link to the full profile
function ApostleSection({ person, onOpen }) {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <Faint text="Apostle" size={NAME_SIZE} italic />

        <div className="relative">
          <Reveal origin="origin-left">
            <Eyebrow>The Apostle</Eyebrow>
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal delay={150}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-2.5 h-full w-full rounded-3xl border-2 border-black/10 transition-colors duration-500 bg-[#87654e] dark:bg-[#87654e]/40"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-black/10 dark:shadow-black/40">
                  <Portrait person={person} className="h-full w-full" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className={cardClass}>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-[#ff6a00]" />
                  <span className={labelClass}>{person.role}</span>
                </div>

                <h2 className="font-brand-serif mt-6 text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  <PersonName person={person} />
                </h2>

                <p className="font-brand-sans mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                  {person.short}
                </p>

                <blockquote className="mt-8 border-l-2 border-[#ff6a00] pl-6">
                  <p className="font-brand-serif text-xl italic leading-snug text-[#1c2333] dark:text-white sm:text-2xl">
                    “{person.verse.text}”
                  </p>
                  <footer className={`${labelClass} mt-3`}>{person.verse.ref}</footer>
                </blockquote>

                <Link
                  to={profileHref(person.slug)}
                  state={{ fromGrid: true }}
                  onClick={onOpen}
                  className={`${textLinkClass} mt-8`}
                >
                  Read full profile
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// Card for a single leader in the grid, with a link to their profile
function LeaderCard({ person, number, onOpen }) {
  return (
    <Link
      to={profileHref(person.slug)}
      state={{ fromGrid: true }}
      onClick={onOpen}
      className={leaderCardClass}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <Portrait
          person={person}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
        />
        <span className="font-brand-sans absolute left-4 top-4 text-[11px] font-semibold tracking-[0.3em] text-white/90">
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-4">
        <p className="font-brand-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
          {person.role}
        </p>
        <h3 className="font-brand-serif mt-2 text-3xl italic leading-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-4xl">
          {person.title} {person.name}
        </h3>
        <p className="font-brand-sans mt-3 line-clamp-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {person.short}
        </p>

        <div className="mt-auto pt-6">
          <span className="font-brand-sans inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 group-hover:border-[#ff6a00] group-hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base">
            View profile
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// Section that shows the grid of leaders, with a link to each profile
function LeadersSection({ leaders, onOpen }) {
  return (
    <section id="leaders" className="relative scroll-mt-20 overflow-hidden pt-20 md:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <Faint text="Team" size={INITIALS_SIZE} italic />

        <div className="relative">
          <Reveal origin="origin-left">
            <Eyebrow>The leadership team</Eyebrow>
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal origin="origin-left" delay={100}>
              <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                Shepherds who <Accent>walk</Accent> beside us.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                Select a leader to read more about their calling and where they serve.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {leaders.map((person, i) => (
              <Reveal key={person.slug} delay={(i % 3) * 120} className="h-full">
                <LeaderCard
                  person={person}
                  number={String(i + 1).padStart(2, '0')}
                  onOpen={onOpen}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Section that shows the departments and allows users to join a workforce
function WorkforceSection({ onJoin }) {
  return (
    <section id="workforce" className="relative scroll-mt-20 overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <Faint text="Serve" size={INITIALS_SIZE} italic />

        <div className="relative">
          <Reveal origin="origin-left">
            <Eyebrow>Join a workforce</Eyebrow>
          </Reveal>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <Reveal origin="origin-left" delay={100}>
              <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                Every gift has a <Accent>place</Accent> in the house.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                The house runs on willing hands. Choose a department, tell us a little about
                yourself, and a leader will reach out to welcome you into the team.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                <span className={`${labelClass} text-center`}>
                  {departments.length} departments · one body
                </span>
                <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div
              className="mt-12 overflow-hidden rounded-[2rem] p-6 text-white sm:p-10 lg:p-14"
              style={{ background: PURPLE_GRADIENT }}
            >
              <ul>
                {departments.map((dept, i) => (
                  <li
                    key={dept.name}
                    className="group grid gap-x-8 gap-y-4 border-b border-white/15 py-7 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center"
                  >
                    <span className="font-brand-sans text-xs font-semibold tracking-[0.3em] text-white/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h3 className="font-brand-serif text-3xl italic leading-tight transition-colors duration-300 group-hover:text-[#ff6a00] sm:text-4xl">
                        {dept.name}
                      </h3>
                      <p className="font-brand-sans mt-2 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
                        {dept.blurb}
                      </p>

                      {dept.link && (
                        <Link
                          to={dept.link.to}
                          className="font-brand-sans mt-4 inline-flex items-center gap-2 border-b border-white/50 pb-0.5 text-sm text-white transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00]"
                        >
                          {dept.link.label}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onJoin(dept)}
                      aria-label={`Join the ${dept.name} department`}
                      className="font-brand-sans inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0f172a]"
                    >
                      Join now
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-brand-sans mt-8 text-[15px] text-slate-600 dark:text-slate-300 sm:text-base">
              Not sure where you fit?{' '}
              <Link
                to="/contact"
                className="border-b border-slate-400 pb-0.5 text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white"
              >
                Talk to us
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function JoinModal({ department, onClose }) {
  const [status, setStatus] = useState('idle')
  const [chosen, setChosen] = useState('')
  const [shown, setShown] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    const html = document.documentElement
    const previousOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    const frame = requestAnimationFrame(() => {
      setShown(true)
      dialogRef.current?.querySelector('input')?.focus()
    })

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      html.style.overflow = previousOverflow
      opener?.focus?.()
    }
  }, [onClose])

  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))

    setChosen(data.department)
    if (data.website) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(WORKFORCE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          department: data.department,
          note: data.note.trim(),
        }),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  // Modal dialog for joining a workforce
  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:items-center sm:p-6 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-title"
        className={`relative max-h-[92svh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-3xl border border-slate-200 bg-white p-7 shadow-2xl transition-[transform,opacity] duration-500 ease-out dark:border-white/10 dark:bg-[#05070f] sm:rounded-3xl sm:p-10 ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-black/15 text-[#1c2333] transition-colors duration-300 hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'sent' ? (
          <div className="py-6 text-center sm:py-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#ff6a00] text-white">
              <Check className="h-8 w-8" />
            </span>
            <h2
              id="join-title"
              className="font-brand-serif mt-8 text-4xl italic leading-tight text-[#1c2333] dark:text-white sm:text-5xl"
            >
              Welcome to the <Accent>team</Accent>!
            </h2>
            <p className="font-brand-sans mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Thank you. A leader from the {chosen} team will reach out to you soon.
            </p>
            <button type="button" onClick={onClose} className={`${pillDarkClass} mt-8`}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 pr-12">
              <span className="h-px w-12 bg-[#ff6a00]" />
              <span className={labelClass}>Join a workforce</span>
            </div>
            <h2
              id="join-title"
              className="font-brand-serif mt-6 text-4xl italic leading-tight text-[#1c2333] dark:text-white sm:text-5xl"
            >
              Join the <Accent>team</Accent>.
            </h2>
            <p className="font-brand-sans mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Fill in your details and a leader will reach out to you.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Full name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={`${fieldClass} mt-2`}
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Phone / WhatsApp</span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+234…"
                    className={`${fieldClass} mt-2`}
                  />
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Email (optional)</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${fieldClass} mt-2`}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Department</span>
                <select
                  name="department"
                  required
                  defaultValue={department.name}
                  className={`${fieldClass} mt-2`}
                >
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className={labelClass}>Anything we should know? (optional)</span>
                <textarea
                  name="note"
                  rows={3}
                  placeholder="Experience, availability, or a word about yourself"
                  className={`${fieldClass} mt-2 resize-none`}
                />
              </label>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {status === 'error' && (
                <p
                  role="alert"
                  className="font-brand-sans text-sm text-[#b3261e] dark:text-red-400"
                >
                  We couldn’t send your details. Please check your connection and try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="font-brand-sans inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#ff6a00] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#ff8a33] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send my details'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

function PagerLink({ person, direction, state }) {
  const isNext = direction === 'next'

  // Link to the next or previous leader profile
  return (
    <Link
      to={profileHref(person.slug)}
      replace
      state={state}
      className={`group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:border-[#ff6a00]/50 dark:border-white/10 dark:bg-[#05070f] ${
        isNext ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
        <Portrait person={person} className="h-full w-full" initialsClass="text-xl" />
      </div>

      <div className="min-w-0 flex-1">
        <p className={labelClass}>{isNext ? 'Next' : 'Previous'}</p>
        <p className="font-brand-serif mt-1 truncate text-2xl italic text-[#1c2333] dark:text-white">
          {person.title} {person.name}
        </p>
      </div>

      {isNext ? (
        <ArrowRight className="h-5 w-5 shrink-0 text-[#ff6a00] transition-transform duration-300 group-hover:translate-x-1" />
      ) : (
        <ArrowLeft className="h-5 w-5 shrink-0 text-[#ff6a00] transition-transform duration-300 group-hover:-translate-x-1" />
      )}
    </Link>
  )
}

function LeaderDetail({ person, prev, next, state, onBack }) {
  const firstName = person.name.split(' ')[0]

  return (
    <div className="bg-[#F8F7F5] transition-colors duration-500 dark:bg-[#101828]">
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: PURPLE_GRADIENT }} />

        <span
          aria-hidden="true"
          className="font-brand-serif pointer-events-none absolute -bottom-[0.12em] -left-[0.03em] select-none whitespace-nowrap text-[length:clamp(7rem,22vw,20rem)] italic leading-none text-white/10"
        >
          {firstName}
        </span>

        <div className="relative mx-auto flex min-h-[64svh] w-full max-w-[1600px] flex-col justify-end px-5 pb-12 pt-32 sm:px-8 sm:pt-40 md:pb-16 xl:px-10">
          <Reveal origin="origin-left" delay={100}>
            <button
              type="button"
              onClick={onBack}
              className="font-brand-sans group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full border border-white/50 bg-black/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              All leaders
            </button>
          </Reveal>

          <Reveal origin="origin-left" delay={250}>
            <div className="mt-10">
              <Eyebrow>Leadership — {person.role}</Eyebrow>
            </div>
          </Reveal>

          <Reveal origin="origin-left" delay={400}>
            <h1 className="font-brand-serif mt-4 text-[length:clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-white">
              <PersonName person={person} />
            </h1>
          </Reveal>

          <Reveal origin="origin-left" delay={550}>
            <div className="my-6 h-px w-16 bg-white/60 sm:my-8" />
            <p className="font-brand-serif max-w-2xl text-2xl italic text-white/90 sm:text-3xl">
              Serving in {person.serves}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal delay={100}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -right-2.5 h-full w-full rounded-3xl border-2 border-black/10 transition-colors duration-500 bg-[#87654e] dark:bg-[#87654e]/40"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl shadow-black/10 dark:shadow-black/40">
                  <Portrait person={person} loading="eager" className="h-full w-full" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className={cardClass}>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-[#ff6a00]" />
                  <span className={labelClass}>About</span>
                </div>

                <div className="font-brand-sans mt-8 space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                  {person.bio.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <dl className="mt-8 grid gap-6 border-t border-slate-200 pt-8 dark:border-white/10 sm:grid-cols-2">
                  <div>
                    <dt className={labelClass}>Role</dt>
                    <dd className="font-brand-sans mt-2 text-base font-semibold text-slate-700 dark:text-slate-200 sm:text-lg">
                      {person.role}
                    </dd>
                  </div>
                  <div>
                    <dt className={labelClass}>Serves in</dt>
                    <dd className="font-brand-sans mt-2 text-base font-semibold text-slate-700 dark:text-slate-200 sm:text-lg">
                      {person.serves}
                    </dd>
                  </div>
                </dl>

                <blockquote className="mt-8 border-l-2 border-[#ff6a00] pl-6">
                  <p className="font-brand-serif text-xl italic leading-snug text-[#1c2333] dark:text-white sm:text-2xl">
                    “{person.verse.text}”
                  </p>
                  <footer className={`${labelClass} mt-3`}>{person.verse.ref}</footer>
                </blockquote>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 border-t border-slate-200 pt-12 dark:border-white/10">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <PagerLink person={prev} direction="prev" state={state} />
                <PagerLink person={next} direction="next" state={state} />
              </div>

              <div className="mt-10 flex justify-center">
                <button type="button" onClick={onBack} className={pillDarkClass}>
                  <ArrowLeft className="h-4 w-4" />
                  All leaders
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

function Leadership() {
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [joinDept, setJoinDept] = useState(null)
  const savedScroll = useRef(null)

  // To find the active leader based on the URL parameter
  const index = people.findIndex((person) => person.slug === params.get('leader'))
  const active = index === -1 ? null : people[index]
  const activeSlug = active?.slug ?? null

  const lastSlug = useRef(activeSlug)

  useLayoutEffect(() => {
    if (lastSlug.current === activeSlug) return
    lastSlug.current = activeSlug
    setJoinDept(null)

    if (activeSlug) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (savedScroll.current !== null) {
      window.scrollTo({ top: savedScroll.current, behavior: 'instant' })
    } else {
      document.getElementById('leaders')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }, [activeSlug])

  const rememberScroll = useCallback(() => {
    savedScroll.current = window.scrollY
  }, [])

  const closeJoin = useCallback(() => setJoinDept(null), [])

  const goBack = () => {
    if (state?.fromGrid) navigate(-1)
    else navigate(pathname, { replace: true })
  }

  if (active) {
    return (
      <LeaderDetail
        person={active}
        prev={people[(index - 1 + people.length) % people.length]}
        next={people[(index + 1) % people.length]}
        state={state}
        onBack={goBack}
      />
    )
  }

  return (
    <div>
      <Hero onMeet={() => scrollToId('leaders')} onJoin={() => scrollToId('workforce')} />

      <div className="relative z-10 rounded-t-[2rem] bg-[#F8F7F5] shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.45)] transition-colors duration-500 dark:bg-[#101828] md:rounded-t-[3rem]">
        <Intro />
        <ApostleSection person={featured} onOpen={rememberScroll} />
        <LeadersSection leaders={team} onOpen={rememberScroll} />
        <WorkforceSection onJoin={setJoinDept} />
      </div>

      {joinDept && <JoinModal department={joinDept} onClose={closeJoin} />}
    </div>
  )
}

export default Leadership