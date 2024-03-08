'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppContextProvider } from '@/context/AppContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 2, retryDelay: 500, staleTime: 4 * 1000, refetchInterval: 4 * 1000 },
          mutations: { retry: 2, retryDelay: 500 },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </AppContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}