'use client'

import { createPaymentIntent, fetchHotelById } from '@/api/hotels'
import HotelDetailLoading from '@/components/loading/hotel-detail-loading'
import HotelDetailNotFound from '@/components/notFound/hotel-detail-notFound'
import { QueryKeys } from '@/config/query-key'
import { useSearchContext } from '@/context/SearchContext'
import { useProfile } from '@/hooks/use-profile'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { useAppContext } from '@/context/AppContext'
import CostBreakDown from './cost-breakdown'
import TripSummary from './trim-summary'
import BookingForm from './booking-form'

export default function Booking({ params }: { params: { hotelId: string } }) {
  const { stripePromise } = useAppContext()
  const search = useSearchContext()
  const hotelId = params.hotelId

  const [numberOfNights, setNumberOfNights] = useState<number>(0)

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24)
      setNumberOfNights(Math.ceil(nights))
    }
  }, [search.checkIn, search.checkOut])

  const { data: paymentIntentData } = useQuery({
    queryKey: [QueryKeys.PAYMENT_INTENT, hotelId],
    queryFn: () => createPaymentIntent(hotelId, numberOfNights.toString()),
    enabled: !!hotelId && numberOfNights > 0,
  })

  const {
    data: hotel,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.HOTEL, hotelId],
    queryFn: () => fetchHotelById(hotelId),
    enabled: !!hotelId,
  })

  const { data: currentUser } = useProfile()

  if (isFetching) {
    return <HotelDetailLoading />
  } else if (!hotel) {
    return <HotelDetailNotFound />
  } else if (isError) {
    return <div>Error on get page</div>
  }

  return (
    <div className='container relative mx-auto grid grid-cols-1 gap-8 px-5 pt-[60px] lg:max-w-6xl lg:grid-cols-2 lg:gap-24 mb-6'>
      <div className='order-2 space-y-10 lg:order-1'>
        <TripSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          hotel={hotel}
        />
        {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentData.clientSecret,
            }}
          >
            <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
          </Elements>
        )}
      </div>
      {paymentIntentData && (
        <CostBreakDown
          hotel={hotel}
          paymentIntent={paymentIntentData}
          numberOfNights={numberOfNights}
        />
      )}
    </div>
  )
}
