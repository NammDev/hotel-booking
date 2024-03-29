'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SearchContextProvider } from '@/context/SearchContext'
import { AppContextProvider } from '@/context/AppContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
          mutations: { retry: 0 },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <AppContextProvider>
          <SearchContextProvider>{children}</SearchContextProvider>
        </AppContextProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
