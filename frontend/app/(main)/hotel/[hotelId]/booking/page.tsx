'use client'

import { fetchHotelById } from '@/api/hotels'
import HotelDetailLoading from '@/components/loading/hotel-detail-loading'
import { Icons } from '@/components/my-ui/icons'
import NcInputNumber from '@/components/my-ui/nc-input-number'
import HotelDetailNotFound from '@/components/notFound/hotel-detail-notFound'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { QueryKeys } from '@/config/query-key'
import { useSearchContext } from '@/context/SearchContext'
import { useProfile } from '@/hooks/use-profile'
import { useQuery } from '@tanstack/react-query'
import { addDays, differenceInDays } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

export default function Booking({ params }: { params: { hotelId: string } }) {
  // const { stripePromise } = useAppContext()
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
  const [totalGuests, setTotalGuests] = useState<number>(search.adultCount + search.childCount)

  useEffect(() => {
    setTotalGuests(adultCount + childCount)
  }, [adultCount, childCount])

  useEffect(() => {
    const nights = date && date.from && date.to ? differenceInDays(date.to, date.from) : 0
    setTotalNights(Math.ceil(nights))
  }, [date])

  // const { data: paymentIntentData } = useQuery(
  //   'createPaymentIntent',
  //   () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
  //   {
  //     enabled: !!hotelId && numberOfNights > 0,
  //   }
  // )

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
                May 1st to May 4th,
                <span className='block'>check-in at 2:00pm</span>
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
              <p className='h-6'> {totalGuests ? `${totalGuests} Guests` : 'Add guests'}</p>
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
          {/* <div className='StripeElement'>
            <div
              className='__PrivateStripeElement'
              style={{
                margin: '-4px 0px !important',
                padding: '0px !important',
                border: 'none !important',
                display: 'block !important',
                background: 'transparent !important',
                position: 'relative !important',
                opacity: '1 !important',
                clear: 'both !important',
                transition: 'height 0.35s ease 0s !important',
              }}
            >
              <iframe
                name='__privateStripeFrame8474'
                frameBorder={0}
                allowTransparency='true'
                scrolling='no'
                role='presentation'
                allow='payment *; publickey-credentials-get *'
                src='https://js.stripe.com/v3/elements-inner-payment-43bb60f9c6bb77d8166f9e863620eb09.html#wait=true&rtl=false&publicOptions[defaultValues][billingDetails][email]=kanpy2010%40gmail.com&publicOptions[defaultValues][billingDetails][name]=kanpy97&publicOptions[defaultValues][billingDetails][phone]=%2B1&publicOptions[terms][card]=never&publicOptions[layout][type]=accordion&publicOptions[layout][defaultCollapsed]=false&publicOptions[layout][radios]=false&publicOptions[layout][spacedAccordionItems]=true&componentName=payment&keyMode=live&apiKey=pk_live_51JK3PsCpHpLfxhkeas87eKZaWfNlsdajqkZW5Q45Oqh5lb3dNLOFnlWE2m8JxZ5SIIpAj1CrRrMfvuy21lJm2nyI009WUqrxTb&referrer=https%3A%2F%2Fwww.wander.com%2Ftrip-summary%2Fwander-hudson-ridge%3FcheckIn%3D2024-05-01%26checkOut%3D2024-05-04&controllerId=__privateStripeController8471'
                title='Secure payment input frame'
                style={{
                  border: '0px !important',
                  margin: '-4px',
                  padding: '0px !important',
                  width: 'calc(100% + 8px)',
                  minWidth: '100% !important',
                  overflow: 'hidden !important',
                  display: 'block !important',
                  userSelect: 'none !important',
                  transform: 'translate(0px) !important',
                  colorScheme: 'light only !important',
                  height: 141,
                  opacity: 1,
                  transition: 'height 0.35s ease 0s, opacity 0.4s ease 0.1s',
                }}
              />
            </div>
          </div> */}
        </div>
        <div className='w-full border-b border-[#404040]' />
        <div>
          <h3 className='mb-5 text-xl font-medium'>Contact information</h3>
          <form className='flex flex-col gap-5'>
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
                  defaultValue='+84'
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
          Pay ${(hotel.pricePerNight * totalNights * 1.1).toFixed(1)}
        </Button>
      </div>
      <div className='sticky top-24 order-1 h-fit lg:order-2'>
        <div className='rounded-lg lg:px-5 lg:py-4 dark:lg:bg-[#1a1a1a] lg:bg-[#e5e4e4] '>
          <h4 className='mb-4 text-lg font-medium'>Cost breakdown</h4>
          <div className='text-w-4004'>
            <div className='mb-2 flex justify-between tracking-wider'>
              <div>
                ${hotel.pricePerNight} x {totalNights} nights
              </div>
              <div className='font-medium'>${hotel.pricePerNight * totalNights}</div>
            </div>
            <div className='mb-2 flex justify-between tracking-wider'>
              <div>Taxes and fees</div>
              <div className='font-medium'>
                ${(hotel.pricePerNight * totalNights * 0.1).toFixed(1)}
              </div>
            </div>
            <div className='mb-2'>
              <div className='flex justify-between'>
                <Accordion type='single' collapsible className='w-full'>
                  <AccordionItem value='item-1'>
                    <AccordionTrigger> All of this included</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li className='flex items-center'>
                          <div className='mr-2 text-w-4004'>
                            <Icons.sun className='w-6 h-6' />
                          </div>
                          <div className='text-w-4004'>Smart home with views</div>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className='mb-2 flex justify-between font-medium tracking-normal text-6-white text-lg'>
            <div>Total</div>
            <div className='font-medium'>
              ${(hotel.pricePerNight * totalNights * 1.1).toFixed(1)}
            </div>
          </div>
        </div>
        <div
          className='mt-6 flex h-[240px] w-full flex-col justify-end rounded-lg text-sm tracking-wide'
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%) 0% 0% / 100%, url("${hotel.imageUrls[0]}") no-repeat center`,
          }}
        >
          <div className='space-y-3 overflow-hidden px-4 pb-[14px] text-xs text-white'>
            <div>★★★★★</div>
            <div className='line-clamp-3' />
            <div className='flex items-center'>
              <div>Kevin Malloy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
