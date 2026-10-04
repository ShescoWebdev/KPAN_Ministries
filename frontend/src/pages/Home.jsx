import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Hero videos
const heroVideos = [
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791106535/Vid_3_ghwa5c.mp4',
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791106534/Vid_4_shgqrz.mp4',
  'https://res.cloudinary.com/detg3ravj/video/upload/v1791106529/Vid_5_fdzbu3.mp4',
]

function Home() {
  const [current, setCurrent] = useState(0)
  const videoRefs = useRef([])
  const total = heroVideos.length

  const goTo = (index) => {
    if (!total) return
    setCurrent((index + total) % total)
  }

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
    <div>
      <section
        aria-label="Hero"
        className="relative mt-[5.5rem] h-[calc(100svh-5.5rem)] min-h-[26rem] w-full overflow-hidden bg-black"
      >
        {/* Video carousel */}
        {heroVideos.map((src, i) => (
          <video
            key={`${src}-${i}`}
            ref={(el) => {
              videoRefs.current[i] = el
            }}
            src={src}
            muted
            playsInline
            loop={total === 1}
            preload={i === current || i === (current + 1) % total ? 'auto' : 'metadata'}
            onEnded={() => goTo(current + 1)}
            onError={() => {
              if (i === current && total > 1) goTo(current + 1)
            }}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Dim overlay for text visibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero text */}
        <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-2 px-4">
          <h1 className="hero-h1 text-center font-bold tracking-tight text-white drop-shadow-lg text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-5xl">
            K-PAN Ministries
          </h1>

          <p className="hero-p text-center text-white/80 drop-shadow-md text-lg sm:text-xl md:text-2xl">
            The Fullness Church
          </p>

        <div>
          <img
            className="
            h-14
            sm:h-16
            md:h-20
            lg:h-20
            xl:h-20
            w-auto"
            src="/kpan logo white.png"
            alt="Church Logo"
                />
        </div>
        </div>

        {/* Prev / next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous video"
              className="absolute left-4 top-1/2 z-[2] hidden -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white transition-colors duration-300 hover:bg-black/50 md:block"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next video"
              className="absolute right-4 top-1/2 z-[2] hidden -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white transition-colors duration-300 hover:bg-black/50 md:block"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-3">
            {heroVideos.map((src, i) => (
              <button
                key={`${src}-dot-${i}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show video ${i + 1}`}
                aria-current={i === current}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
                  i === current ? 'w-8 bg-[#ad8968]' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </section>



      <section className="mt-20 md:mt-32 px-4 text-center">
        <h2 className="text-3xl sm:text-[22px] md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#898989]">The Fullness Church is a church that believes in Jesus, a  <br className='hidden md:block' /> church that loves God and people.</h2>
        <p className="mt-4 text-xl sm:text-[15px] md:text-4xl lg:text-lg xl:text-lg text-[#848484]">
          Overwhelmed by the gift of salvation we have found in Jesus, we have a heart for authentic worship, <br className='hidden md:block' /> are passionate about the local church, and are on mission to see God’s kingdom established across <br className='hidden md:block' /> the earth.
        </p>

        <h1 className="home-h1 mt-20 ml-10 text-sm md:text-base font-bold text-[#2563EE]">
          Get involved in our daily meetings
        </h1 >
      </section>


      <section className="mt-8 md:mt-16 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-20 md:gap-8 lg:gap-16 items-center">
  {/* Text comes first in the code, so it always sits above the image on mobile */}
  <div className="w-full min-w-0 md:flex-1">
    <h2 className="home-h2 text-sm md:text-base font-bold text-[#898989] text-center md:text-start ">
      Equipping Meeting
    </h2>

    <p className="home-p mt-2 text-sm md:text-base text-[#848484] text-center md:text-start">
      Join us for our equipping meetings where we provide practical teachings and resources to help you grow in your faith and live out your calling.
    </p>
  </div>

  <div className="w-full min-w-0 md:flex-1">
    <img
      className="
      mx-auto
      w-full
      max-w-md
      md:max-w-none
      aspect-[4/3]
      object-cover
      rounded-lg
      shadow-md"
      src="/Equipping Meeting.jpeg"
      alt="Equipping Meeting"
      loading="lazy"
    />
  </div>
</section>
    </div>
  )
}

export default Home



