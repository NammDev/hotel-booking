'use client'

import { dashboardConfig } from '@/config/dashboard'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'
import { useProfile } from '@/hooks/use-profile'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const router = useRouter()

  const { data: user, isLoading, isError } = useProfile()

  useEffect(() => {
    if (isError) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isError, pathname, router])

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader user={user} />
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
          {/* <ScrollArea className='py-6 pr-6 lg:py-8'>
            <SidebarNav items={dashboardConfig.sidebarNav} className='p-1' />
          </ScrollArea> */}
          scroll area
        </aside>
        <main className='flex w-full flex-col overflow-hidden'>{children}</main>
      </div>
      <SiteFooter />
    </div>
  )
}
