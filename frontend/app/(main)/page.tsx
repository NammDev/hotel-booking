import { DateRangePicker } from '@/components/my-ui/date-range-picker'
import { Icons } from '@/components/my-ui/icons'
import { Shell } from '@/components/shells'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

// commiy
export default async function IndexPage() {
  const githubStars = 4784
  return (
    <Shell className='max-w-6xl'>
      <section className='mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 text-center'>
        <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
          <Badge aria-hidden='true' className='rounded-md px-3.5 py-1.5' variant='secondary'>
            <Icons.gitHub className='mr-2 size-3.5' aria-hidden='true' />
            {githubStars} stars on GitHub
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
                  // defaultMonth={date?.from}
                  // selected={date}
                  // onSelect={setDate}
                  numberOfMonths={2}
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
      </section>
      {/* <section className='grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {productCategories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </section> */}
    </Shell>
  )
}
