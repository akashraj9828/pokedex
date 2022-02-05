import { config_actions } from '@/reducers/config'
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
      dispatch({ type: config_actions.SET_NAVBAR_HEIGHT, payload: 0 })
    }
  }, [])
  useEffect(() => {
    dispatch({ type: config_actions.SET_NAVBAR_HEIGHT, payload: height })
  }, [height])

  return (
    <div ref={ref} className="z-50 w-screen text-xs h-fit">
      <div className="flex mx-10 mt-5 rounded-md shadow-lg">
        {links.map(({ title, link }) => {
          return (
            <Link href={link}>
              <a className="p-4 m-2 text-xl font-semibold bg-white rounded-md shadow-md">
                {title}
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
