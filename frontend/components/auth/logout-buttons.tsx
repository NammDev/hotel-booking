'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Icons } from '@/components/my-ui/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { logoutApi } from '@/api/auth'
import { useMounted } from '@/hooks/use-mounted'
import { QueryKeys } from '@/config/query-key'

export function LogOutButtons() {
  const router = useRouter()
  const mounted = useMounted()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: async () => {
      toast({
        title: 'Signout successful!',
        description: 'Goodbye!',
      })
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
      router.push(`/`)
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: error.name,
        description: error.response.data.message,
      })
    },
  })

  const handleClick = () => {
    mutate()
  }

  return (
    <div className='flex w-full items-center space-x-2'>
      {mounted ? (
        <Button
          onClick={handleClick}
          aria-label='Log out'
          size='sm'
          className='w-full'
          disabled={isPending}
        >
          {isPending && <Icons.spinner className='mr-2 size-4 animate-spin' />}
          Log out
        </Button>
      ) : (
        <Skeleton
          className={cn(buttonVariants({ size: 'sm' }), 'w-full bg-muted text-muted-foreground')}
        >
          Log out
        </Skeleton>
      )}
      <Button
        aria-label='Go back to the previous page'
        variant='outline'
        size='sm'
        className='w-full'
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  )
}
