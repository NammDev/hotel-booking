'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
// import { env } from '@/env.js'

// import { getCacheduser } from '@/lib/actions/auth'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useProfile } from '@/hooks/use-profile'
import AddHotelForm from '@/components/forms/add-hotel-form'

export default function NewHotelPage() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: user, isError } = useProfile()

  useEffect(() => {
    if (isError) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isError, pathname, router])

  return (
    <Shell variant='sidebar'>
      <PageHeader id='new-hotel-page-header' aria-labelledby='new-hotel-page-header-heading'>
        <PageHeaderHeading size='sm'>New Hotel</PageHeaderHeading>
        <PageHeaderDescription size='sm'>Add a new hotel to your account</PageHeaderDescription>
      </PageHeader>
      <Card
        as='section'
        id='new-hotel-page-form-container'
        aria-labelledby='new-hotel-page-form-heading'
      >
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Add hotel</CardTitle>
          <CardDescription>Add a new hotel to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AddHotelForm userId={user?._id as string} />
        </CardContent>
      </Card>
    </Shell>
  )
}
