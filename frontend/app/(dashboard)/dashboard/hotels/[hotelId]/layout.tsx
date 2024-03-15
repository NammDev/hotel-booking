'use client'

import { usePathname, useRouter } from 'next/navigation'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { useEffect } from 'react'
import { useProfile } from '@/hooks/use-profile'
import { Shell } from '@/components/shells'
import { HotelTabs } from '@/components/tabs/hotel-tabs'
// import { StoreTabs } from '@/components/store-tabs'

interface HotelLayoutProps extends React.PropsWithChildren {
  params: {
    hotelId: string
  }
}

export default function HotelLayout({ children, params }: HotelLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const hotelId = decodeURIComponent(params.hotelId)

  const { data: user, isError } = useProfile()

  useEffect(() => {
    if (isError) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isError, pathname, router])

  return (
    <Shell variant='sidebar' className='gap-4'>
      <PageHeader>
        <PageHeaderHeading size='sm'>Dashboard</PageHeaderHeading>
        <PageHeaderDescription size='sm'>Manage your Hotel</PageHeaderDescription>
      </PageHeader>
      <HotelTabs hotelId={hotelId} />
      <div className='overflow-hidden'>{children}</div>
    </Shell>
  )
}
