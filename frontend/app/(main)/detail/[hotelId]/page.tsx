'use client'

import { QueryKeys } from '@/config/query-key'
import { useQuery } from '@tanstack/react-query'
import HotelDetailLoading from '../../../../components/loading/hotel-detail-loading'
import HotelDetailNotFound from '../../../../components/notFound/hotel-detail-notFound'
import { fetchHotelById } from '@/api/hotels'
import { Icons } from '@/components/my-ui/icons'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { toTitleCase } from '@/lib/utils'
import GuestInfoForm from '@/components/forms/guest-info-form'

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

  const renderSection1 = () => {
    return (
      <div className='listingSection__wrap !space-y-6'>
        {/* 1 */}
        <div className='flex justify-between items-center'>
          <Badge>{toTitleCase(hotel.type)}</Badge>
          {/* <LikeSaveBtns /> */}
        </div>

        {/* 2 */}
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          {toTitleCase(hotel.name)}
        </h2>

        {/* 3 */}
        <div className='flex items-center space-x-4'>
          {/* <StartRating /> */}
          <span>·</span>
          <span>
            <i className='las la-map-marker-alt'></i>
            <span className='ml-1'>
              {' '}
              {toTitleCase(hotel.city)}, {toTitleCase(hotel.country)}
            </span>
          </span>
        </div>

        {/* 4 */}
        <div className='flex items-center'>
          {/* <Avatar hasChecked sizeClass='h-10 w-10' radius='rounded-full' /> */}
          <span className='ml-2.5 text-neutral-500 dark:text-neutral-400'>
            Hosted by{' '}
            <span className='text-neutral-900 dark:text-neutral-200 font-medium'>
              Kevin Francis
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className='w-full border-b border-neutral-100 dark:border-neutral-700' />

        {/* 6 */}
        <div className='flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300'>
          <div className='flex items-center space-x-3 '>
            <i className=' las la-user text-2xl '></i>
            <span className=''>
              {hotel.adultCount} <span className='hidden sm:inline-block'>guests</span>
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <i className=' las la-bed text-2xl'></i>
            <span className=' '>
              6 <span className='hidden sm:inline-block'>beds</span>
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <i className=' las la-bath text-2xl'></i>
            <span className=' '>
              3 <span className='hidden sm:inline-block'>baths</span>
            </span>
          </div>
          <div className='flex items-center space-x-3'>
            <i className=' las la-door-open text-2xl'></i>
            <span className=' '>
              2 <span className='hidden sm:inline-block'>bedrooms</span>
            </span>
          </div>
        </div>
      </div>
    )
  }

  const renderSection2 = () => {
    return (
      <div className='listingSection__wrap'>
        <h2 className='text-2xl font-semibold'>Stay information</h2>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700'></div>
        <div className='text-neutral-6000 dark:text-neutral-300'>
          <span>
            Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an
            outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities.
            Complimentary WiFi is provided.
          </span>
          <br />
          <br />
          <span>
            There is a private bathroom with bidet in all units, along with a hairdryer and free
            toiletries.
          </span>
          <br /> <br />
          <span>{hotel.description}</span>
        </div>
      </div>
    )
  }

  const renderSection3 = () => {
    return (
      <div className='listingSection__wrap'>
        <div>
          <h2 className='text-2xl font-semibold'>Amenities </h2>
          <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700'></div>
        {/* 6 */}
        <div className='grid grid-cols-1 gap-6 text-sm xl:grid-cols-3 text-neutral-700 dark:text-neutral-300 '>
          {/* {Amenities_demos.filter((_, i) => i < 12).map((item) => (
            <div key={item.name} className='flex items-center space-x-3'>
              <i className={`text-3xl las ${item.icon}`}></i>
              <span className=''>{item.name}</span>
            </div>
          ))} */}
        </div>

        {/* ----- */}
        <div className='border-b w-14 border-neutral-200'></div>
        <div>
          {/* <ButtonSecondary onClick={openModalAmenities}>View more 20 amenities</ButtonSecondary> */}
        </div>
        {/* {renderMotalAmenities()} */}
      </div>
    )
  }

  const renderSection4 = () => {
    return (
      <div className='listingSection__wrap'>
        {/* HEADING */}
        <div>
          <h2 className='text-2xl font-semibold'>Room Rates </h2>
          <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700'></div>
        {/* CONTENT */}
        <div className='flow-root'>
          <div className='-mb-4 text-sm sm:text-base text-neutral-6000 dark:text-neutral-300'>
            <div className='flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className='flex items-center justify-between p-4 space-x-4 rounded-lg'>
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className='flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
              <span>Friday - Sunday</span>
              <span>$219</span>
            </div>
            <div className='flex items-center justify-between p-4 space-x-4 rounded-lg'>
              <span>Rent by month</span>
              <span>-8.34 %</span>
            </div>
            <div className='flex items-center justify-between p-4 space-x-4 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div>
            <div className='flex items-center justify-between p-4 space-x-4 rounded-lg'>
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSection5 = () => {
    return (
      <div className='listingSection__wrap'>
        {/* HEADING */}
        <h2 className='text-2xl font-semibold'>Host Information</h2>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700'></div>

        {/* host */}
        <div className='flex items-center space-x-4'>
          {/* <Avatar
            hasChecked
            hasCheckedClass='w-4 h-4 -top-0.5 right-0.5'
            sizeClass='h-14 w-14'
            radius='rounded-full'
          /> */}
          <div>
            <a className='block text-xl font-medium' href='##'>
              Kevin Francis
            </a>
            <div className='mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400'>
              {/* <StartRating /> */}
              <span className='mx-2'>·</span>
              <span> 12 places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className='block text-neutral-6000 dark:text-neutral-300'>
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an
          outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities...
        </span>

        {/* info */}
        <div className='block text-neutral-500 dark:text-neutral-400 space-y-2.5'>
          <div className='flex items-center space-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className='flex items-center space-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className='flex items-center space-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700'></div>
        <div>{/* <ButtonSecondary href='/author'>See host profile</ButtonSecondary> */}</div>
      </div>
    )
  }

  const renderSection6 = () => {
    return (
      <div className='listingSection__wrap'>
        {/* HEADING */}
        <h2 className='text-2xl font-semibold'>Reviews (23 reviews)</h2>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700'></div>

        {/* Content */}
        <div className='space-y-5'>
          {/* <FiveStartIconForRate iconClass='w-6 h-6' className='space-x-0.5' /> */}
          <div className='relative'>
            {/* <Input
              fontClass=''
              sizeClass='h-16 px-4 py-3'
              rounded='rounded-3xl'
              placeholder='Share your thoughts ...'
            />
            <ButtonCircle
              className='absolute transform -translate-y-1/2 right-2 top-1/2'
              size=' w-12 h-12 '
            >
              <ArrowRightIcon className='w-5 h-5' />
            </ButtonCircle> */}
          </div>
        </div>

        {/* comment */}
        <div className='divide-y divide-neutral-100 dark:divide-neutral-800'>
          {/* <CommentListing className='py-8' />
          <CommentListing className='py-8' />
          <CommentListing className='py-8' />
          <CommentListing className='py-8' />
          <div className='pt-8'>
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div> */}
        </div>
      </div>
    )
  }

  const renderSection7 = () => {
    return (
      <div className='listingSection__wrap'>
        {/* HEADING */}
        <div>
          <h2 className='text-2xl font-semibold'>Location</h2>
          <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
            San Diego, CA, United States of America (SAN-San Diego Intl.)
          </span>
        </div>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700' />

        {/* MAP */}
        <div className='z-0 aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl'>
          <div className='z-0 overflow-hidden rounded-xl'>
            <iframe
              width='100%'
              height='100%'
              loading='lazy'
              allowFullScreen
              referrerPolicy='no-referrer-when-downgrade'
              src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France'
            ></iframe>
          </div>
        </div>
      </div>
    )
  }

  const renderSection8 = () => {
    return (
      <div className='listingSection__wrap'>
        {/* HEADING */}
        <h2 className='text-2xl font-semibold'>Things to know</h2>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700' />

        {/* CONTENT */}
        <div>
          <h4 className='text-lg font-semibold'>Cancellation policy</h4>
          <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
            Refund 50% of the booking value when customers cancel the room within 48 hours after
            successful booking and 14 days before the check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50% refund of the total
            amount paid (minus the service fee).
          </span>
        </div>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700' />

        {/* CONTENT */}
        <div>
          <h4 className='text-lg font-semibold'>Check-in time</h4>
          <div className='max-w-md mt-3 text-sm text-neutral-500 dark:text-neutral-400 sm:text-base'>
            <div className='flex justify-between p-3 space-x-10 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
              <span>Check-in</span>
              <span>08:00 am - 12:00 am</span>
            </div>
            <div className='flex justify-between p-3 space-x-10'>
              <span>Check-out</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
        <div className='border-b w-14 border-neutral-200 dark:border-neutral-700' />

        {/* CONTENT */}
        <div>
          <h4 className='text-lg font-semibold'>Special Note</h4>
          <div className='prose sm:prose'>
            <ul className='mt-3 space-y-2 text-neutral-500 dark:text-neutral-400'>
              <li>
                Ban and I will work together to keep the landscape and environment green and clean
                by not littering, not using stimulants and respecting people around.
              </li>
              <li>Do not sing karaoke past 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    )
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
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          {/* <SectionDateRange /> */}
          {renderSection5()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className='hidden lg:block flex-grow mt-14 lg:mt-0'>
          <div className='sticky top-28'>
            <GuestInfoForm hotelId={hotel._id} pricePerNight={hotel.pricePerNight} />
          </div>
        </div>
      </main>
    </div>
  )
}
