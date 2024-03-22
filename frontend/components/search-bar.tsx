'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Icons } from '@/components/my-ui/icons'
import { addDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useEffect, useState } from 'react'
import { useSearchContext } from '@/context/SearchContext'

export default function SearchBar() {
  const search = useSearchContext()

  const defaultSelected: DateRange = {
    from: search.checkIn || new Date(),
    to: search.checkOut || addDays(new Date(), 1),
  }
  const [date, setDate] = useState<DateRange | undefined>(defaultSelected)
  const [destination, setDestination] = useState<string>(search.destination)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)

  useEffect(() => {
    console.log(date?.from, date?.to)
  }, [date?.from, date?.to])

  return (
    <div className='flex flex-wrap items-center justify-center gap-4 py-6'>
      <div className='border-w-8002 relative z-50 flex h-[54px] w-fit select-none flex-row items-center justify-center rounded-lg border transition-[height] duration-150 bg-gradient-to-b from-[#141414] to-[#1A1A1A]'>
        <Popover>
          <PopoverTrigger asChild>
            <div
              role='button'
              className='border-w-8002 text-w-3005 group isolate z-50 flex h-full min-w-[150px] flex-row items-center whitespace-nowrap px-4 py-2 transition-[background,min-width] duration-300 ease-out hover:text-white xl:min-w-[200px]  hover:!bg-[#292929] group rounded-l-lg'
            >
              <Icons.calendar className='relative h-[1.2em] w-[1.2em] shrink-0 text-w-4004 top-0 mr-3 transition-colors duration-100 group-hover:text-inherit' />
              <div className='grid text-sm'>
                <span className='text-balance leading-normal text-muted-foreground sm:text-sm'>
                  When
                </span>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0 mt-4' align='center'>
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
        <div
          role='button'
          className='border-w-8002 text-w-3005 group isolate z-50 flex h-full min-w-[150px] flex-row items-center whitespace-nowrap px-4 py-2 transition-[background,min-width] duration-300 ease-out hover:text-white xl:min-w-[200px] hover:!bg-[#292929] group border-x'
        >
          <Icons.locate className='relative h-[1.2em] w-[1.2em] shrink-0 text-w-4004 top-0 mr-3 transition-colors duration-100 group-hover:text-inherit' />
          <div className='grid text-sm'>
            <span className='text-balance leading-normal text-muted-foreground sm:text-sm'>
              Where
            </span>
          </div>
        </div>
        <div
          role='button'
          className='border-w-8002 text-w-3005 group isolate z-50 flex h-full flex-row items-center whitespace-nowrap px-4 py-2 transition-[background,min-width] duration-300 ease-out hover:text-white xl:min-w-[200px] hover:!bg-[#292929] group relative min-w-[170px] rounded-r-lg'
        >
          <Icons.users className='relative h-[1.2em] w-[1.2em] shrink-0 text-w-4004 top-0 mr-3 transition-colors duration-100 group-hover:text-inherit'></Icons.users>
          <div className='grid text-sm'>
            <span className='text-balance leading-normal text-muted-foreground sm:text-sm'>
              Who
            </span>
          </div>
        </div>
        <button
          aria-label='Search'
          className='absolute right-[11px] z-50 grid aspect-square w-8 place-items-center rounded-md  transition-all text-black bg-white hover:!bg-white'
        >
          <Icons.search
            className='relative h-[1.2em] shrink-0 top-0 w-4'
            aria-hidden='true'
          ></Icons.search>
        </button>
      </div>
    </div>
  )
}
