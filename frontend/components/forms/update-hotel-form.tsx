'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import type { FileWithPreview } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { HotelType } from '@/lib/type'
import { useEffect, useState } from 'react'
import { updateHotelSchema } from '@/lib/validations/hotel'
import { useMounted } from '@/hooks/use-mounted'
import { Checkbox } from '../ui/checkbox'
import { FileDialog } from './file-dialog'
import { Zoom } from '../zoom-image'
import { Icons } from '../my-ui/icons'
import { deleteMyHotelById, updateHotel } from '@/api/hotel'
import { useMutation } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import Link from 'next/link'
import UpdateProductLoading from '@/app/(dashboard)/dashboard/hotels/[hotelId]/edit/loading'

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

const facilities = [
  {
    id: 'freeWifi',
    label: 'Free WiFi',
  },
  {
    id: 'parking',
    label: 'Parking',
  },
  {
    id: 'pool',
    label: 'Pool',
  },
  {
    id: 'gym',
    label: 'Gym',
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
  },
  {
    id: 'spa',
    label: 'Spa',
  },
  {
    id: 'roomService',
    label: 'Room Service',
  },
  {
    id: 'bar',
    label: 'Bar',
  },
  {
    id: 'laundry',
    label: 'Laundry',
  },
  {
    id: 'fitnessCenter',
    label: 'Fitness Center',
  },
  {
    id: 'conferenceRoom',
    label: 'Conference',
  },
  {
    id: 'facility1',
    label: 'Facility 1',
  },
  {
    id: 'facility2',
    label: 'Facility 2',
  },
  {
    id: 'facility3',
    label: 'Facility 3',
  },
  {
    id: 'facility4',
    label: 'Facility 4',
  },
]

type Inputs = z.infer<typeof updateHotelSchema>

export function UpdateHotelForm({ hotel }: { hotel: HotelType }) {
  const hotelId = useParams().hotelId as string
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const mounted = useMounted()
  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateHotelSchema),
  })

  useEffect(() => {
    form.reset(hotel)
  }, [form, hotel])

  useEffect(() => {
    const fetchImage = async (imageUrl: string) => {
      try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], imageUrl, { type: 'image/jpeg' })
        const fileWithPreview = Object.assign(file, {
          preview: imageUrl,
        })
        return fileWithPreview
      } catch (error) {
        console.error('Error fetching image:', error)
        return null
      }
    }

    const convertImageUrlsToFiles = async () => {
      if (hotel.imageUrls && hotel.imageUrls.length > 0) {
        const filesPromises = hotel.imageUrls.map((imageUrl) => fetchImage(imageUrl))
        const files = await Promise.all(filesPromises)
        setFiles(files.filter((file): file is FileWithPreview => file !== null))
      }
    }

    convertImageUrlsToFiles()
  }, [hotel])

  // tanstack query
  const updateHotelMutation = useMutation({
    mutationFn: (data: Inputs) => updateHotel(data, hotelId),
    onSuccess: async () => {
      setFiles(null)
      form.reset()
      toast({ description: 'Hotel update successfully!' })
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

  const deleteHotelMutation = useMutation({
    mutationFn: (hotelId: string) => deleteMyHotelById(hotelId),
    onSuccess: async () => {
      setFiles(null)
      form.reset()
      toast({ description: 'Hotel delete successfully!' })
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

  const onSubmit = async (data: Inputs) => {
    try {
      updateHotelMutation.mutate(data)
    } catch (err) {
      console.log(err)
    }
  }

  const ondelete = async () => {
    try {
      console.log('delete')
      deleteHotelMutation.mutate(hotel._id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {mounted ? (
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
                        name='pricePerNight'
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
                        name='starRating'
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
                name='type'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Type</FormLabel>
                    <Select
                      name='type'
                      value={field.value}
                      onValueChange={(value: typeof field.value) => field.onChange(value)}
                    >
                      <FormControl>
                        <SelectTrigger className='capitalize'>
                          <SelectValue placeholder='Please choose a Type of your hotel' />
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
                    <FormDescription>
                      You can manage email addresses in your{' '}
                      <Link href='/examples/forms'>email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
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
        /> */}
            </div>

            <div className='flex flex-col items-start gap-6 sm:flex-row'>
              <FormField
                control={form.control}
                name='facilities'
                render={() => (
                  <FormItem className='w-full mb-4'>
                    <div className='mb-4'>
                      <FormLabel className='text-base'>Facilities</FormLabel>
                      <FormDescription>
                        Select the facility you want to add to your hotel.
                      </FormDescription>
                    </div>
                    <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                      {facilities.map((facility) => (
                        <FormField
                          key={facility.id}
                          control={form.control}
                          name='facilities'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={facility.id}
                                className='flex flex-row items-start space-x-3 space-y-0 col-span-1'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(facility.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, facility.id])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== facility.id)
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='text-sm font-normal hover:cursor-pointer'>
                                  {facility.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col items-start gap-6 sm:flex-row '>
              <FormField
                name='adultCount'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Adults</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        inputMode='numeric'
                        name='adultCount'
                        min={1}
                        placeholder='Adults Count'
                        value={Number.isNaN(field.value) ? '' : field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='childCount'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Childrens</FormLabel>
                    <FormControl>
                      <Input
                        min={0}
                        type='number'
                        inputMode='numeric'
                        name='childCount'
                        placeholder='Childrens Count'
                        value={Number.isNaN(field.value) ? '' : field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
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
                  name='imageFiles'
                  maxFiles={6}
                  maxSize={1024 * 1024 * 4}
                  files={files}
                  setFiles={setFiles}
                  disabled={updateHotelMutation.isPending}
                />
              </FormControl>
              <UncontrolledFormMessage message={form.formState.errors.imageFiles?.message} />
            </FormItem>

            <div className='flex space-x-2'>
              <Button disabled={updateHotelMutation.isPending || deleteHotelMutation.isPending}>
                {updateHotelMutation.isPending && (
                  <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />
                )}
                Update Hotel
                <span className='sr-only'>Update hotel</span>
              </Button>
              <Button
                variant='destructive'
                onClick={ondelete}
                disabled={deleteHotelMutation.isPending}
              >
                {deleteHotelMutation.isPending && (
                  <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />
                )}
                Delete Hotels
                <span className='sr-only'>Delete hotels</span>
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <UpdateProductLoading />
      )}
    </>
  )
}
