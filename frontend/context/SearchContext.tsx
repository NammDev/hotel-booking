'use client'
import React, { useContext, useEffect, useState } from 'react'

type SearchContext = {
  destination: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  hotelId: string
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined)

type SearchContextProviderProps = {
  children: React.ReactNode
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>('')
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date())
  const [adultCount, setAdultCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(1)
  const [hotelId, setHotelId] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDestination(sessionStorage.getItem('destination') || '')
      setCheckIn(new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()))
      setCheckOut(new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()))
      setAdultCount(parseInt(sessionStorage.getItem('adultCount') || '1'))
      setChildCount(parseInt(sessionStorage.getItem('childCount') || '1'))
      setHotelId(sessionStorage.getItem('hotelId') || '')
    }
  }, [])

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination)
    setCheckIn(checkIn)
    setCheckOut(checkOut)
    setAdultCount(adultCount)
    setChildCount(childCount)
    if (hotelId) {
      setHotelId(hotelId)
    }

    sessionStorage.setItem('destination', destination)
    sessionStorage.setItem('checkIn', checkIn.toISOString())
    sessionStorage.setItem('checkOut', checkOut.toISOString())
    sessionStorage.setItem('adultCount', adultCount.toString())
    sessionStorage.setItem('childCount', childCount.toString())

    if (hotelId) {
      sessionStorage.setItem('hotelId', hotelId)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  return context as SearchContext
}
