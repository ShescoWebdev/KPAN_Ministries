import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react'
import useTheme from '../../hooks/useTheme'


// Navigation links data structure
const navLinks = [

    { name: 'Home', path: '/' },
    
  { 
    name: 'About',
    children: [
      { name: 'Who We Are', path: '/about/who-we-are' },
      { name: 'Leadership', path: '/about/leadership' },
    ],
  },
  {
    name: 'Ministries',
    children: [
      { name: 'The Fullness Church', path: '/ministries/the-fullness-church' },
      { name: 'KSOM', path: '/ministries/ksom' },
      { name: 'TFC', path: '/ministries/tfc' },
    ],
  },
  { name: 'Media', path: '/media' },
  { name: 'Give', path: '/give' },
    
  {
    name: 'Get Involved',
    children: [
      { name: 'WOF', path: '/get-involved/wof' },
      { name: 'MOF', path: '/get-involved/mof' },
      { name: 'KPAN Community', path: '/get-involved/kpan-community' },
      { name: 'Blogs', path: '/get-involved/blogs' },
    ],
  },
  { name: 'Events', path: '/events' },
  {
    name: 'Location',
    children: [
      {
        name: 'Benin City, Nigeria',
        href: 'https://www.google.com/maps/search/?api=1&query=Benin+City,+Nigeria',
      },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
]

const ctaLink = { name: 'Online Church', path: '/online-church' }

const hasActiveChild = (items, pathname) =>
  items.some(
    (item) =>
      (item.path && (pathname === item.path || pathname.startsWith(`${item.path}/`))) ||
      (item.children && hasActiveChild(item.children, pathname))
  )

// Class builders
const desktopLinkBase =
  'font-brand-sans text-[11px] 2xl:text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-300'

const desktopDropdownLinkClass = (isActive) =>
  `group font-brand-serif flex items-center justify-between px-7 py-5 text-[1.35rem] italic transition-colors duration-300 hover:bg-[#ad8968]/5 ${
    isActive ? 'text-[#ad8968]' : 'text-slate-500 hover:text-[#ad8968] dark:text-slate-300'
  }`

const mobileRowClass = (isActive) =>
  `font-brand-serif flex w-full items-center justify-between py-5 text-left text-3xl italic sm:text-4xl ${
    isActive ? 'text-[#ad8968]' : 'text-[#1c2333] dark:text-white'
  }`

const mobileChildClass = (isActive) =>
  `font-brand-sans flex items-baseline gap-4 py-3 text-base font-medium sm:text-lg ${
    isActive ? 'text-[#ad8968]' : 'text-[#1c2333] hover:text-[#ad8968] dark:text-slate-200'
  }`

// Renders an internal router link or an external link with the same styling
function MenuLink({ item, getClassName, onClick, onMouseEnter, children }) {
  const content = children ?? item.name

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={getClassName(false)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {content}
      </a>
    )
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      className={({ isActive }) => getClassName(isActive)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {content}
    </NavLink>
  )
}

    // To prevent the dropdown from being cut off on the right side of the screen
    const DROPDOWN_WIDTH = 352


export default function Navbar({ hasHero = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const [openGroup, setOpenGroup] = useState(null)
  const navRef = useRef(null)
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  // Desktop dropdown state
  const [desktopMenu, setDesktopMenu] = useState({ name: null, align: 'left', open: false })

  // Transparent over the hero at the top
  const solid = scrolled || isOpen || !hasHero
  const textTone = solid ? 'text-[#1c2333] dark:text-white' : 'text-white'
  const logoSize = solid ? 'h-4 sm:h-6' : 'h-6 sm:h-8 xl:h-10'

  const closeDesktop = () => setDesktopMenu((prev) => ({ ...prev, open: false }))

  const openDesktop = (name, el) => {
    const { left } = el.getBoundingClientRect()
    const align = left - 24 + DROPDOWN_WIDTH > window.innerWidth - 16 ? 'right' : 'left'
    setDesktopMenu({ name, align, open: true })
  }

  const toggleGroup = (name) => setOpenGroup((prev) => (prev === name ? null : name))

  const closeMobile = () => setIsOpen(false)

  // To switch the navbar from transparent to solid
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false)
        setDesktopMenu((prev) => ({ ...prev, open: false }))
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setDesktopMenu((prev) => ({ ...prev, open: false }))
      }
    }
    if (isOpen || desktopMenu.open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, desktopMenu.open])

  // To reset the mobile menu when it's closed
  useEffect(() => {
    if (isOpen) return
    const timer = setTimeout(() => setOpenGroup(null), 500)
    return () => clearTimeout(timer)
  }, [isOpen])

  // To stop the page under, from scrolling while the mobile menu is open
  useEffect(() => {
    if (!isOpen) return
    const html = document.documentElement
    const body = document.body
    const previousHtmlOverflow = html.style.overflow
    const previousBodyOverflow = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = previousHtmlOverflow
      body.style.overflow = previousBodyOverflow
    }
  }, [isOpen])

  // To close the mobile menu if the screen grows to desktop size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)')
    const handleChange = (e) => {
      if (e.matches) setIsOpen(false)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div ref={navRef}>
      <nav
        onMouseLeave={closeDesktop}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,backdrop-filter] duration-500 ease-in-out ${
          solid
            ? 'bg-white/90 py-3 shadow-sm backdrop-blur-md dark:bg-[#0b0f1a]/95'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:px-10">
          <NavLink to="/" onClick={closeMobile} className="shrink-0 justify-self-start">
            <img
              className={`${logoSize} w-auto transition-[height] duration-500 ${
                solid ? 'hidden dark:block' : 'block'
              }`}
              src="/kpan logo white.png"
              alt="Church Logo"
            />
            <img
              className={`${logoSize} w-auto transition-[height] duration-500 ${
                solid ? 'block dark:hidden' : 'hidden'
              }`}
              src="/kpan logo black.png"
              alt="Church Logo"
            />
          </NavLink>

          {/* Desktop view */}
          <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map((link) => {
              if (!link.children) {
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onMouseEnter={closeDesktop}
                    className={({ isActive }) =>
                      `${desktopLinkBase} ${
                        isActive ? 'text-[#ad8968]' : `${textTone} hover:text-[#ad8968]`
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              }

              const isGroupOpen = desktopMenu.open && desktopMenu.name === link.name

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={(e) => openDesktop(link.name, e.currentTarget)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isGroupOpen}
                    onClick={(e) => openDesktop(link.name, e.currentTarget.parentElement)}
                    className={`${desktopLinkBase} inline-flex cursor-pointer items-center gap-1.5 ${
                      isGroupOpen || hasActiveChild(link.children, pathname)
                        ? 'text-[#ad8968]'
                        : `${textTone} hover:text-[#ad8968]`
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isGroupOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Desktop dropdown panel */}
                  <div
                    style={{ width: DROPDOWN_WIDTH }}
                    className={`absolute top-full z-10 pt-4 transition-[opacity,visibility,transform,translate] duration-300 ease-out ${
                      desktopMenu.align === 'right' ? '-right-6' : '-left-6'
                    } ${
                      isGroupOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-2 opacity-0'
                    }`}
                  >
                    <ul className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-black/25 dark:border-white/10 dark:bg-[#0b0f1a]">
                      {link.children.map((item) => (
                        <li
                          key={item.name}
                          className="border-b border-black/10 last:border-b-0 dark:border-white/10"
                        >
                          <MenuLink
                            item={item}
                            getClassName={desktopDropdownLinkClass}
                            onClick={closeDesktop}
                          >
                            <span>{item.name}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </MenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-2 justify-self-end sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full transition-colors duration-300 dark:text-yellow-300 dark:hover:bg-white/10 ${
                solid ? 'text-[#1c2333] hover:bg-black/5' : 'text-white hover:bg-white/15'
              }`}
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
            </button>

            <NavLink
              to={ctaLink.path}
              className={`font-brand-sans hidden items-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 xl:inline-flex 2xl:text-xs ${
                solid
                  ? 'bg-[#0f172a] text-white hover:bg-[#ad8968] dark:bg-[#ad8968] dark:hover:bg-white dark:hover:text-[#0f172a]'
                  : 'bg-white text-[#1c2333] hover:bg-[#ad8968] hover:text-white'
              }`}
            >
              {ctaLink.name}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </NavLink>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition-colors duration-300 xl:hidden ${
                solid
                  ? 'border-black/15 text-[#1c2333] dark:border-white/20 dark:text-white'
                  : 'border-white/40 text-white'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile view */}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] flex flex-col bg-white text-[#1c2333] transition-[opacity,visibility,transform,translate] duration-500 ease-in-out dark:bg-[#05070f] dark:text-white xl:hidden ${
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between bg-slate-100/70 px-5 py-4 dark:bg-white/5 sm:px-8">
          <NavLink to="/" onClick={closeMobile} className="shrink-0">
            <img
              className="block h-12 w-auto sm:h-14 dark:hidden"
              src="/kpan logo black.png"
              alt="Church Logo"
            />
            <img
              className="hidden h-12 w-auto sm:h-14 dark:block"
              src="/kpan logo white.png"
              alt="Church Logo"
            />
          </NavLink>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-[#1c2333] transition-colors duration-300 dark:bg-[#3fc1c0] dark:text-yellow-300"
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
            </button>

            <button
              type="button"
              onClick={closeMobile}
              aria-label="Close menu"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-black/15 text-[#1c2333] dark:border-white/20 dark:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* To make mobile menu scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-8 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[#ad8968]" />
            <span className="font-brand-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#ad8968]">
              Wayfinding
            </span>
          </div>

          <ul className="mt-6 divide-y divide-black/10 border-b border-black/10 dark:divide-white/10 dark:border-white/10">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.name}>
                  <button
                    type="button"
                    aria-expanded={openGroup === link.name}
                    onClick={() => toggleGroup(link.name)}
                    className={`${mobileRowClass(hasActiveChild(link.children, pathname))} cursor-pointer`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-500 ${
                        openGroup === link.name ? 'rotate-180 text-[#ad8968]' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-in-out ${
                      openGroup === link.name
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'invisible grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mb-6 ml-1 border-l-2 border-[#ad8968]/70 pl-5">
                        {link.children.map((child, index) => (
                          <li key={child.name}>
                            <MenuLink
                              item={child}
                              getClassName={mobileChildClass}
                              onClick={closeMobile}
                            >
                              <span className="text-xs tracking-widest text-slate-400">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span>{child.name}</span>
                            </MenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.path}>
                  <MenuLink item={link} getClassName={mobileRowClass} onClick={closeMobile}>
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400" />
                  </MenuLink>
                </li>
              )
            )}
          </ul>

          <div className="pt-8">
            {/* <Button /> */}
            <NavLink
              to={ctaLink.path}
              onClick={closeMobile}
              className="font-brand-sans flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#ad8968] dark:bg-[#ad8968] dark:hover:bg-white dark:hover:text-[#0f172a]"
            >
              {ctaLink.name}
              <ArrowUpRight className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}