import Link from 'next/link'

import { marketingConfig } from '@/config/marketing'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MainNav } from '@/components/layouts/main-nav'

export function SiteHeader() {
  return (
    <header className='container z-40 bg-background'>
      <div className='flex h-20 items-center justify-between py-6'>
        <MainNav items={marketingConfig.mainNav} />
        <nav>
          <Link
            href='/signin'
            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
