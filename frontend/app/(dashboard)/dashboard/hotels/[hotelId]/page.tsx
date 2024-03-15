import { type Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface UpdateStorePageProps {
  params: {
    hotelId: string
  }
}

export default async function UpdateHotelPage({ params }: UpdateStorePageProps) {
  const hotelId = Number(params.hotelId)

  // get hotel
  //   const store = await db.query.stores.findFirst({
  //     where: eq(stores.id, hotelId),
  //     columns: {
  //       id: true,
  //       name: true,
  //       description: true,
  //     },
  //   })

  //   if (!store) {
  //     notFound()
  //   }

  //   const { account: stripeAccount } = await getStripeAccount({
  //     hotelId,
  //   })

  return (
    <div className='space-y-10'>
      <Card as='section' id='connect-to-stripe' aria-labelledby='connect-to-stripe-heading'>
        <CardHeader className='space-y-1'>
          <CardTitle className='line-clamp-1 text-2xl'>Connect to Stripe</CardTitle>
          <CardDescription>
            Connect your store to Stripe to start accepting payments
          </CardDescription>
        </CardHeader>
        <CardContent>{/* <ConnectStoreToStripeButton hotelId={hotelId} /> */}</CardContent>
      </Card>
      <Card as='section'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Update your store</CardTitle>
          <CardDescription>Update your store name and description, or delete it</CardDescription>
        </CardHeader>
        <CardContent>Hello</CardContent>
      </Card>
    </div>
  )
}
