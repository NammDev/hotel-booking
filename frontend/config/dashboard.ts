import { type SidebarNavItem } from '@/types'

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Account',
      href: '/dashboard/account',
      icon: 'avatar',
      items: [],
    },
    {
      title: 'Hotels',
      href: '/dashboard/hotels',
      icon: 'store',
      items: [],
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'credit',
      items: [],
    },
    {
      title: 'Purchases',
      href: '/dashboard/purchases',
      icon: 'dollarSign',
      items: [],
    },
  ],
}
