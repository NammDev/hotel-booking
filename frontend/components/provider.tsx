'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 5, retryDelay: 1000, staleTime: 4 * 1000, refetchInterval: 4 * 1000 },
          mutations: { retry: 5, retryDelay: 1000 },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
