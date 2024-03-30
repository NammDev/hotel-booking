import { Icons } from '@/components/my-ui/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HotelType, PaymentIntentResponse } from '@/lib/type'

interface CostBreakDownType {
  hotel: HotelType
  numberOfNights: number
  paymentIntent: PaymentIntentResponse
}

export default function CostBreakDown({ hotel, numberOfNights, paymentIntent }: CostBreakDownType) {
  return (
    <div className='sticky top-24 order-1 h-fit lg:order-2'>
      <div className='rounded-lg lg:px-5 lg:py-4 bg-muted p-4 transition-colors hover:bg-muted/50'>
        <h4 className='mb-4 text-lg font-medium'>Cost breakdown</h4>
        <div className='text-w-4004'>
          <div className='mb-2 flex justify-between tracking-wider'>
            <div>
              ${hotel.pricePerNight} x {numberOfNights} nights
            </div>
            <div className='font-medium'>${hotel.pricePerNight * numberOfNights}</div>
          </div>
          <div className='mb-2 flex justify-between tracking-wider'>
            <div>Taxes and fees</div>
            <div className='font-medium'>$0</div>
          </div>
          <div className='mb-2'>
            <div className='flex justify-between'>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger> All of this included</AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      <li className='flex items-center'>
                        <div className='mr-2 text-w-4004'>
                          <Icons.sun className='w-6 h-6' />
                        </div>
                        <div className='text-w-4004'>Smart home with views</div>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className='mb-2 flex justify-between font-medium tracking-normal text-6-white text-lg'>
          <div>Total</div>
          <div className='font-medium'> ${paymentIntent.totalCost}</div>
        </div>
      </div>
      <div
        className='mt-6 flex h-[240px] w-full flex-col justify-end rounded-lg text-sm tracking-wide'
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%) 0% 0% / 100%, url("${hotel.imageUrls[0]}") no-repeat center`,
        }}
      >
        <div className='space-y-3 overflow-hidden px-4 pb-[14px] text-xs text-white'>
          <div>★★★★★</div>
          <div className='line-clamp-3' />
          <div className='flex items-center'>
            <div>Kevin Malloy</div>
          </div>
        </div>
      </div>
    </div>
  )
}
