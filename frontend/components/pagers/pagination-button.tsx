import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface PaginationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  pageCount: number
  page?: string
  onPageChange: (page: number) => void
  siblingCount?: number
}

export function PaginationButton({
  pageCount,
  page,
  onPageChange,
  siblingCount = 1,
  className,
  ...props
}: PaginationButtonProps) {
  // Memoize pagination range to avoid unnecessary re-renders
  const paginationRange = React.useMemo(() => {
    const delta = siblingCount + 2

    const range = []
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i)
    }

    if (Number(page) - delta > 2) {
      range.unshift('...')
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push('...')
    }

    range.unshift(1)
    if (pageCount !== 1) {
      range.push(pageCount)
    }

    return range
  }, [pageCount, page, siblingCount])

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2', className)} {...props}>
      <Button
        aria-label='Go to first page'
        variant='outline'
        size='icon'
        className='hidden size-8 lg:flex'
        onClick={() => {
          onPageChange(1)
        }}
        disabled={Number(page) === 1}
      >
        <DoubleArrowLeftIcon className='size-4' aria-hidden='true' />
      </Button>
      <Button
        aria-label='Go to previous page'
        variant='outline'
        size='icon'
        className='size-8'
        onClick={() => {
          onPageChange(Number(page) - 1)
        }}
        disabled={Number(page) === 1}
      >
        <ChevronLeftIcon className='size-4' aria-hidden='true' />
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === '...' ? (
          <Button
            aria-label='Page separator'
            key={i}
            variant='outline'
            size='icon'
            className='size-8'
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            key={i}
            variant={Number(page) === pageNumber ? 'default' : 'outline'}
            size='icon'
            className='size-8'
            onClick={() => {
              onPageChange(Number(pageNumber))
            }}
          >
            {pageNumber}
          </Button>
        )
      )}
      <Button
        aria-label='Go to next page'
        variant='outline'
        size='icon'
        className='size-8'
        onClick={() => {
          onPageChange(Number(page) + 1)
        }}
        disabled={Number(page) === (pageCount ?? 10)}
      >
        <ChevronRightIcon className='size-4' aria-hidden='true' />
      </Button>
      <Button
        aria-label='Go to last page'
        variant='outline'
        size='icon'
        className='hidden size-8 lg:flex'
        onClick={() => {
          onPageChange(Number(pageCount))
        }}
        disabled={Number(page) === (pageCount ?? 10)}
      >
        <DoubleArrowRightIcon className='size-4' aria-hidden='true' />
      </Button>
    </div>
  )
}
