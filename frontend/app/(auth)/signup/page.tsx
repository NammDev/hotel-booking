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
import { Shell } from '@/components/shells/shell'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function RegisterPage() {
  return (
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
              href='/signin'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
