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
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Icons } from '@/components/icons'
import { toast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { addHotel } from '@/api/hotel'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'

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

export default function EditHotelForm() {
  return (
    <Form>
      <form className='grid w-full max-w-xl gap-5'>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='name'>
              Name
            </Label>
            <Input id='name' placeholder='Enter the name of the hotel' required />
          </div>
          <div className='grid gap-2'>
            <div className='grid gap-2 md:flex md:items-center md:gap-4'>
              <div className='grid gap-2'>
                <Label className='text-base' htmlFor='city'>
                  City
                </Label>
                <Input id='city' placeholder='City' />
              </div>
              <div className='grid gap-2'>
                <Label className='text-base' htmlFor='country'>
                  Country
                </Label>
                <Input id='country' placeholder='Country' />
              </div>
            </div>
          </div>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='description'>
              Description
            </Label>
            <Textarea
              className='min-h-[100px]'
              id='description'
              placeholder='Enter a description'
            />
          </div>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='price'>
              Price per night ($)
            </Label>
            <Input id='price' placeholder='Price' type='number' />
          </div>
          <div className='grid gap-2'>
            <Label className='text-base'>Star rating</Label>
            <RadioGroup className='flex items-center gap-2' defaultValue='4' id='stars'>
              <Label
                className='border cursor-pointer rounded-lg p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='stars-5'
              >
                <RadioGroupItem id='stars-5' value='5' />5 stars
              </Label>
              <Label
                className='border cursor-pointer rounded-lg p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='stars-4'
              >
                <RadioGroupItem id='stars-4' value='4' />4 stars
              </Label>
              <Label
                className='border cursor-pointer rounded-lg p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='stars-3'
              >
                <RadioGroupItem id='stars-3' value='3' />3 stars
              </Label>
              <Label
                className='border cursor-pointer rounded-lg p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='stars-2'
              >
                <RadioGroupItem id='stars-2' value='2' />2 stars
              </Label>
              <Label
                className='border cursor-pointer rounded-lg p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='stars-1'
              >
                <RadioGroupItem id='stars-1' value='1' />1 star
              </Label>
            </RadioGroup>
          </div>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='type'>
              Type
            </Label>
            <Select>
              <SelectTrigger className='w-72'>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent className='w-72'>
                <SelectItem value='hotel'>Hotel</SelectItem>
                <SelectItem value='resort'>Resort</SelectItem>
                <SelectItem value='inn'>Inn</SelectItem>
                <SelectItem value='motel'>Motel</SelectItem>
                <SelectItem value='hostel'>Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label className='text-base'>Facilities</Label>
            <div className='flex flex-wrap gap-2 w-full max-w-md'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='parking' />
                <label
                  htmlFor='parking'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Parking
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='wifi' />
                <label
                  htmlFor='wifi'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Wifi
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='gym' />
                <label
                  htmlFor='gym'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Gym
                </label>
              </div>
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='grid gap-2 md:flex md:items-center md:gap-4'>
              <div className='grid gap-2'>
                <Label className='text-base' htmlFor='adults'>
                  Adults
                </Label>
                <Input defaultValue='1' id='adults' min='1' type='number' />
              </div>
              <div className='grid gap-2'>
                <Label className='text-base' htmlFor='children'>
                  Children
                </Label>
                <Input defaultValue='0' id='children' min='0' type='number' />
              </div>
            </div>
          </div>
          <div className='grid gap-2'>
            <Label className='text-base'>Images</Label>
            <div className='flex items-center gap-4'>
              <Image
                alt='Image thumbnail'
                className='rounded-lg object-cover'
                height='96'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '96/96',
                  objectFit: 'cover',
                }}
                width='96'
              />
              <Image
                alt='Image thumbnail'
                className='rounded-lg object-cover'
                height='96'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '96/96',
                  objectFit: 'cover',
                }}
                width='96'
              />
              <Image
                alt='Image thumbnail'
                className='rounded-lg object-cover'
                height='96'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '96/96',
                  objectFit: 'cover',
                }}
                width='96'
              />
            </div>
            <div className='mt-2'>
              <Input accept='image/*' className='!hidden' id='file' multiple type='file' />
              <Label
                className='border-dashed border-2 border-gray-300 rounded-lg cursor-pointer flex w-max items-center gap-2 p-3 text-sm dark:border-gray-700 [&:hover]:bg-gray-100 dark:[&:hover]:bg-gray-800'
                htmlFor='file'
              >
                <Icons.UploadIcon className='w-4 h-4' />
                Add images
              </Label>
              <p className='text-xs text-gray-500 dark:text-gray-400'>JPEG or PNG up to 10MB</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:items-center md:gap-4'>
          <Button size='lg'>Create Hotel</Button>
        </div>
      </form>
    </Form>
  )
}
