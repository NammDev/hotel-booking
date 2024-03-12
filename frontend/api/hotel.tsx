import { hotelSchema } from '@/components/forms/add-hotel-form'
import { z } from 'zod'

export async function addHotel(input: z.infer<typeof hotelSchema> & { userId: string }) {
  // try {
  //   const storeWithSameName = await db.query.stores.findFirst({
  //     where: eq(stores.name, input.name),
  //   })
  //   if (storeWithSameName) {
  //     throw new Error('Store name already taken.')
  //   }
  //   await db.insert(stores).values({
  //     name: input.name,
  //     description: input.description,
  //     userId: input.userId,
  //     slug: slugify(input.name),
  //   })
  //   revalidateTag('user-stores')
  //   return {
  //     data: null,
  //     error: null,
  //   }
  // } catch (err) {
  //   return {
  //     data: null,
  //     error: getErrorMessage(err),
  //   }
  // }
}
