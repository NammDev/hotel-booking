import Link from 'next/link'

import { SignUpForm } from '@/components/forms/signup-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Shell } from '@/components/shells/shell'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function RegisterPage() {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2'>
      <AspectRatio ratio={16 / 9}>
        <Image
          src='/images/auth-layout.webp'
          alt='A skateboarder doing a high drop'
          fill
          className='absolute inset-0 object-cover'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40' />
        <Link
          href='/'
          className='absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight'
        >
          <Icons.logo className='mr-2 size-6' aria-hidden='true' />
          <span>HuongSen</span>
        </Link>
      </AspectRatio>
      <main className='container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1'>
        <Shell className='max-w-lg'>
          <Card>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>Sign up</CardTitle>
              <CardDescription>Choose your preferred sign up method</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              {/* <OAuthSignIn /> */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
                </div>
              </div>
              <SignUpForm />
            </CardContent>
            <CardFooter>
              <div className='text-sm text-muted-foreground'>
                Already have an account?{' '}
                <Link
                  aria-label='Sign in'
                  href='/login'
                  className='text-primary underline-offset-4 transition-colors hover:underline'
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </Shell>
      </main>
    </div>
  )
}
