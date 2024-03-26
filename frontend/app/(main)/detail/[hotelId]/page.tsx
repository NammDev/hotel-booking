'use client'

import { QueryKeys } from '@/config/query-key'
import { useQuery } from '@tanstack/react-query'
import HotelDetailLoading from '../../../../components/loading/hotel-detail-loading'
import HotelDetailNotFound from '../../../../components/notFound/hotel-detail-notFound'
import { fetchHotelById } from '@/api/hotels'
import { Icons } from '@/components/my-ui/icons'
import Image from 'next/image'

const defaultImageUrl = '/images/placeholder-hotel.webp'

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

  for (let i = 1; i <= 4; i++) {
    // Check if the current index is within the length of hotel.imageUrls
    if (i < hotel.imageUrls.length) {
      // Check if the current element is undefined or empty
      if (!hotel.imageUrls[i]) {
        // If it is, replace it with the default image URL
        hotel.imageUrls[i] = defaultImageUrl
      }
    } else {
      // If the current index is beyond the length of hotel.imageUrls, push the default image URL to the array
      hotel.imageUrls.push(defaultImageUrl)
    }
  }

  return (
    <div className='nc-ListingStayDetailPage'>
      {/*  HEADER */}
      <header className='rounded-md sm:rounded-xl'>
        <div className='relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2'>
          <div
            className='col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
            // onClick={handleOpenModalImageGallery}
          >
            <Image
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
              className='object-cover rounded-md sm:rounded-xl'
              src={hotel.imageUrls[0]}
              alt=''
              fill
            />
            <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
          </div>
          {hotel.imageUrls
            .filter((_, i) => i >= 1 && i < 5)
            .map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? 'hidden sm:block' : ''
                }`}
              >
                <div className='aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5'>
                  <Image
                    width={400}
                    height={400}
                    className='object-cover rounded-md sm:rounded-xl '
                    src={item || ''}
                    alt=''
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                  // onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

          <button
            className='absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10'
            // onClick={handleOpenModalImageGallery}
          >
            <Icons.media className='w-5 h-5' />
            <span className='ml-2 text-neutral-800 text-sm font-medium'>See all photos</span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=' relative z-10 mt-11 flex flex-col lg:flex-row '>
        {/* CONTENT */}
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10'>
          {/* {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          <SectionDateRange />
          {renderSection5()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()} */}
        </div>

        {/* SIDEBAR */}
        <div className='hidden lg:block flex-grow mt-14 lg:mt-0'>
          {/* <div className='sticky top-28'>{renderSidebar()}</div> */}
        </div>
      </main>
    </div>
  )
}
