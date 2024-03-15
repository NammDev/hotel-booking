import Link from 'next/link'
import MarketingLayout from './(main)/layout'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/my-ui/icons'

export default function Component() {
  return (
    <MarketingLayout>
      <div className='flex flex-col min-h-[100vh]'>
        <header className='flex-1 flex items-center justify-center flex-col text-center py-8'>
          <div className='space-y-3'>
            <Link className='flex items-center justify-center' href='#'>
              <Icons.sun className='h-8 w-8 mr-2' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Oops, something went wrong!
              </h1>
              <p className='text-gray-500 dark:text-gray-400'>
                We cannot find the page you are looking for.
              </p>
            </div>
            <form className='flex items-center justify-center space-x-2'>
              <Link
                href='/'
                className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'px-4')}
              >
                Go Back to Homepage
              </Link>
            </form>
          </div>
        </header>
      </div>
    </MarketingLayout>
  )
}
