import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Check, Copy, Download, Heart } from 'lucide-react'
import Reveal from '../components/common/Reveal'

// Flyer image path
const FLYER = '/KPAN Financial Account Flyer.jpeg'

// Hero background image path
const HERO_IMAGE = '/Give-hero.jpeg'

// Bank details
const BANK = 'FirstBank Nigeria'
const ACCOUNT_NAME = 'KPAN MINISTRIES'

const nairaAccount = { currency: 'Naira', code: 'NGN', number: '2046550602' }

const foreignAccounts = [
  { currency: 'US Dollar', code: 'USD', number: '2046793339' },
  { currency: 'Euro', code: 'EUR', number: '2046793889' },
  { currency: 'British Pound', code: 'GBP', number: '2046793580' },
]

// Shared small label style
const labelClass =
  'font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 sm:text-xs'

// Shared card style
const cardClass =
  'rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#05070f] sm:p-10'

// Faint word sizes
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

// Copies an account number
function CopyButton({ value, label, className = '' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('textarea')
      input.value = value
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label} account number`}
      className={`font-brand-sans inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:bg-[#ff6a00] hover:text-white dark:border-white/20 dark:text-white ${className}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function Give() {
  const accountsRef = useRef(null)

  // Smooth scroll to accounts
  const scrollToAccounts = () => {
    accountsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-[#F8F7F5] transition-colors duration-500 dark:bg-[#101828]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Hero background photo, sits under the colour overlay */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(255, 106, 0, 0.28), transparent 45%), linear-gradient(135deg, #4e38a0 0%, #3a2684 55%, #22145c 100%)',
          }}
        />

        <span
          aria-hidden="true"
          className="font-brand-serif pointer-events-none absolute -bottom-[0.12em] -left-[0.03em] select-none whitespace-nowrap text-[length:clamp(9rem,30vw,32rem)] italic leading-none text-white/10"
        >
          Give
        </span>

        <div className="relative mx-auto flex min-h-[78svh] w-full max-w-[1600px] flex-col justify-end px-5 pb-14 pt-36 sm:px-8 md:pb-20 xl:px-10">
          <Reveal origin="origin-left" delay={100}>
            <Eyebrow>Give</Eyebrow>
          </Reveal>

          <Reveal origin="origin-left" delay={250}>
            <h1 className="font-brand-serif mt-4 text-[length:clamp(3rem,9vw,9rem)] leading-[0.95] tracking-tight text-white">
              Financial <em className="italic text-[#ff6a00]">Partnership</em>
            </h1>
          </Reveal>

          <Reveal origin="origin-left" delay={400}>
            <div className="my-6 h-px w-16 bg-white/60 sm:my-8" />
            <p className="font-brand-serif max-w-2xl text-3xl italic text-white/90 sm:text-4xl">
              Givings, tithes, offerings.
            </p>
          </Reveal>

          <Reveal origin="origin-left" delay={550}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={scrollToAccounts}
                className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full bg-[#ff6a00] px-7 py-4 text-white transition-colors duration-300 hover:bg-[#ff8a33]"
              >
                <span className="font-brand-serif text-2xl italic">Give now</span>
                <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              <p className="font-brand-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                Givings · Offerings · Partnerships · Seeds
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Season message */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="Give" size={INITIALS_SIZE} italic />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>A word for the season</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  Stay conscious of the new <Accent>season</Accent>!
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Thank you for joining our meetings with hunger, honour, and expectation. We pray that
                  what the Lord has worked for you, in the Lord, will be sustained and increased. Every
                  seed you sow is an act of worship and a partnership in what God is doing through this
                  ministry.
                </p>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <blockquote className="mt-14 border-l-2 border-[#ff6a00] pl-6 sm:pl-8">
                <p className="font-brand-serif max-w-4xl text-2xl italic leading-snug text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-3xl lg:text-4xl">
                  “Every man according as he purposeth in his heart, so let him give; not grudgingly, or
                  of necessity: for God loveth a cheerful giver.”
                </p>
                <footer className={`${labelClass} mt-4`}>2 Corinthians 9:7</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Account details */}
      <section
        ref={accountsRef}
        id="accounts"
        className="relative scroll-mt-20 overflow-hidden pt-20 md:pt-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="Accounts" size={NAME_SIZE} italic />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>Account details</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  Send your giving <Accent>here</Accent>.
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  For your givings, offerings, partnerships and seeds, kindly send to the account below.
                  For foreign currency partnerships, use the account that matches your currency.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              <div className="space-y-6">
                {/* Naira account */}
                <Reveal delay={150}>
                  <div className={cardClass}>
                    <div className="flex items-center gap-4">
                      <span className="h-px w-12 bg-[#ff6a00]" />
                      <span className={labelClass}>
                        {nairaAccount.currency} · {nairaAccount.code}
                      </span>
                    </div>

                    <p className={`${labelClass} mt-8`}>Account number</p>
                    <p className="font-brand-serif mt-2 break-all text-5xl tracking-wide text-[#1c2333] dark:text-white sm:text-6xl">
                      {nairaAccount.number}
                    </p>

                    <dl className="mt-8 grid gap-6 border-t border-slate-200 pt-8 dark:border-white/10 sm:grid-cols-2">
                      <div>
                        <dt className={labelClass}>Bank</dt>
                        <dd className="font-brand-sans mt-2 text-base text-slate-700 dark:text-slate-200 sm:text-lg">
                          {BANK}
                        </dd>
                      </div>
                      <div>
                        <dt className={labelClass}>Account name</dt>
                        <dd className="font-brand-sans mt-2 text-base font-semibold text-slate-700 dark:text-slate-200 sm:text-lg">
                          {ACCOUNT_NAME}
                        </dd>
                      </div>
                    </dl>

                    <CopyButton value={nairaAccount.number} label={nairaAccount.currency} className="mt-8" />
                  </div>
                </Reveal>

                {/* Foreign currency accounts */}
                <Reveal delay={250}>
                  <div className={cardClass}>
                    <div className="flex items-center gap-4">
                      <span className="h-px w-12 bg-[#4f46a5] dark:bg-[#8b7cf6]" />
                      <span className={labelClass}>Foreign currency partnerships</span>
                    </div>

                    <ul className="mt-4">
                      {foreignAccounts.map((account) => (
                        <li
                          key={account.code}
                          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-slate-200 py-6 last:border-b-0 last:pb-0 dark:border-white/10"
                        >
                          <div>
                            <p className={labelClass}>
                              {account.code} · {account.currency}
                            </p>
                            <p className="font-brand-serif mt-2 text-3xl tracking-wide text-[#1c2333] dark:text-white sm:text-4xl">
                              {account.number}
                            </p>
                            <p className="font-brand-sans mt-1 text-[13px] text-slate-500 dark:text-slate-400 sm:text-sm">
                              {BANK} · {ACCOUNT_NAME}
                            </p>
                          </div>

                          <CopyButton value={account.number} label={account.currency} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Flyer image */}
              <Reveal delay={300}>
                <img
                  className="mx-auto block h-auto max-h-[28rem] w-auto max-w-full rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 sm:max-h-[34rem] lg:max-h-[40rem]"
                  src={FLYER}
                  alt="Financial Partnership flyer with the KPAN Ministries bank account details"
                  loading="lazy"
                />

                <div className="mt-6 text-center">
                  <a
                    href={FLYER}
                    download
                    className="font-brand-sans inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base"
                  >
                    Download the flyer
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section className="pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="border-t border-slate-200 pt-12 dark:border-white/10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left">
                <p className="font-brand-serif flex items-center gap-4 text-5xl italic text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-6xl">
                  Shalom!
                  <Heart className="h-8 w-8 fill-[#ff6a00] text-[#ff6a00] sm:h-10 sm:w-10" />
                </p>
              </Reveal>

              <Reveal delay={150}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Be intentional to participate in all our routine corporate meetings for the weeks, as
                  it promises to be an impactful time of fellowship together.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Link
                    to="/"
                    className="font-brand-sans inline-flex w-fit items-center gap-2 rounded-full bg-[#0f172a] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#ff6a00] dark:bg-[#ff6a00] dark:hover:bg-white dark:hover:text-[#0f172a]"
                  >
                    See our meetings
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/location"
                    className="font-brand-sans inline-flex items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base"
                  >
                    Plan your visit
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Give