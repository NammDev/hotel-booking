'use client'

import { useSearchContext } from '@/context/SearchContext'
import { useState } from 'react'

export default function SearchPage() {
  const search = useSearchContext()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <ul>
        <li>{search.destination}</li>
        <li>{String(search.checkIn)}</li>
        <li>{String(search.checkOut)}</li>
        <li>{search.adultCount}</li>
        <li>{search.childCount}</li>
        <li>{search.hotelId}</li>
      </ul>
    </div>
  )
}
