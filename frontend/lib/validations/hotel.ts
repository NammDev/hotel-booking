import * as z from 'zod'

import { slugify } from '@/lib/utils'

export const addHotelSchema = z
  .object({
    name: z.string().min(3).max(50),
    slug: z.string().optional(),
    city: z.string().min(3).max(50),
    country: z.string().min(3).max(50),
    description: z.string().optional(),
    type: z.string().min(3).max(50),
    pricePerNight: z.number().positive(),
    starRating: z.number().min(1).max(5),
    facilities: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    imageFiles: z
      .unknown()
      .refine((val) => {
        if (!Array.isArray(val)) return false
        if (val.some((file) => !(file instanceof File))) return false
        return true
      }, 'Must be an array of File')
      .optional()
      .nullable()
      .default(null),
    adultCount: z.number().positive(),
    childCount: z.number().positive(),
    // imageUrls: z.array(z.string()), this is for edit hotel
  })
  .refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.name)
    }
    return true
  })
