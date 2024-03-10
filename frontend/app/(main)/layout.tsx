'use client'

import { SiteHeader } from '@/components/layouts/site-header'
import { SiteFooter } from '@/components/layouts/site-footer'
import { useAppContext } from '@/context/AppContext'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext()

  return (
    <div className='relative flex min-h-screen flex-col'>
      <SiteHeader user={user} />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}
