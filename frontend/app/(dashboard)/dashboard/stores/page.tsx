'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { RocketIcon } from '@radix-ui/react-icons'
// import { env } from '@/env.js'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
// import { getCacheduser } from '@/lib/actions/auth'
// import { getUserStores } from '@/lib/fetchers/store'
// import { getSubscriptionPlan } from '@/lib/fetchers/stripe'
// import { getDashboardRedirectPath, getPlanFeatures } from '@/lib/subscription'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { StoreCardSkeleton } from '@/components/skeletons/store-card-skeleton'
import { useProfile } from '@/hooks/use-profile'
// import { StoreCard } from '@/components/cards/store-card'

export default function StoresPage() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: user, isError } = useProfile()

  useEffect(() => {
    if (isError) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isError, pathname, router])
  //   const userStoresPromise = getUserStores({ userId: user.id })

  //   const subscriptionPlanPromise = getSubscriptionPlan({ userId: user.id })

  //   const [allStores, subscriptionPlan] = await Promise.all([
  //     userStoresPromise,
  //     subscriptionPlanPromise,
  //   ])

  //   const { maxStoreCount, maxProductCount } = getPlanFeatures(subscriptionPlan?.id)

  return (
    <Shell variant='sidebar'>
      <PageHeader>
        <div className='flex space-x-4'>
          <PageHeaderHeading size='sm' className='flex-1'>
            Hotels
          </PageHeaderHeading>
          <Link
            aria-label='Create store'
            href={'/dashboard/stores/new'}
            className={cn(
              buttonVariants({
                size: 'sm',
              })
            )}
          >
            Create Hotel
          </Link>
        </div>
        <PageHeaderDescription size='sm'>Manage your hotels</PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className='size-4' aria-hidden='true' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          {/* You are currently on the <span className='font-semibold'>{subscriptionPlan?.name}</span>{' '}
          plan. You can create up to <span className='font-semibold'>{maxStoreCount}</span> stores
          and <span className='font-semibold'>{maxProductCount}</span> products on this plan.  */}
          You are currently on the <span className='font-semibold'>Ollie</span> plan. You can create
          up to <span className='font-semibold'>1</span> hotels and{' '}
          <span className='font-semibold'>20</span> products on this plan.
        </AlertDescription>
      </Alert>
      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        >
          <StoreCardSkeleton />
          <StoreCardSkeleton />
          <StoreCardSkeleton />
          {/* {allStores.map((store) => (
            <StoreCard key={store.id} store={store} href={`/dashboard/stores/${store.id}`} />
          ))} */}
        </Suspense>
      </section>
    </Shell>
  )
}
