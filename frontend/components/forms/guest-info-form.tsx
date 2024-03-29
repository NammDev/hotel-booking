import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Icons } from '../my-ui/icons'
import { Calendar } from '../ui/calendar'
import { addDays, isSameDay } from 'date-fns'
import { useSearchContext } from '@/context/SearchContext'
import NcInputNumber from '../my-ui/nc-input-number'
import { usePathname, useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/use-profile'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage } from '../ui/form'
import { useEffect, useState } from 'react'

type Props = {
  hotelId: string
  pricePerNight: number
}

export const formSchema = z.object({
  destination: z.string().optional(),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guests: z.object({
    adults: z
      .number()
      .min(1, { message: 'Please select at least 1 adult' })
      .max(12, { message: 'Max 12 adults occupancy' }),
    childrens: z.number().min(0).max(12, { message: 'Max 12 adults occupancy' }),
  }),
})

type FormType = z.infer<typeof formSchema>

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext()
  const router = useRouter()
  const pathname = usePathname()
  const [numberOfNights, setNumberOfNights] = useState<number>(0)

  const { data: user } = useProfile()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: search.destination,
      dates: {
        from: search.checkIn || new Date(),
        to: search.checkOut || addDays(new Date(), 1),
      },
      guests: {
        adults: search.adultCount,
        childrens: search.childCount,
      },
    },
  })

  async function onSubmit(data: FormType) {
    search.saveSearchValues(
      data.destination || '',
      data.dates.from,
      data.dates.to,
      data.guests.adults,
      data.guests.childrens
    )
    if (user) {
      router.push(`/hotel/${hotelId}/booking`)
    } else {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }

  const dateDiff = form.watch('dates')

  useEffect(() => {
    if (dateDiff.from && dateDiff.to) {
      const nights =
        Math.abs(dateDiff.from.getTime() - dateDiff.to.getTime()) / (1000 * 60 * 60 * 24)
      setNumberOfNights(Math.ceil(nights))
    }
  }, [dateDiff])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='shadow-xl w-full flex flex-col rounded-2xl border-b border-t border-l border-r border-neutral-200 dark:border-neutral-700 space-y-6 xl:space-y-7 pb-10 p-2 sm:p-4 xl:px-8 xl:py-6'
      >
        {/* PRICE */}
        <div className='flex justify-between'>
          <span className='text-3xl font-semibold'>
            ${pricePerNight}
            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              /night
            </span>
          </span>
          {/* <StartRating /> */}
        </div>

        <div className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl'>
          <FormField
            control={form.control}
            name='dates'
            render={({ field }) => (
              <FormItem className='z-10 relative flex flex-1'>
                <Popover>
                  <PopoverTrigger className='flex-1 flex relative p-3 items-center space-x-3 focus:outline-none '>
                    <div className='text-neutral-300 dark:text-neutral-400'>
                      <Icons.calendar className='w-5 h-5 lg:w-7 lg:h-7' />
                    </div>
                    <div className='flex-grow text-left'>
                      <span className='block font-semibold xl:text-lg'>
                        {isSameDay(field.value.from, field.value.to)
                          ? 'Add Dates'
                          : field.value.from?.toLocaleDateString('en-US', {
                              month: 'short',
                              day: '2-digit',
                            }) +
                            ' - ' +
                            field.value.to?.toLocaleDateString('en-US', {
                              month: 'short',
                              day: '2-digit',
                            })}
                      </span>
                      <span className='block mt-1 text-sm font-light leading-none text-neutral-400'>
                        {'Check in - Check out'}
                      </span>
                    </div>
                    {!isSameDay(field.value.from, field.value.to) && (
                      <Icons.close2
                        className='absolute z-10 w-5 h-5 lg:w-6 lg:h-6 text-sm bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2'
                        onClick={() => field.onChange(undefined)}
                      />
                    )}
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0 mt-4' align='center'>
                    <Calendar
                      initialFocus
                      mode='range'
                      defaultMonth={field.value.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
          <FormField
            control={form.control}
            name='guests'
            render={({ field }) => (
              <FormItem className='z-10 relative flex flex-1'>
                <Popover>
                  <PopoverTrigger className='relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none'>
                    <div className='text-neutral-300 dark:text-neutral-400'>
                      <Icons.userPlus className='w-5 h-5 lg:w-7 lg:h-7' />
                    </div>
                    <div className='flex-grow'>
                      <span className='block font-semibold xl:text-lg'>
                        {field.value.adults + field.value.childrens || ''} Guests
                      </span>
                      <span className='block mt-1 text-sm font-light leading-none text-neutral-400'>
                        {field.value.adults + field.value.childrens ? 'Guests' : 'Add guests'}
                      </span>
                    </div>

                    {!!field.value.adults && (
                      <Icons.close2
                        className='absolute z-10 w-5 h-5 lg:w-6 lg:h-6 text-sm bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2'
                        onClick={() => {
                          field.onChange({ adults: 0, childrens: 0 })
                        }}
                      />
                    )}
                  </PopoverTrigger>
                  <PopoverContent className='w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5'>
                    <NcInputNumber
                      className='w-full'
                      defaultValue={field.value.adults}
                      onChange={(value) => field.onChange({ ...field.value, adults: value })}
                      max={10}
                      min={1}
                      label='Adults'
                      desc='Ages 13 or above'
                    />
                    <NcInputNumber
                      className='w-full mt-6'
                      defaultValue={field.value.childrens}
                      onChange={(value) => field.onChange({ ...field.value, childrens: value })}
                      max={4}
                      label='Children'
                      desc='Ages 2–12'
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SUM */}
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>
              ${pricePerNight} x {numberOfNights}{' '}
            </span>
            <span>${pricePerNight * numberOfNights}</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>${pricePerNight * numberOfNights}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <Button type='submit'>
          {user ? (
            <>
              Book Now
              <span className='sr-only'>Book Now</span>
            </>
          ) : (
            <>
              Sign in to Book
              <span className='sr-only'> Sign in to Book</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default GuestInfoForm
