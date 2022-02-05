import Navbar from '@/components/Navbar'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

const MainLayout = ({ children }) => {
  const contentRef = useRef()
  const navbar = useSelector((state) => state.config.navbar)
  return (
    <div
      className={`font-roboto grid w-screen grid-flow-row grid-cols-1 bg-white text-sm text-gray-800 antialiased`}
      style={{
        gridTemplateRows: `${navbar.height || 0}px 1fr`,
      }}
    >
      {/* <Navbar /> */}
      <div
        id={'pp'}
        ref={contentRef}
        className="z-50 w-full p-4 overflow-auto flex-column"
        style={{ height: `calc(100vh - ${navbar.height || 0}px)` }}
      >
        {children}
      </div>
    </div>
  )
}

export default MainLayout
