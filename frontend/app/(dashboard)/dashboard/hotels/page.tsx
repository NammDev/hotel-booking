'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { RocketIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { HotelCardSkeleton } from '@/components/skeletons/hotel-card-skeleton'
import { useProfile } from '@/hooks/use-profile'
import { useQuery } from '@tanstack/react-query'
import { fetchMyHotels } from '@/api/hotel'
import { QueryKeys } from '@/config/query-key'
import { HotelCardType } from '@/lib/type'
import { HotelCard } from '@/components/cards/hotel-card'

export default function HotelsPage() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: user, isError } = useProfile()

  useEffect(() => {
    if (isError) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isError, pathname, router])

  const { data: hotelData } = useQuery({
    queryKey: [QueryKeys.MYHOTELS, { userId: user?._id }],
    queryFn: fetchMyHotels,
  })

  if (!hotelData) {
    return <span>No Hotels found</span>
  }

  return (
    <Shell variant='sidebar'>
      <PageHeader>
        <div className='flex space-x-4'>
          <PageHeaderHeading size='sm' className='flex-1'>
            Hotels
          </PageHeaderHeading>
          <Link
            aria-label='Create hotel'
            href={'/dashboard/hotels/new'}
            className={cn(
              buttonVariants({
                size: 'sm',
              })
            )}
          >
            Create Hotel
          </Link>
        </div>
        <PageHeaderDescription size='sm'>Manage your hotels</PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className='size-4' aria-hidden='true' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the <span className='font-semibold'>Ollie</span> plan. You can create
          up to <span className='font-semibold'>1</span> hotels and{' '}
          <span className='font-semibold'>20</span> products on this plan.
        </AlertDescription>
      </Alert>
      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <HotelCardSkeleton key={i} />
          ))}
        >
          {hotelData.data.map((hotel: HotelCardType) => (
            <HotelCard key={hotel._id} hotel={hotel} href={`/dashboard/hotels/${hotel._id}`} />
          ))}
        </Suspense>
      </section>
    </Shell>
  )
}
