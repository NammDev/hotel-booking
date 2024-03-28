import { useForm } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Icons } from '../my-ui/icons'
import { Calendar } from '../ui/calendar'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { useSearchContext } from '@/context/SearchContext'
import NcInputNumber from '../my-ui/nc-input-number'

type Props = {
  hotelId: string
  pricePerNight: number
}

type GuestInfoFormData = {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext()

  //   const { isLoggedIn } = useAppContext()

  const defaultSelected: DateRange = {
    from: search.checkIn || new Date(),
    to: search.checkOut || addDays(new Date(), 1),
  }
  const [date, setDate] = useState<DateRange | undefined>(defaultSelected)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount)
    // navigate('/sign-in', { state: { from: location } })
  }

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount)
    // navigate(`/hotel/${hotelId}/booking`)
  }

  return (
    <>
      {/* PRICE */}
      <div className='flex justify-between'>
        <span className='text-3xl font-semibold'>
          ${pricePerNight}
          <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
            /night
          </span>
        </span>
        {/* <StartRating /> */}
      </div>

      {/* FORM */}
      <form className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl '>
        <Popover>
          <PopoverTrigger className='flex-1 flex relative p-3 items-center space-x-3 focus:outline-none '>
            <div className='text-neutral-300 dark:text-neutral-400'>
              <Icons.calendar className='w-5 h-5 lg:w-7 lg:h-7' />
            </div>
            <div className='flex-grow text-left'>
              <span className='block font-semibold xl:text-lg'>
                {defaultSelected.from?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                }) || 'Add dates'}
                {defaultSelected.to
                  ? ' - ' +
                    defaultSelected.to?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                    })
                  : ''}
              </span>
              <span className='block mt-1 text-sm font-light leading-none text-neutral-400'>
                {'Check in - Check out'}
              </span>
            </div>
            {defaultSelected.from && (
              <Icons.close2
                className='absolute z-10 w-5 h-5 lg:w-6 lg:h-6 text-sm bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2'
                // onClick={() => setDate(['', ''])}
              />
            )}
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0 mt-2' align='center'>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
        {/* <StayDatesRangeInput className='flex-1 z-[11]' /> */}
        <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
        <Popover>
          <PopoverTrigger className='relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none'>
            <div className='text-neutral-300 dark:text-neutral-400'>
              <Icons.userPlus className='w-5 h-5 lg:w-7 lg:h-7' />
            </div>
            <div className='flex-grow'>
              <span className='block font-semibold xl:text-lg'>{adultCount || ''} Guests</span>
              <span className='block mt-1 text-sm font-light leading-none text-neutral-400'>
                {adultCount ? 'Guests' : 'Add guests'}
              </span>
            </div>

            {/* {!!totalGuests && open && (
              <ClearDataButton
                onClick={() => {
                  setGuestAdultsInputValue(0)
                  setGuestChildrenInputValue(0)
                  setGuestInfantsInputValue(0)
                }}
              />
            )} */}
          </PopoverTrigger>
          <PopoverContent className='w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5'>
            <NcInputNumber
              className='w-full'
              // defaultValue={guestAdultsInputValue}
              // onChange={(value) => handleChangeData(value, 'guestAdults')}
              max={10}
              min={1}
              label='Adults'
              desc='Ages 13 or above'
            />
            <NcInputNumber
              className='w-full mt-6'
              // defaultValue={guestChildrenInputValue}
              // onChange={(value) => handleChangeData(value, 'guestChildren')}
              max={4}
              label='Children'
              desc='Ages 2–12'
            />

            <NcInputNumber
              className='w-full mt-6'
              // defaultValue={guestInfantsInputValue}
              // onChange={(value) => handleChangeData(value, 'guestInfants')}
              max={4}
              label='Infants'
              desc='Ages 0–2'
            />
          </PopoverContent>
        </Popover>
      </form>

      {/* SUM */}
      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
          <span>${pricePerNight} x 3 night</span>
          <span>$357</span>
        </div>
        <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
          <span>Service charge</span>
          <span>$0</span>
        </div>
        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
        <div className='flex justify-between font-semibold'>
          <span>Total</span>
          <span>$199</span>
        </div>
      </div>

      {/* SUBMIT */}
      {/* <ButtonPrimary href={'/checkout'}>Reserve</ButtonPrimary> */}
    </>
  )
}

export default GuestInfoForm
