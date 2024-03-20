'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryKeys } from '@/config/query-key'
import { fetchMyHotelById } from '@/api/hotel'
import { useQuery } from '@tanstack/react-query'
import { UpdateHotelForm } from '@/components/forms/update-hotel-form'
import HotelNotFound from './not-found'
// import { ProductPager } from '@/components/pagers/product-pager'

export default function UpdateHotelPage({ params }: { params: { hotelId: string } }) {
  const hotelId = params.hotelId

  const { data: hotel } = useQuery({
    queryKey: [QueryKeys.MYHOTEL],
    queryFn: () => fetchMyHotelById(hotelId),
  })

  if (!hotel) {
    return <HotelNotFound />
  }

  return (
    <Card>
      <CardHeader className='space-y-1'>
        <div className='flex items-center justify-between space-x-2'>
          <CardTitle as='h2' className='text-2xl'>
            Update product
          </CardTitle>
          {/* <ProductPager product={product} /> */}
        </div>
        <CardDescription>Update your product information, or delete it</CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateHotelForm hotel={hotel?.data} />
      </CardContent>
    </Card>
  )
}
