import PokeBallSVG from '@/assets/img/pokeball_bnw.svg'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
const MainLayout = ({ children }) => {
  const contentRef = useRef()
  const navbar = useSelector((state) => state.config.navbar)
  return (
    <div
      className={`grid w-full grid-flow-row grid-cols-1 bg-white font-roboto text-sm text-gray-800 antialiased`}
      style={{
        gridTemplateRows: `${navbar.height || 0}px 1fr`,
      }}
    >
      <div className="fixed top-0 left-0 h-screen w-screen opacity-10 grayscale">
        <img
          src={PokeBallSVG.src}
          className={'fixed top-[-5px] right-[-10px] h-44 md:h-60'}
        />
        <img
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
        <div className="m-auto max-w-[1366px] p-4">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
