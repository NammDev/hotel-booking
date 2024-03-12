import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
// import { env } from '@/env.js'

// import { getCacheduser } from '@/lib/actions/auth'
// import { AddStoreForm } from '@/components/forms/add-store-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'

export const metadata: Metadata = {
  //   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'New Hotel',
  description: 'Add a new hotel',
}

export default async function NewHotelPage() {
  //   const user = await getCacheduser()

  //   if (!user) {
  //     redirect('/signin')
  //   }

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
        <CardContent>{/* <AddStoreForm userId={user.id} /> */}</CardContent>
      </Card>
    </Shell>
  )
}
