'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar'
import Header from '@/components/layout/Header'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const titleMap: Record<string, string> = {
  dashboard: 'Dashboard',
  assets: 'Assets',
  users: 'Users',
  categories: 'Categories',
  vendors: 'Vendors',
  new: 'New',
}

function getTitleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return 'Dashboard'

  const last = segments[segments.length - 1]

  const isDynamicId = /^\d+$/.test(last)
  const key = isDynamicId ? segments[segments.length - 2] : last

  if (isDynamicId) {
    const base = titleMap[key] ?? key
    return `Edit ${base.replace(/s$/, '')}`
  }

  return titleMap[key] ?? key.charAt(0).toUpperCase() + key.slice(1)
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = getTitleFromPath(pathname)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header title={title} />
        <div className="flex flex-1 flex-col mt-10 gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
