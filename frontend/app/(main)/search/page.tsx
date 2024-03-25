'use client'

import { searchHotels } from '@/api/hotels'
import HotelNotFound from '@/app/(dashboard)/dashboard/hotels/[hotelId]/edit/not-found'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Products } from '@/components/products'
import { Shell } from '@/components/shells'
import { HotelCardSkeleton } from '@/components/skeletons/hotel-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { QueryKeys } from '@/config/query-key'
import { useSearchContext } from '@/context/SearchContext'
import { HotelCardType } from '@/lib/type'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function SearchPage() {
  const search = useSearchContext()

  const [page, setPage] = useState<number>(1)

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  }

  const {
    data: hotelData,
    isFetching,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [QueryKeys.SEARCHHOTEL, searchParams],
    queryFn: () => searchHotels(searchParams),
  })

  if (isFetching) {
    return (
      <Shell>
        <div className='space-y-2'>
          <Skeleton className='h-10 w-28' />
          <Skeleton className='h-4 w-48' />
        </div>
        <div className='flex flex-col space-y-6'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-14' />
            <Skeleton className='h-8 w-20' />
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {Array.from({ length: 8 }).map((_, i) => (
              <HotelCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Shell>
    )
  } else if (isError || !hotelData?.data?.length) {
    return <HotelNotFound />
  }

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size='sm'>Hotels</PageHeaderHeading>
        <PageHeaderDescription size='sm'>All hotels from your search</PageHeaderDescription>
      </PageHeader>
      <Products
        hotels={hotelData.data}
        // pageCount={productsTransaction.pageCount}
        // categories={Object.values(products.category.enumValues)}
        // stores={storesTransaction.data}
        // storePageCount={storesTransaction.pageCount}
      />
    </Shell>
  )
}
