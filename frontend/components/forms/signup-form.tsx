'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { RegisterFormData, authSchema } from '@/lib/validations/auth'
import { toast } from '@/components/ui/use-toast'
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
import { PasswordInput } from '@/components/password-input'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUserApi } from '@/api/auth'
import { QueryKeys } from '@/config/query-key'

type FormData = z.infer<typeof authSchema>

export function SignUpForm() {
  const queryClient = useQueryClient()
  const router = useRouter()

  // tanstack query
  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterFormData) => registerUserApi(data),
    onSuccess: async () => {
      toast({
        title: 'Sucessfully registered!',
        description: 'Please check your email to verify your account.',
      })
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
      router.push('/')
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.name || 'Error',
        description: error.response.data.message || 'Something wrong happened',
      })
    },
  })

  // react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(authSchema),
  })

  async function onSubmit(registerData: FormData) {
    mutate(registerData)
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='nammdev@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between w-full'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Nam' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Nguyen' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />}
          Create Account
          <span className='sr-only'>Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}
