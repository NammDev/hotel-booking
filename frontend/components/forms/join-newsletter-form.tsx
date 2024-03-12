'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// import { emailSchema } from '@/lib/validations/notification'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { toast } from '../ui/use-toast'

const emailSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

type Inputs = z.infer<typeof emailSchema>

export function JoinNewsletterForm() {
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      const response = await fetch('/api/email/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          // This token is used as a search param in the email preferences page to identify the subscriber.
          token: crypto.randomUUID(),
          subject: 'Welcome to Skateshop13',
        }),
      })

      if (!response.ok) {
        switch (response.status) {
          case 409:
            toast({
              description: 'You are already subscribed to our newsletter.',
              variant: 'destructive',
            })
            break
          case 422:
            toast({
              description: 'Invalid input.',
              variant: 'destructive',
            })
            break
          case 429:
            toast({
              description: 'The daily email limit has been reached.',
              variant: 'destructive',
            })
            break
          case 500:
            toast({
              description: 'Something went wrong. Please try again later.',
              variant: 'destructive',
            })

            break
          default:
            toast({
              description: 'Something went wrong. Please try again later.',
              variant: 'destructive',
            })
        }
        return
      }

      toast({
        description: 'You have been subscribed to our newsletter.',
      })
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form className='grid w-full' onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative space-y-0'>
              <FormLabel className='sr-only'>Email</FormLabel>
              <FormControl>
                <Input placeholder='nammdev@gmail.com' className='pr-12' {...field} />
              </FormControl>
              <FormMessage />
              <Button
                className='absolute right-[3.5px] top-[4px] z-20 size-7'
                size='icon'
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.spinner className='size-3 animate-spin' aria-hidden='true' />
                ) : (
                  <PaperPlaneIcon className='size-3' aria-hidden='true' />
                )}
                <span className='sr-only'>Join newsletter</span>
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
