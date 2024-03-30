'use client'

import { useForm } from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { PaymentIntentResponse, UserType } from '@/lib/type'
import { useParams } from 'next/navigation'
import { useSearchContext } from '@/context/SearchContext'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { createRoomBooking } from '@/api/booking'
import { useState } from 'react'

type Props = {
  currentUser: UserType
  paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
  firstName: string
  lastName: string
  email: string
  adultCount: number
  childCount: number
  checkIn: string
  checkOut: string
  hotelId: string
  paymentIntentId: string
  totalCost: number
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe()
  const elements = useElements()
  const { theme } = useTheme()
  const search = useSearchContext()
  const { hotelId } = useParams()
  const [isLoadingStripe, setIsLoadingStripe] = useState(false)

  const { mutate: bookRoom, isPending } = useMutation({
    mutationKey: ['booking', hotelId, paymentIntent.paymentIntentId],
    mutationFn: (formData: BookingFormData) => createRoomBooking(formData),
    onSuccess: async (data) => {
      toast({
        title: data.message,
      })
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.name,
        description: error.response.data.message,
      })
    },
  })

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId as string,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  })

  const onSubmit = async (formData: BookingFormData) => {
    setIsLoadingStripe(true)
    if (!stripe || !elements) {
      return
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    })
    setIsLoadingStripe(false)
    if (result.paymentIntent?.status === 'succeeded') {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
    } else {
      toast({
        variant: 'destructive',
        title: 'Payment failed',
        description: 'Please try again',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
      <div className='space-y-5'>
        <h3 className='text-xl font-medium'>Pay for your trip</h3>
        <Card className='border-none shadow-none'>
          <CardHeader className='px-0'>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Add a new payment method to your account.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-6 px-0'>
            <CardElement
              id='payment-element'
              className='p-2 text-sm border rounded-md dark:text-white'
              options={{
                style: {
                  base: {
                    color: theme === 'dark' ? '#fff' : '#000',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className='w-full border-b border-[#404040]' />
      <div>
        <h3 className='mb-5 text-xl font-medium'>Contact information</h3>
        <form className='flex flex-col gap-5'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input id='firstName' type='text' disabled {...register('firstName')} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input id='lastName' type='text' disabled {...register('lastName')} />
            </div>
          </div>
          <label className='flex flex-col font-normal select-none opacity-50'>
            <span className='mb-2 text-sm'>Email address</span>
            <div className='relative'>
              <Input
                className='border-[#404040] placeholder:text-w-4004 w-full rounded-lg border bg-transparent focus:border-w-4004 h-10 p-[10px]'
                type='text'
                readOnly
                disabled
                {...register('email')}
              />
            </div>
          </label>
          <label className='flex flex-col font-normal'>
            <span className='mb-2 text-sm'>Phone number</span>
            <div className='relative'>
              <Input
                className='border-[#404040] placeholder:text-w-4004 w-full rounded-lg border bg-transparent focus:border-w-4004 h-10 p-[10px]'
                type='tel'
                placeholder='Add Phone Number'
                defaultValue='+84 '
                name='phone'
              />
            </div>
          </label>
        </form>
      </div>
      <div className='w-full border-b border-[#404040]' />
      <div className='grid gap-4'>
        <h3 className='text-lg font-medium'>Rules &amp; agreements</h3>
        <p className='text-sm'>
          I recognize I am responsible for any damages or services I book through Wander
        </p>
        <Link href='/' className='w-fit text-sm font-medium underline'>
          Booking rules
        </Link>
      </div>
      <Button className='w-full' type='submit' disabled={isPending || isLoadingStripe}>
        {isPending || isLoadingStripe ? 'Saving...' : `Pay ${paymentIntent?.totalCost}`}
      </Button>
    </form>
  )
}

export default BookingForm
