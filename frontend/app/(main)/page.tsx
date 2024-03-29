import { CategoryCard } from '@/components/cards/category-card'
import { Icons } from '@/components/my-ui/icons'
import { Shell } from '@/components/shells'
import { ContentSection } from '@/components/shells/content-section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'

export const productCategories = [
  {
    title: 'skateboards',
    image: '/images/skateboard-one.webp',
    icon: Icons.logo,
    subcategories: [
      {
        title: 'Decks',
        description: 'The board itself.',
        image: '/images/deck-one.webp',
        slug: 'decks',
      },
      {
        title: 'Wheels',
        description: 'The wheels that go on the board.',
        image: '/images/wheel-one.webp',
        slug: 'wheels',
      },
      {
        title: 'Trucks',
        description: 'The trucks that go on the board.',
        image: '/images/truck-one.webp',
        slug: 'trucks',
      },
      {
        title: 'Bearings',
        description: 'The bearings that go in the wheels.',
        image: '/images/bearing-one.webp',
        slug: 'bearings',
      },
      {
        title: 'Griptape',
        description: 'The griptape that goes on the board.',
        image: '/images/griptape-one.webp',
        slug: 'griptape',
      },
      {
        title: 'Hardware',
        description: 'The hardware that goes on the board.',
        image: '/images/hardware-one.webp',
        slug: 'hardware',
      },
      {
        title: 'Tools',
        description: 'The tools that go with the board.',
        image: '/images/tool-one.webp',
        slug: 'tools',
      },
    ],
    description: 'The best skateboards for all levels of skaters.',
  },
  {
    title: 'clothing',
    image: '/images/clothing-one.webp',
    icon: Icons.shirt,
    subcategories: [
      {
        title: 'T-shirts',
        description: 'Cool and comfy tees for effortless style.',
        slug: 't-shirts',
      },
      {
        title: 'Hoodies',
        description: 'Cozy up in trendy hoodies.',
        slug: 'hoodies',
      },
      {
        title: 'Pants',
        description: 'Relaxed and stylish pants for everyday wear.',
        slug: 'pants',
      },
      {
        title: 'Shorts',
        description: 'Stay cool with casual and comfortable shorts.',
        slug: 'shorts',
      },
      {
        title: 'Hats',
        description: 'Top off your look with stylish and laid-back hats.',
        slug: 'hats',
      },
    ],
    description: 'Rad shoes for long skate sessions.',
  },
  {
    title: 'shoes',
    image: '/images/shoe-one.webp',
    icon: Icons.footprints,
    subcategories: [
      {
        title: 'Low Tops',
        description: 'Rad low tops shoes for a stylish low-profile look.',
        slug: 'low-tops',
      },
      {
        title: 'High Tops',
        description: 'Elevate your style with rad high top shoes.',
        slug: 'high-tops',
      },
      {
        title: 'Slip-ons',
        description: 'Effortless style with rad slip-on shoes.',
        slug: 'slip-ons',
      },
      {
        title: 'Pros',
        description: 'Performance-driven rad shoes for the pros.',
        slug: 'pros',
      },
      {
        title: 'Classics',
        description: 'Timeless style with rad classic shoes.',
        slug: 'classics',
      },
    ],
    description: 'Stylish and comfortable skateboarding clothing.',
  },
  {
    title: 'accessories',
    image: '/images/backpack-one.webp',
    icon: Icons.billing,
    description: 'The essential skateboarding accessories to keep you rolling.',
    subcategories: [
      {
        title: 'Skate Tools',
        description: 'Essential tools for maintaining your skateboard, all rad.',
        slug: 'skate-tools',
      },
      {
        title: 'Bushings',
        description: 'Upgrade your ride with our rad selection of bushings.',
        slug: 'bushings',
      },
      {
        title: 'Shock & Riser Pads',
        description: "Enhance your skateboard's performance with rad shock and riser pads.",
        slug: 'shock-riser-pads',
      },
      {
        title: 'Skate Rails',
        description: 'Add creativity and style to your tricks with our rad skate rails.',
        slug: 'skate-rails',
      },
      {
        title: 'Wax',
        description: 'Keep your board gliding smoothly with our rad skate wax.',
        slug: 'wax',
      },
      {
        title: 'Socks',
        description: 'Keep your feet comfy and stylish with our rad socks.',
        slug: 'socks',
      },
      {
        title: 'Backpacks',
        description: 'Carry your gear in style with our rad backpacks.',
        slug: 'backpacks',
      },
    ],
  },
]

export default async function IndexPage() {
  const githubStars = 4784
  return (
    <Shell className='max-w-6xl'>
      <section className='mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-4 py-20 text-center md:py-32'>
        <div
          className='flex animate-fade-up flex-col space-y-2'
          style={{ animationDelay: '0.10s', animationFillMode: 'both' }}
        >
          <Link href={siteConfig.links.x} target='_blank' rel='noreferrer'>
            <Badge aria-hidden='true' className='rounded-full px-3.5 py-1.5' variant='secondary'>
              Rewritting with Next.js 14, follow along on X for updates
            </Badge>
            <span className='sr-only'>X</span>
          </Link>
          <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
            <Badge aria-hidden='true' className='rounded-full px-3.5 py-1.5' variant='secondary'>
              <Icons.gitHub className='mr-2 size-3.5' aria-hidden='true' />
              {githubStars} stars on GitHub
            </Badge>
            <span className='sr-only'>GitHub</span>
          </Link>
        </div>
        <h1
          className='animate-fade-up text-balance font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl'
          style={{ animationDelay: '0.20s', animationFillMode: 'both' }}
        >
          Find your happy place
        </h1>
        <p
          className='max-w-[42rem] animate-fade-up text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8'
          style={{ animationDelay: '0.30s', animationFillMode: 'both' }}
        >
          Book a VuonVua with inspiring views, hotel-grade amenities, modern workstations, top-tier
          cleaning and 24/7 concierge service
        </p>
        <div
          className='flex animate-fade-up flex-wrap items-center justify-center gap-4'
          style={{ animationDelay: '0.40s', animationFillMode: 'both' }}
        >
          <Button asChild>
            <Link href='/search'>
              Booking now
              <span className='sr-only'>Booking now</span>
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/dashboard/hotels'>
              Create Hotel
              <span className='sr-only'>Create Hotel</span>
            </Link>
          </Button>
        </div>
      </section>
      <section className='grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {productCategories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </section>
      <ContentSection
        title='Featured products'
        description='Explore products from around the world'
        href='/products'
        linkText='View all products'
        className='pt-8 md:pt-10 lg:pt-12'
      >
        Hi
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </ContentSection>
      <ContentSection
        title='Featured stores'
        description='Explore stores from around the world'
        href='/stores'
        linkText='View all stores'
        className='py-8 md:py-10 lg:py-12'
      >
        Hello
        {/* {stores.map((store) => (
          <StoreCard key={store.id} store={store} href={`/products?store_ids=${store.id}`} />
        ))} */}
      </ContentSection>
    </Shell>
  )
}
