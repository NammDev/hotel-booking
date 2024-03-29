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

export const formSchema = z.object({
  destination: z.string().min(2).max(50),
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

export default function SearchBar() {
  const search = useSearchContext()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
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

  function onSubmit(data: z.infer<typeof formSchema>) {
    search.saveSearchValues(
      data.destination,
      data.dates.from,
      data.dates.to,
      data.guests.adults,
      data.guests.childrens
    )
    router.push('/search')
  }

  return (
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
                  <FormLabel className='flex'>
                    Location <Icons.locate className='ml-2 h-4 2-4' />
                  </FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder='London, UK' {...field} />
                  </FormControl>
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
                  <FormLabel className='flex flex-col'>Dates</FormLabel>
                  <FormMessage />
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
                  <FormLabel className='flex flex-col'>Guest</FormLabel>
                  <FormMessage />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id='adults'
                        name='adults'
                        variant={'outline'}
                        className={cn(
                          'w-[300px] justify-start text-left font-normal',
                          !field.value.adults && 'text-muted-foreground'
                        )}
                      >
                        <Icons.userPlus className='mr-3 h-4 w-4 opacity-50' />
                        <span>
                          {field.value.adults ? `${field.value.adults} Guest` : 'Add guests'}
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
                        onChange={(value) => field.onChange({ ...field.value, childrens: value })}
                        max={4}
                        label='Children'
                        desc='Ages 2–12'
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>Search</Button>
        </form>
      </Form>
    </div>
  )
}
