'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { LoginFormData, userAuthSchema } from '@/lib/validations/auth'
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
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUserApi } from '@/api/auth'
import { QueryKeys } from '@/config/query-key'

export function SignInForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  // tanstack query
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => loginUserApi(data),
    onSuccess: async () => {
      toast({
        title: 'Login successful 🎉',
        description: 'Welcome back!',
      })
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
      router.push(searchParams?.get('callbackUrl') || '/')
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.name,
        description: error.response.data.message,
      })
    },
  })

  // react-hook-form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(loginData: LoginFormData) {
    mutate(loginData)
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
                <Input type='text' placeholder='rodneymullen180@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type='submit' disabled={isPending}>
          {isPending && <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />}
          Sign in
          <span className='sr-only'>Sign in</span>
        </Button>
      </form>
    </Form>
  )
}
