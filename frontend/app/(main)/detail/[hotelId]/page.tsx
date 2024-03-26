'use client'

import { QueryKeys } from '@/config/query-key'
import { useQuery } from '@tanstack/react-query'
import HotelDetailLoading from '../../../../components/loading/hotel-detail-loading'
import HotelDetailNotFound from '../../../../components/notFound/hotel-detail-notFound'
import { fetchHotelById } from '@/api/hotels'
import { Icons } from '@/components/my-ui/icons'

export default function DetailPage({ params }: { params: { hotelId: string } }) {
  const hotelId = params.hotelId

  const {
    data: hotel,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.HOTEL, hotelId],
    queryFn: () => fetchHotelById(hotelId),
  })

  if (isFetching) {
    return <HotelDetailLoading />
  } else if (!hotel) {
    return <HotelDetailNotFound />
  } else if (isError) {
    return <div>Error on get page</div>
  }

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <Icons.store key={index} className='fill-yellow-400' />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      {/* <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel.imageUrls.map((image) => (
          <div className='h-[300px]'>
            <img
              src={image}
              alt={hotel.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel.facilities.map((facility) => (
          <div className='border border-slate-300 rounded-sm p-3'>{facility}</div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
        </div>
      </div> */}
    </div>
  )
}
