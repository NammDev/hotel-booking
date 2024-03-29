'use client'

import { createPaymentIntent, fetchHotelById } from '@/api/hotels'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import HotelDetailLoading from '@/components/loading/hotel-detail-loading'
import { Icons } from '@/components/my-ui/icons'
import NcInputNumber from '@/components/my-ui/nc-input-number'
import HotelDetailNotFound from '@/components/notFound/hotel-detail-notFound'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { QueryKeys } from '@/config/query-key'
import { useSearchContext } from '@/context/SearchContext'
import { useProfile } from '@/hooks/use-profile'
import { useQuery } from '@tanstack/react-query'
import { addDays, differenceInDays } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Elements } from '@stripe/react-stripe-js'
import { useAppContext } from '@/context/AppContext'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import CostBreakDown from './cost-breakdown'

export default function Booking({ params }: { params: { hotelId: string } }) {
  const { theme } = useTheme()
  const { stripePromise } = useAppContext()
  const search = useSearchContext()
  const hotelId = params.hotelId

  const defaultSelected: DateRange = {
    from: search.checkIn || new Date(),
    to: search.checkOut || addDays(new Date(), 1),
  }
  const [date, setDate] = useState<DateRange | undefined>(defaultSelected)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)
  const [totalNights, setTotalNights] = useState<number>(0)

  useEffect(() => {
    if (date?.from && date?.to) {
      const nights = Math.abs(date?.from?.getTime() - date.to.getTime()) / (1000 * 60 * 60 * 24)
      setTotalNights(Math.ceil(nights))
    }
  }, [date])

  const { data: paymentIntentData } = useQuery({
    queryKey: [QueryKeys.PAYMENT_INTENT, hotelId],
    queryFn: () => createPaymentIntent(hotelId, totalNights.toString()),
    enabled: !!hotelId && totalNights > 0,
  })

  const {
    data: hotel,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.HOTEL, hotelId],
    queryFn: () => fetchHotelById(hotelId),
    enabled: !!hotelId,
  })

  const { data: currentUser } = useProfile()

  if (isFetching) {
    return <HotelDetailLoading />
  } else if (!hotel) {
    return <HotelDetailNotFound />
  } else if (isError) {
    return <div>Error on get page</div>
  }

  return (
    <div className='container relative mx-auto grid grid-cols-1 gap-8 px-5 pt-[60px] lg:max-w-6xl lg:grid-cols-2 lg:gap-24 mb-6'>
      <div className='order-2 space-y-10 lg:order-1'>
        <div>
          <h3 className='text-[0.625rem] tracking-[0.075rem] leading-[1.125rem] font-medium'>
            TRIP SUMMARY
          </h3>
          <h2 className='mt-2 font-heading text-[2.5rem] leading-[3rem] tracking-[-0.075rem] font-medium'>
            {hotel.name}
          </h2>
          <div className='flex items-center gap-1 text-sm'>
            <Icons.eye className='w-4 h-4' />
            <span>146 views in the last 24 hours</span>
          </div>
        </div>
        <div>
          <div className='mb-3 flex items-center justify-between sm:gap-11'>
            <div>
              <h4 className='font-medium'>Date</h4>
              <p className='mt-1 flex items-center gap-1'>
                {date?.from?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })}{' '}
                to{' '}
                {date?.to?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })}
                ,<span className='block'>check-in at 2:00pm</span>
              </p>
            </div>
            <Popover>
              <PopoverTrigger>
                <Button>Edit dates</Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0 mt-2' align='center'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Guests</h4>
              <p className='h-6'>
                {adultCount ? `${adultCount} Adults - ${childCount} Childrens` : 'Add guests'}
              </p>
            </div>

            <Popover>
              <PopoverTrigger>
                <Button>Edit guests</Button>
              </PopoverTrigger>
              <PopoverContent className='w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5'>
                <NcInputNumber
                  className='w-full'
                  defaultValue={adultCount}
                  onChange={(value) => setAdultCount(value)}
                  max={10}
                  min={1}
                  label='Adults'
                  desc='Ages 13 or above'
                />
                <NcInputNumber
                  className='w-full mt-6'
                  defaultValue={childCount}
                  onChange={(value) => setChildCount(value)}
                  max={4}
                  label='Children'
                  desc='Ages 2–12'
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='w-full border-b border-[#404040]' />
        <div className='space-y-5'>
          <h3 className='text-xl font-medium'>Pay for your trip</h3>
          {currentUser && paymentIntentData && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: paymentIntentData.clientSecret,
              }}
            >
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
            </Elements>
          )}
        </div>
        <div className='w-full border-b border-[#404040]' />
        <div>
          <h3 className='mb-5 text-xl font-medium'>Contact information</h3>
          <form className='flex flex-col gap-5'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input id='firstName' placeholder='Nam' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input id='lastName' placeholder='Nguyen' />
              </div>
            </div>
            <label className='flex flex-col font-normal select-none opacity-50'>
              <span className='mb-2 text-sm'>Email address</span>
              <div className='relative'>
                <Input
                  className='border-[#404040] placeholder:text-w-4004 w-full rounded-lg border bg-transparent focus:border-w-4004 h-10 p-[10px]'
                  disabled
                  type='email'
                  placeholder='Email'
                  defaultValue='kanpy2010@gmail.com'
                  name='email'
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
        <Button className='w-full' type='submit'>
          Pay ${paymentIntentData?.totalCost}
        </Button>
      </div>
      <CostBreakDown hotel={hotel} totalNights={totalNights} />
    </div>
  )
}
