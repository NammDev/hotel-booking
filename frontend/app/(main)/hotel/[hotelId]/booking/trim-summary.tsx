import { Icons } from '@/components/my-ui/icons'
import { Button } from '@/components/ui/button'
import { HotelType } from '@/lib/type'

type Props = {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  hotel: HotelType
}

export default function TripSummary({ checkIn, checkOut, adultCount, childCount, hotel }: Props) {
  return (
    <>
      <div>
        <h3 className='text-[0.625rem] tracking-[0.075rem] leading-[1.125rem] font-medium'>
          TRIP SUMMARY
        </h3>
        <h2 className='mt-2 font-heading text-[2.5rem] leading-[3rem] tracking-[-0.075rem] font-medium'>
          {hotel.name}
        </h2>
        <div className='flex items-center gap-1 text-sm'>
          <Icons.eye className='w-4 h-4' />
          <span>146 views in the last 24 hours</span>
        </div>
      </div>
      <div>
        <div className='mb-3 flex items-center justify-between sm:gap-11'>
          <div>
            <h4 className='font-medium'>Date</h4>
            <p className='mt-1 flex items-center gap-1'>
              {checkIn?.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              })}{' '}
              to{' '}
              {checkOut?.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              })}
              ,<span className='block'>check-in at 2:00pm</span>
            </p>
          </div>
          <Button disabled>Edit dates</Button>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-medium'>Guests</h4>
            <p className='h-6'>
              {adultCount ? `${adultCount} Adults - ${childCount} Childrens` : 'Add guests'}
            </p>
          </div>
          <Button disabled>Edit guests</Button>
        </div>
      </div>
      <div className='w-full border-b border-[#404040]' />
    </>
  )
}
