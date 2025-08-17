import PokeBallSVG from '@/assets/img/pokeball_bnw.svg'
import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const MainLayout = ({ children }: { children: any }) => {
  const contentRef = useRef(null)
  const navbar = useSelector((state) => state.config.navbar)
  const backgroundColour = useSelector((state) => state.config.backgroundColour)

  // Prevent scrollbar flashing during page transitions
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && document) {
      document.body.style.overflowY = 'auto'
      document.documentElement.style.overflowY = 'auto'
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div
      className={`grid w-full grid-flow-row grid-cols-1 ${backgroundColour} min-h-screen font-roboto text-sm text-gray-800 antialiased transition-background duration-500 ease-in-out`}
      style={{
        gridTemplateRows: `${navbar.height || 0}px 1fr`,
      }}
    >
      <div className="fixed left-0 top-0 h-screen w-screen opacity-10 grayscale">
        <img
          alt="Pokeball"
          src={PokeBallSVG.src}
          className={'fixed right-[-10px] top-[-5px] h-44 md:h-60'}
        />
        <img
          alt="Pokeball"
          src={PokeBallSVG.src}
          className={'fixed bottom-[-5px] left-[-10px] h-44 md:h-60'}
        />
      </div>
      {/* <Navbar /> */}
      <div
        ref={contentRef}
        id={'main_content'}
        className="z-50 m-auto w-full overflow-auto"
        style={{ height: `calc(100vh - ${navbar.height || 0}px)` }}
      >
        <div className="m-auto min-h-screen max-w-[1366px] p-4">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
