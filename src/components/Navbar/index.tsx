import { setNavbarHeight } from '@/reducers/config'
import useElementSize from '@/utils/use-element-size'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const links = [
  {
    title: 'Home',
    link: '/',
  },
]

const Navbar = () => {
  const [ref, { width, height }] = useElementSize()

  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(setNavbarHeight(0))
    }
  }, [])
  useEffect(() => {
    dispatch(setNavbarHeight(height))
  }, [height])

  return (
    <div ref={ref} className="z-50 h-fit w-screen text-xs">
      <div className="mx-10 mt-5 flex rounded-md shadow-lg">
        {links.map(({ title, link }) => {
          return (
            <Link
              href={link}
              className="m-2 rounded-md bg-white p-4 text-xl font-semibold shadow-md"
            >
              {title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
