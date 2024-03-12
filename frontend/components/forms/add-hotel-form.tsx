'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Icons } from '@/components/icons'
import { toast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { addHotel } from '@/api/hotel'
import Image from 'next/image'
import { Zoom } from '../zoom-image'
import { FileDialog } from './file-dialog'
import { useState } from 'react'
import { FileWithPreview } from '@/types'
import { addHotelSchema } from '@/lib/validations/hotel'

// mock data
const products = {
  category: {
    enumValues: {
      hotel: 'hotel',
      motel: 'motel',
      resort: 'resort',
      inn: 'inn',
      guesthouse: 'guesthouse',
      bedAndBreakfast: 'bed and breakfast',
      hostel: 'hostel',
      apartment: 'apartment',
      vacationRental: 'vacation rental',
    },
  },
}

const subcategories = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'motel', label: 'Motel' },
  { value: 'resort', label: 'Resort' },
  { value: 'inn', label: 'Inn' },
  { value: 'guesthouse', label: 'Guesthouse' },
  { value: 'bedAndBreakfast', label: 'Bed and Breakfast' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'vacationRental', label: 'Vacation Rental' },
]
type Inputs = z.infer<typeof addHotelSchema>

export default function AddHotelForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)

  const isUploading = false

  // tanstack query
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Inputs) => addHotel({ ...data, userId }),
    onSuccess: async () => {
      form.reset()
      toast({ description: 'Hotel add successfully!' })
      // router.push('/dashboard/hotels')
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
  const form = useForm<Inputs>({
    resolver: zodResolver(addHotelSchema),
  })

  async function onSubmit(data: Inputs) {
    try {
      // mutate(data)
      console.log(data)
      form.reset()
      setFiles(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form {...form}>
      <form className='grid w-full max-w-xl gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='name'
          control={form.control}
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
          name='description'
          control={form.control}
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

        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            name='country'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder='Country!' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='city'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='Your City' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            name='pricePerNight'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price Per Night</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='numeric'
                    placeholder='$ Price!'
                    value={Number.isNaN(field.value) ? '' : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='starRating'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Star Rating</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='numeric'
                    placeholder='Star Rating'
                    value={Number.isNaN(field.value) ? '' : field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger className='capitalize'>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(products.category.enumValues).map((option) => (
                        <SelectItem key={option} value={option} className='capitalize'>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='subcategory'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Subcategory</FormLabel>
                <Select value={field.value?.toString()} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a subcategory' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {subcategories.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem className='flex w-full flex-col gap-1.5'>
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className='flex items-center gap-2'>
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className='size-20 shrink-0 rounded-md object-cover object-center'
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name='images'
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage message={form.formState.errors.images?.message} />
        </FormItem>

        <Button className='w-fit' disabled={isPending}>
          {isPending && <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />}
          Add Hotel
          <span className='sr-only'>Add Hotel</span>
        </Button>
      </form>
    </Form>
  )
}
