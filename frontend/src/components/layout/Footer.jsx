import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import Reveal from '../common/Reveal'

const YEAR = new Date().getFullYear()

// Contact information and address
const contact = { phone: '+234 000 000 0000', email: 'info@example.com' }

const address = [
  'NAAT Multi-Purpose Hall',
  'Behind June 12 FACOOP Supermarket',
  'UNIBEN, Benin City, Nigeria',
]

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.join(', '))}`

const services = [
  { day: 'Sunday', name: 'Equipping Meeting', time: '2:00 PM' },
  { day: 'Monday', name: 'Cell Meeting', time: '5:00 PM' },
  { day: 'Thursday', name: 'Bible Study Meeting', time: '4:00 PM' },
  { day: 'Saturday', name: 'SOPS', time: '4:00 PM' },
]

const menuLinks = [
  { name: 'Contact us', path: '/contact' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Sermons', path: '/media' },
]

// Social media links with icons
const socialLinks = [
  { name: 'Instagram', href: '', icon: FaInstagram },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@apstjoshuaokorie_kpan?si=MFTECfFDLTPz961h',
    icon: FaYoutube,
  },
  { name: 'Facebook', href: '', icon: FaFacebookF },
  { name: 'X', href: '', icon: FaXTwitter },
  { name: 'TikTok', href: '', icon: FaTiktok },
]

const linkClass =
  'font-brand-sans text-[15px] text-white/75 transition-colors duration-300 hover:text-[#ff6a00]'

const socialCircle =
  'grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors duration-300'

// Orange line and label
function ColumnTitle({ children }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-8 bg-[#ff6a00]" />
      <h3 className="font-brand-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff6a00]">
        {children}
      </h3>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0f1a] text-white transition-colors duration-500 dark:bg-[#05070f]">
      {/* Faint backdrop name */}
      <span
        aria-hidden="true"
        className="font-brand-serif pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] select-none whitespace-nowrap text-[length:clamp(8rem,28vw,28rem)] italic leading-none text-white/[0.04]"
      >
        K-PAN
      </span>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-16 sm:px-8 md:pt-24 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
          {/* Brand */}
          <Reveal origin="origin-left">
            <img src="/kpan logo white.png" alt="KPAN Logo" className="h-8 w-auto" />
            <p className="font-brand-serif mt-6 text-3xl italic text-white">One city, one family.</p>
            <p className="font-brand-sans mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/60 sm:text-xs">
              Touched · Transformed · Empowered
            </p>
          </Reveal>

          {/* Address */}
          <Reveal origin="origin-left" delay={100}>
            <ColumnTitle>Visit us</ColumnTitle>
            <address className="font-brand-sans mt-6 flex gap-3 text-[15px] not-italic leading-relaxed text-white/80">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ff6a00]" />
              <span>
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-brand-sans mt-6 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[15px] text-white transition-colors duration-300 hover:border-[#ff6a00] hover:text-[#ff6a00]"
            >
              Get directions
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          {/* Services */}
          <Reveal origin="origin-left" delay={200}>
            <ColumnTitle>Services &amp; times</ColumnTitle>
            <ul className="mt-6">
              {services.map((service) => (
                <li
                  key={service.name}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 first:pt-0"
                >
                  <div>
                    <p className="font-brand-sans text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
                      {service.day}
                    </p>
                    <p className="font-brand-sans mt-1 text-[15px] text-white/85">{service.name}</p>
                  </div>
                  <p className="font-brand-serif shrink-0 text-xl text-white">{service.time}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Menu and socials */}
          <Reveal origin="origin-left" delay={300}>
            <ColumnTitle>Connect</ColumnTitle>
            <ul className="mt-6 space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className={`${linkClass} inline-flex items-center gap-3`}
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#ff6a00]" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className={`${linkClass} inline-flex items-center gap-3 break-all`}
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#ff6a00]" />
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) =>
                href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`${socialCircle} opacity-40 hover:border-[#ff6a00] hover:bg-[#ff6a00] hover:text-white cursor-pointer`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={name}
                    role="img"
                    aria-label={`${name} link coming soon`}
                    title="Link coming soon"
                    className={`${socialCircle} opacity-40 cursor-pointer hover:border-[#ff6a00] hover:bg-[#ff6a00] hover:text-white`}
                  >
                    <Icon className="h-4 w-4 cursor-pointer" />
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>

        {/* Copyright bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-brand-sans text-xs leading-relaxed tracking-wide text-white/60">
            © {YEAR} K-PAN Ministries (Kingdom Priesthood and Apostolic Network). All rights reserved.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-brand-sans group inline-flex w-fit cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-[#ff6a00]"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}