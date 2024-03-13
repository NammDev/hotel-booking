import * as z from 'zod'

import { slugify } from '@/lib/utils'

export const addHotelSchema = z
  .object({
    name: z.string().min(3).max(50),
    slug: z.string().optional(),
    city: z.string().min(3).max(50),
    country: z.string().min(3).max(50),
    description: z.string().optional(),
    // type: z.string().min(3).max(50),
    pricePerNight: z.number().positive(),
    starRating: z.number().min(1).max(5),
    // facilities: z.array(z.string()),
    imageFiles: z.unknown(),
    // imageUrls: z.array(z.string()),
    // adultCount: z.number().positive(),
    // childCount: z.number().positive(),
  })
  .refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.name)
    }
    return true
  })
