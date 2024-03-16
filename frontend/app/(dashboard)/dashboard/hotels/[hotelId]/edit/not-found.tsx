import { ErrorCard } from '@/components/cards/error-card'
import { Shell } from '@/components/shells'

export default function HotelNotFound() {
  return (
    <Shell variant='centered' className='max-w-md'>
      <ErrorCard
        title='Hotel not found'
        description='The hotel may have expired or you may have already updated your hotel'
        retryLink={`/dashboard/hotels`}
        retryLinkText='Go to Hotels Page'
      />
    </Shell>
  )
}
