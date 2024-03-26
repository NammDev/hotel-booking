'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckIcon, EyeOpenIcon, PlusIcon } from '@radix-ui/react-icons'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HotelType } from '@/lib/type'
import { cn, formatPrice, toTitleCase } from '@/lib/utils'
import { Icons } from '../my-ui/icons'
import { PlaceholderImage } from '../my-ui/placeholder'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hotel: HotelType
  variant?: 'default' | 'switchable' | 'wander'
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function ProductCard({
  hotel,
  variant = 'default',
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isAddingToCart, startAddingToCart] = React.useTransition()

  return (
    <Card className={cn('size-full overflow-hidden rounded-sm', className)} {...props}>
      <Link aria-label={hotel.name} href={`/hotel/${hotel._id}`}>
        <CardHeader className='p-0'>
          <AspectRatio ratio={7 / 6}>
            {hotel.imageUrls?.length ? (
              <Image
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className='object-cover rounded-sm'
                sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
                fill
                loading='lazy'
              />
            ) : (
              <PlaceholderImage className='rounded-none' asChild />
            )}
          </AspectRatio>
        </CardHeader>
        <span className='sr-only'>{hotel.name}</span>
      </Link>
      <Link href={`/hotel/${hotel._id}`} tabIndex={-1}>
        <CardContent className='space-y-1.5 p-4'>
          <CardTitle className='line-clamp-1'>{hotel.name}</CardTitle>
          <CardDescription className='line-clamp-1'>
            Price Per Night: {formatPrice(hotel.pricePerNight)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className='p-4 pt-1'>
        {variant === 'default' ? (
          <div className='flex w-full items-center space-x-2'>
            <Button aria-label='Add to cart' size='sm' className='h-8 w-full rounded-sm'>
              {isAddingToCart && (
                <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />
              )}
              Add to cart
            </Button>
            <Link
              href={`/preview/product/${hotel._id}`}
              title='Preview'
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'icon',
                  className: 'h-8 w-8 shrink-0',
                })
              )}
            >
              <EyeOpenIcon className='size-4' aria-hidden='true' />
              <span className='sr-only'>Preview</span>
            </Link>
          </div>
        ) : variant === 'wander' ? (
          <div className='flex h-full flex-col group-[.is]/marker:px-3 group-[.is]/marker:pb-3'>
            <div className='text-property-eyebrow text-white/60'>
              {hotel.city}, {hotel.country}
            </div>
            <div className='mb-0.5 flex items-end gap-2 font-medium'>{toTitleCase(hotel.type)}</div>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? 'Remove from cart' : 'Add to cart'}
            size='sm'
            className='h-8 w-full rounded-sm'
            onClick={() => {
              startAddingToCart(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />
            ) : isAddedToCart ? (
              <CheckIcon className='mr-2 size-4' aria-hidden='true' />
            ) : (
              <PlusIcon className='mr-2 size-4' aria-hidden='true' />
            )}
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
