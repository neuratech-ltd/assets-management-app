'use client'

import StatsCard from '@/components/dashboard/StatsCard'
import { useGetAssetsApi } from '@/services/react-query/hooks/useAssetsApi'
import { useGetUsersApi } from '@/services/react-query/hooks/useUsersApi'
import { useGetVendorApi } from '@/services/react-query/hooks/useVendorApi'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { data: assets = [] } = useGetAssetsApi()
  const { data: users = [] } = useGetUsersApi()
  const { data: vendors = [] } = useGetVendorApi()

  const router = useRouter()

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Assets"
            description={assets.length.toString()}
            onActionClick={() => router.push('/dashboard/assets')}
          />
          <StatsCard
            title="Total Users"
            description={users.length.toString()}
            onActionClick={() => router.push('/dashboard/users')}
          />
          <StatsCard
            title="Total Vendors"
            description={vendors.length.toString()}
            onActionClick={() => router.push('/dashboard/vendors')}
          />
        </div>
      </div>
    </main>
  )
}
