import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AlignRight, X, ChevronRight, ChevronLeft } from 'lucide-react'


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
  { name: 'Online Church', path: '/online-church' },
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

// Checks if the current path matches the item or any of its children
const hasActiveChild = (items, pathname) =>
  items.some(
    (item) =>
      (item.path && (pathname === item.path || pathname.startsWith(`${item.path}/`))) ||
      (item.children && hasActiveChild(item.children, pathname))
  )

// Class builders
const mobileLinkClass = (isActive) =>
  `block px-2 py-1 text-sm sm:text-base md:text-lg lg:text-xl font-medium w-full ${
    isActive
      ? 'border-[#ad8968] text-[#ad8968]'
      : 'border-transparent text-black hover:border-[#ad8968] hover:text-[#ad8968]'
  }`

const desktopDropdownLinkClass = (isActive) =>
  `block py-2.5 text-base xl:text-lg whitespace-nowrap ${
    isActive ? 'text-[#ad8968]' : 'text-black hover:text-[#ad8968]'
  }`

// Renders an internal router link or an external link with the same styling
function MenuLink({ item, getClassName, onClick, onMouseEnter }) {
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
        {item.name}
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
      {item.name}
    </NavLink>
  )
}

    // To prevent the dropdown from being cut off on the right side of the screen
    const DROPDOWN_WIDTH = 288


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const { pathname } = useLocation()

  // Desktop dropdown state, which group, where to align, and whether it's showing
  const [desktopMenu, setDesktopMenu] = useState({ name: null, left: 0, open: false })
  const [desktopSub, setDesktopSub] = useState(null)

  // Mobile dropdown state
  const [path, setPath] = useState([])
  const [depth, setDepth] = useState(0)
  const [menuHeight, setMenuHeight] = useState('auto')
  const panelRefs = useRef([])

  const closeDesktop = () => setDesktopMenu((prev) => ({ ...prev, open: false }))

  const openDesktop = (name, el) => {
  const buttonLeft = el.getBoundingClientRect().left
  const maxLeft = window.innerWidth - DROPDOWN_WIDTH
  setDesktopMenu({ name, left: Math.max(16, Math.min(buttonLeft, maxLeft)), open: true })
  setDesktopSub(null)
}

  const openSubmenu = (item) => {
    setPath((prev) => [...prev.slice(0, depth), item])
    setDepth((d) => d + 1)
  }

  const goBack = () => setDepth((d) => Math.max(0, d - 1))

  const handleTrackTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    setPath((prev) => prev.slice(0, depth))
  }

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
    const timer = setTimeout(() => {
      setDepth(0)
      setPath([])
    }, 500)
    return () => clearTimeout(timer)
  }, [isOpen])

  //To Keep the mobile menu's height matched to the panel currently in view
  useEffect(() => {
    const el = panelRefs.current[depth]
    if (!el) return
    const measure = () => setMenuHeight(el.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [depth, path])

  const activeGroup = navLinks.find((link) => link.name === desktopMenu.name)
  const activeSub = activeGroup?.children?.find(
    (item) => item.children && item.name === desktopSub
  )

  const panelClass = (index) =>
    `nav-links w-full shrink-0 flex flex-col space-y-2 pb-4 pt-4 transition-[visibility] duration-500 ${
      index === depth ? '' : 'invisible'
    }`

  const renderMobileItems = (items) =>
    items.map((item) =>
      item.children ? (
        <button
          key={item.name}
          type="button"
          onClick={() => openSubmenu(item)}
          className={`flex w-full items-center bg-gray-100 rounded justify-between px-2 py-1 text-sm sm:text-base md:text-lg 
            lg:text-xl 
            font-medium border-b-2 
            border-transparent cursor-pointer ${
            hasActiveChild(item.children, pathname)
              ? 'text-[#ad8968]'
              : 'text-black hover:text-[#ad8968]'
          }`}
        >
          <span>{item.name}</span>
          <ChevronRight className="w-5 h-5 flex-shrink-0" />
        </button>
      ) : (
        <MenuLink
          key={item.name}
          item={item}
          getClassName={mobileLinkClass}
          onClick={() => setIsOpen(false)}
        />
      )
    )

  return (
    <div>
        <div>
            
        </div>
      <nav
        ref={navRef}
        onMouseLeave={closeDesktop}
        className={`bg-white fixed w-full z-10 p-2 pb-0 md:p-3 md:pb-3 top-0 lg:p-3 shadow-md transition-colors duration-500 lg:duration-300 ease-in-out ${
          isOpen ? 'bg-white lg:bg-transparent' : desktopMenu.open ? 'lg:bg-white' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="shrink-0">
              <div className="flex items-center space-x-[-1.2rem] md:space-x-[-3rem]">
                <img
                  className="
                    h-14
                    sm:h-16
                    md:h-20
                    lg:h-20
                    xl:h-20
                    w-auto"
                  src="/kpan logo black.png"
                  alt="Church Logo"
                />

              </div>
            </NavLink>

            {/* Desktop view */}
            <div className="nav-links hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8">
              {navLinks.map((link) =>
                link.children ? (
                  <button
                    key={link.name}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={desktopMenu.open && desktopMenu.name === link.name}
                    onMouseEnter={(e) => openDesktop(link.name, e.currentTarget)}
                    onClick={(e) => openDesktop(link.name, e.currentTarget)}
                    className={`inline-flex items-center px-1 pt-1 text-base xl:text-lg font-medium border-b-2 whitespace-nowrap cursor-pointer ${
                      (desktopMenu.open && desktopMenu.name === link.name) ||
                      hasActiveChild(link.children, pathname)
                        ? 'border-[#ad8968] text-[#ad8968]'
                        : 'border-transparent text-black'
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onMouseEnter={closeDesktop}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 text-base xl:text-lg font-medium border-b-2 whitespace-nowrap ${
                        isActive
                          ? 'border-[#ad8968] text-[#ad8968]'
                          : 'border-transparent text-black hover:border-[#ad8968] hover:text-[#ad8968]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </div>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="lg:hidden ml-auto flex items-center gap-2 sm:gap-2 flex-shrink-0 cursor-pointer"
            >
              <h1 className="menu text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
                Menu
              </h1>
              <div className="relative w-8 h-3 flex-shrink-0">
                <AlignRight
                  className={`absolute inset-[-0.3rem] w-5 h-5 text-black transition-all duration-500 ease-in-out ${
                    isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`absolute inset-[-0.2rem] w-5 h-5 text-black transition-all duration-500 ease-in-out ${
                    isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
                    
          {/* Mobile view */}
          <div
            className={`lg:hidden grid bg-amber-300/5 transition-all duration-500 ease-in-out pt-2 ${
              isOpen 
                ? 'grid-rows-[1fr] opacity-100 visible'
                : 'grid-rows-[0fr] opacity-0 invisible'
            }`}
          >
            <div className="overflow-hidden">
              <div className="bg-white border-t border-gray-300">
                <div 
                  className="overflow-hidden transition-[height] duration-500 ease-in-out"
                  style={{ height: menuHeight }}
                >
                  <div
                    className="flex items-start transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${depth * 100}%)` }}
                    onTransitionEnd={handleTrackTransitionEnd}
                  >
                    {/* Main menu panel */}
                    <div
                      ref={(el) => {
                        panelRefs.current[0] = el
                      }}
                      className={panelClass(0)}
                    >
                      {renderMobileItems(navLinks)}
                      <div className="pt-2">
                        {/* <Button /> */}
                      </div>
                    </div>

                    {/* Sub-menu panels */}
                    {path.map((group, i) => (
                      <div
                        key={`${group.name}-${i}`}
                        ref={(el) => {
                          panelRefs.current[i + 1] = el
                        }}
                        className={panelClass(i + 1)}
                      >
                        <button
                          type="button"
                          onClick={goBack}
                          aria-label={`Back to ${i === 0 ? 'main menu' : path[i - 1].name}`}
                          className="flex w-full items-center rounded-t-2xl bg-gray-100 gap-3 px-2 py-1 text-sm sm:text-base md:text-lg lg:text-xl
                           font-normal 
                          text-black hover:font-bold hover:transition-all hover:duration-500 cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                          <span>{group.name}</span>
                        </button>
                        {renderMobileItems(group.children)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop dropdown panel */}
        <div
          className={`hidden lg:block absolute left-0 top-full w-full bg-[#f2f2f2] shadow-md transition-all duration-300 ease-in-out ${
            desktopMenu.open
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-2 invisible pointer-events-none'
          }`}
        >
          <div
            className="nav-links flex items-start py-8"
            style={{ paddingLeft: desktopMenu.left }}
          >
            {/* First column */}
            <ul className="min-w-[16rem] pr-12">
              {activeGroup?.children?.map((item) => (
                <li key={item.name}>
                  {item.children ? (
                    <button
                      type="button"
                      onMouseEnter={() => setDesktopSub(item.name)}
                      onClick={() => setDesktopSub(item.name)}
                      className={`flex w-full items-center justify-between gap-8 py-2.5 text-base xl:text-lg whitespace-nowrap cursor-pointer ${
                        desktopSub === item.name
                          ? 'text-[#ad8968]'
                          : 'text-black hover:text-[#ad8968]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-5 h-5 flex-shrink-0" />
                    </button>
                  ) : (
                    <MenuLink
                      item={item}
                      getClassName={desktopDropdownLinkClass}
                      onMouseEnter={() => setDesktopSub(null)}
                      onClick={closeDesktop}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Second column */}
            {activeSub && (
              <ul className="min-w-[16rem] border-l border-gray-300 pl-12">
                {activeSub.children.map((item) => (
                  <li key={item.name}>
                    <MenuLink
                      item={item}
                      getClassName={desktopDropdownLinkClass}
                      onClick={closeDesktop}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
