import * as React from 'react'
import Link from 'next/link'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/collections/${category.slug}`}>
      <Card className='relative flex size-full flex-col bg-muted p-4 transition-colors hover:bg-muted/50'>
        <category.icon className='size-10 text-muted-foreground' aria-hidden='true' />
        <div className='flex flex-1 flex-col space-y-1.5 pb-4 pt-10'>
          <CardTitle className='capitalize'>{category.name}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </div>
        <React.Suspense
          fallback={
            <div className='pt-1'>
              <Skeleton className='h-4 w-20' />
            </div>
          }
        >
          <CardDescription>322 products</CardDescription>
        </React.Suspense>
      </Card>
    </Link>
  )
}
