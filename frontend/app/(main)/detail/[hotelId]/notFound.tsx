import { ErrorCard } from '@/components/cards/error-card'
import { Shell } from '@/components/shells'

export default function HotelDetailNotFound() {
  return (
    <Shell variant='centered' className='max-w-md'>
      <ErrorCard
        title='Product not found'
        description='The product may have expired or you may have already updated your product'
        retryLink='/'
        retryLinkText='Go to Home'
      />
    </Shell>
  )
}
