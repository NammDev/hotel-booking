'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

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
import { Textarea } from '@/components/ui/textarea'
import { Icons } from '@/components/icons'
import { toast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { addHotel } from '@/api/hotel'

export const hotelSchema = z
  .object({
    name: z.string().min(3).max(50),
    description: z.string().optional(),
    slug: z.string().optional(),
  })
  .refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.name)
    }
    return true
  })

type Inputs = z.infer<typeof hotelSchema>

export function AddHotelForm({ userId }: { userId: string }) {
  const router = useRouter()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  // tanstack query
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Inputs) => addHotel({ ...data, userId }),
    onSuccess: async () => {
      form.reset()
      toast({ description: 'hotel added successfully!' })
      router.push('/dashboard/hotels')
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.name,
        description: error.response.data.message,
      })
    },
  })

  async function onSubmit(data: Inputs) {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form className='grid w-full max-w-xl gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Type hotel name here.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Type hotel description here.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-fit' disabled={isPending}>
          {isPending && <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />}
          Add Hotel
          <span className='sr-only'>Add Hotel</span>
        </Button>
      </form>
    </Form>
  )
}
