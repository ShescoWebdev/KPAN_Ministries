import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Copy, CreditCard, Heart } from 'lucide-react'
import Reveal from '../components/common/Reveal'

// Bank Details
const BANK = 'FirstBank Nigeria'
const ACCOUNT_NAME = 'KPAN MINISTRIES'

const nairaAccount = { currency: 'Naira', code: 'NGN', number: '2046550602' }

// Foreign currency accounts
const foreignAccounts = [
  { currency: 'US Dollar', code: 'USD', number: '2046793339' },
  { currency: 'British Pound', code: 'GBP', number: '2046793580' },
  { currency: 'Euro', code: 'EUR', number: '2046793889' },
]

// Shared label style
const labelClass =
  'font-brand-sans text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 sm:text-xs'

// Shared link and button style
const cardLinkClass =
  'font-brand-sans mt-8 inline-flex cursor-pointer items-center gap-2 border-b border-slate-400 pb-1 text-[15px] text-[#1c2333] transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00] dark:border-slate-500 dark:text-white sm:text-base'

// Faint word sizes
const INITIALS_SIZE = 'text-[length:clamp(8rem,28vw,24rem)]'
const NAME_SIZE = 'text-[length:15vw] md:text-[length:clamp(4rem,9.5vw,10rem)]'

// Italic heading word
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

// Copy to clipboard hook
function useCopy() {
  const [copied, setCopied] = useState(null)

  const copy = async (number) => {
    try {
      await navigator.clipboard.writeText(number)
    } catch {
      const field = document.createElement('textarea')
      field.value = number
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }
    setCopied(number)
    setTimeout(() => setCopied((current) => (current === number ? null : current)), 2000)
  }

  return { copied, copy }
}

// One bank account card
function AccountCard({ account, featured = false, copied, onCopy }) {
  const isCopied = copied === account.number

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#05070f] sm:p-10">
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-[#ff6a00]" />
        <span className={labelClass}>
          {account.currency} · {account.code}
        </span>
      </div>

      <p className={`${labelClass} mt-8`}>Account number</p>
      <p
        className={`font-brand-serif mt-3 tracking-wide text-[#1c2333] dark:text-white ${
          featured ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'
        }`}
      >
        {account.number}
      </p>

      <div className="my-8 border-t border-slate-200 dark:border-white/10" />

      <dl className="font-brand-sans space-y-4 text-[15px] sm:text-base">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <dt className={labelClass}>Bank</dt>
          <dd className="text-slate-600 dark:text-slate-300">{BANK}</dd>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <dt className={labelClass}>Account name</dt>
          <dd className="font-semibold text-[#1c2333] dark:text-white">{ACCOUNT_NAME}</dd>
        </div>
      </dl>

      <button type="button" onClick={() => onCopy(account.number)} className={cardLinkClass}>
        <span aria-live="polite">{isCopied ? 'Copied' : 'Copy account number'}</span>
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

function Give() {
  const { copied, copy } = useCopy()

  return (
    <div className="bg-[#F8F7F5] transition-colors duration-500 dark:bg-[#101828]">
      {/* Heading */}
      <section className="relative overflow-hidden pt-32 md:pt-44">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="Give" size={INITIALS_SIZE} />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>Give</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h1 className="font-brand-serif text-5xl leading-[1.02] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-6xl xl:text-7xl">
                  Financial <Accent>Partnership</Accent>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Givings, tithes, offerings, partnerships and seeds, sown with hunger, honour and
                  expectation.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                  <span className={`${labelClass} text-center`}>Givings · Tithes · Offerings</span>
                  <span className="h-px min-w-6 flex-1 bg-slate-300 dark:bg-white/15" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Message, Naira account and flyer */}
      <section className="pt-16 md:pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal origin="origin-left">
                <p className={`${labelClass} flex items-center gap-3`}>
                  <CreditCard className="h-4 w-4 shrink-0 text-[#ff6a00]" />
                  For your givings, offerings, partnerships &amp; seeds
                </p>

                <h2 className="font-brand-serif mt-5 text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl">
                  Stay conscious of the <Accent>new season</Accent>!
                </h2>

                <p className="font-brand-sans mt-6 max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Thank you for joining our meetings with hunger, honour, and expectation. We pray that
                  all the Lord has worked for you will be sustained and increased.
                </p>

                <p className="font-brand-sans mt-6 text-base font-semibold text-[#1c2333] dark:text-white sm:text-lg">
                  Kindly send to:
                </p>
              </Reveal>

              <Reveal delay={150} className="mt-6">
                <AccountCard account={nairaAccount} featured copied={copied} onCopy={copy} />
                <p className="font-brand-sans mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Please confirm the account name reads {ACCOUNT_NAME} before you send.
                </p>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <img
                className="mx-auto block h-auto max-h-[30rem] w-auto max-w-full rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 sm:max-h-[36rem] lg:max-h-[42rem]"
                src="/Give.jpeg"
                alt="Financial partnership flyer with KPAN Ministries account details"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Foreign currency accounts */}
      <section className="relative overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Faint text="Abroad" size={NAME_SIZE} italic />

          <div className="relative">
            <Reveal origin="origin-left">
              <Eyebrow>Foreign currency</Eyebrow>
            </Reveal>

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
              <Reveal origin="origin-left" delay={100}>
                <h2 className="font-brand-serif text-4xl leading-[1.05] tracking-tight text-[#1c2333] transition-colors duration-500 dark:text-white sm:text-5xl lg:text-6xl">
                  Partnering from <Accent>abroad</Accent>?
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  For foreign currency partnerships, please use the account details below, the same as
                  those on the flyer.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foreignAccounts.map((account, i) => (
                <Reveal key={account.code} delay={150 + i * 150}>
                  <AccountCard account={account} copied={copied} onCopy={copy} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing word */}
      <section className="pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="border-t border-slate-200 pt-12 dark:border-white/10 md:pt-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal origin="origin-left">
                <blockquote>
                  <p className="font-brand-serif text-3xl italic leading-snug text-[#1c2333] dark:text-white sm:text-4xl">
                    “Every man according as he purposeth in his heart, so let him give; not grudgingly,
                    or of necessity: for God loveth a cheerful <Accent>giver</Accent>.”
                  </p>
                  <footer className={`${labelClass} mt-6`}>2 Corinthians 9:7</footer>
                </blockquote>
              </Reveal>

              <Reveal delay={200}>
                <p className="font-brand-sans max-w-xl text-base leading-relaxed text-slate-600 transition-colors duration-500 dark:text-slate-300 sm:text-lg">
                  Be intentional to participate in all our routine corporate meetings for the weeks, as
                  it promises to be an impactful time of fellowship together.
                </p>

                <p className="font-brand-serif mt-8 flex items-center gap-3 text-4xl italic text-[#1c2333] dark:text-white">
                  Shalom!
                  <Heart className="h-7 w-7 fill-[#ff6a00] text-[#ff6a00]" />
                </p>

                <Link to="/" className={cardLinkClass}>
                  See our weekly meetings
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Give