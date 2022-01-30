import React, { useRef } from 'react'

const MainLayout = ({ children }) => {
  const contentRef = useRef()

  return (
    <div
      className={`font-roboto grid w-screen grid-flow-row grid-cols-1 grid-rows-[64px_1fr] text-sm text-gray-900 antialiased dark:bg-gray-900 dark:text-white`}
    >
      <div className="sticky top-0 z-50 w-screen h-16 col-span-2 row-span-1 text-xs bg-red-500 shadow">
        Navbar
        {/* <ErrorBoundaryWrapper>
          <Navbar1 />
        </ErrorBoundaryWrapper> */}
      </div>
      <div
        id={'pp'}
        ref={contentRef}
        className="flex-column z-50 h-[calc(100vh_-_64px)] w-full overflow-auto p-4"
        // style={config.content_style_overwride || {}}
      >
        {/* <div className="sticky top-0 h-10 bg-yellow-700"></div> */}
        {children}
      </div>
    </div>
  )
}

export default MainLayout
