import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import MainLayout from './MainLayout'
import Pagination from '@/components/Pagination'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface PersistentLayoutProps {
  children: ReactNode
  showPagination?: boolean
}

const PersistentLayout: React.FC<PersistentLayoutProps> = ({
  children,
  showPagination = false,
}) => {
  const router = useRouter()
  const { name } = router.query

  // Get currentId from the Pokemon details in Redux store or parse from name
  const pokemonDetails = useSelector(
    (state: any) => state.pokemon.pokemon_details[name as string]
  )
  const currentId = pokemonDetails?.id || parseInt(name as string) || 0

  return (
    <MainLayout>
      <div className="flex flex-col text-white">
        {/* Persistent Pagination Header */}
        {showPagination && currentId > 0 && (
          <div className="flex-0">
            <Pagination currentId={currentId} range={4} />
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1">{children}</div>
      </div>
    </MainLayout>
  )
}

export default PersistentLayout
