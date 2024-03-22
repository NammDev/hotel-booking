import { Icons } from '@/components/my-ui/icons'
import SearchBar from '@/components/search-bar'
import { Shell } from '@/components/shells'
import { Badge } from '@/components/ui/badge'
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
        <SearchBar />
      </section>
      {/* <section className='grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {productCategories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </section> */}
    </Shell>
  )
}
