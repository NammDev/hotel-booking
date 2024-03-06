import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SignUpForm } from '@/components/forms/signup-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function RegisterPage() {
  return (
    <div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/login'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div
        style={{
          backgroundImage: 'url(./auth-layout.webp)',
        }}
        className='bg-cover hidden h-full lg:block bg-gradient-to-t from-background to-background/60 md:to-background/40'
      />
      <div className='grid items-center gap-8 pb-8 pt-6 md:py-8 container max-w-lg'>
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
      </div>
    </div>
  )
}
