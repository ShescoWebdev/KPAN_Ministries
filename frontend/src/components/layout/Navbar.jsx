import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AlignRight, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Ministries', path: '/ministries' },
  { name: 'Media', path: '/media' },
  { name: 'Give', path: '/give' },
  { name: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div>
      <nav ref={navRef} className="fixed w-full z-10 top-0 lg:p-3 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="shrink-0">
              <div className="flex items-center space-x-[-1.2rem] md:space-x-[-3rem]">
                <img
                  className="
                    h-14
                    sm:h-16
                    md:h-20
                    lg:h-24
                    xl:h-20
                    w-auto"
                  src="/kpan logo black.png"
                  alt="Church Logo"
                />

              </div>
            </NavLink>

            {/* Desktop view */}
            <div className="nav-links hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
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
              ))}
            </div>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="lg:hidden ml-auto relative w-8 h-8 flex-shrink-0 cursor-pointer"
            >
              <AlignRight
                className={`absolute inset-[-0.3rem] w-6 h-10 text-black transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-10 text-black transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />

              
            </button>
          </div>

          {/* Mobile view */}
          {isOpen && (
            <div className="bg-white nav-links lg:hidden flex flex-col space-y-2 pb-4 border-t border-gray-300 pt-4
            transition-all duration-500 ease-in-out">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-1 text-lg font-medium border-b-2 w-fit ${
                      isActive
                        ? 'border-[#ad8968] text-[#ad8968]'
                        : 'border-transparent text-black hover:border-[#ad8968] hover:text-[#ad8968]'
                    }`
                    
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-2">
                {/* <Button /> */}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
