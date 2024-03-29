'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Icons } from '@/components/my-ui/icons'
import { addDays, format } from 'date-fns'
import { useSearchContext } from '@/context/SearchContext'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import NcInputNumber from './my-ui/nc-input-number'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { siteConfig } from '@/config/site'

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

export default function SearchBar() {
  const search = useSearchContext()
  const router = useRouter()

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

  function onSubmit(data: FormType) {
    search.saveSearchValues(
      data.destination || '',
      data.dates.from,
      data.dates.to,
      data.guests.adults,
      data.guests.childrens
    )
    router.push('/search')
  }

  return (
    <>
      <section className='mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 text-center'>
        <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
          <Badge aria-hidden='true' className='rounded-md px-3.5 py-1.5' variant='secondary'>
            <Icons.gitHub className='mr-2 size-3.5' aria-hidden='true' />
            4086 stars on GitHub
          </Badge>
          <span className='sr-only'>GitHub</span>
        </Link>
        <h1 className='text-balance font-heading text-3xl sm:text-5xl md:text-5xl lg:text-5xl'>
          Find your happy place.
        </h1>
        <p className='max-w-[42rem] text-balance leading-normal text-muted-foreground sm:text-sm'>
          Book a Wander with inspiring views, hotel-grade amenities, modern workstations, top-tier
          cleaning and 24/7 concierge service. It’s a vacation home, but better.
        </p>
        <div className='m-4 mt-0 px-2 lg:px-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg'
            >
              <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                <FormField
                  control={form.control}
                  name='destination'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='London, UK' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                <FormField
                  control={form.control}
                  name='dates'
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id='dates'
                            name='dates'
                            variant={'outline'}
                            className={cn(
                              'w-[300px] justify-start text-left font-normal',
                              !field.value.from && 'text-muted-foreground'
                            )}
                          >
                            <Icons.calendar className='mr-3 h-4 w-4 opacity-50' />

                            {field.value?.from ? (
                              field.value?.to ? (
                                <>
                                  {format(field.value?.from, 'LLL dd, y')} -{' '}
                                  {format(field.value?.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value?.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Select your dates</span>
                            )}
                          </Button>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                <FormField
                  control={form.control}
                  name='guests'
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id='adults'
                            name='adults'
                            variant={'outline'}
                            className={cn(
                              'w-[240px] justify-start text-left font-normal',
                              !field.value.adults && 'text-muted-foreground'
                            )}
                          >
                            <Icons.userPlus className='mr-3 h-4 w-4 opacity-50' />
                            <span>
                              {field.value.adults
                                ? `${field.value.adults} Adults - ${field.value.childrens} Childrens`
                                : 'Add guests'}
                            </span>
                          </Button>
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
                            onChange={(value) =>
                              field.onChange({ ...field.value, childrens: value })
                            }
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

              <Button type='submit'>Search</Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  )
}
