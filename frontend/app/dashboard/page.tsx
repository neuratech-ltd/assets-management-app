'use client'

import StatsCard from "@/components/dashboard/StatsCard"

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Assets"
            description="1,234"
            actionText="View Details"
            onActionClick={() => console.log("Viewing details...")}
          />
          <StatsCard
            title="Total Users"
            description="1,234"
            actionText="View Details"
            onActionClick={() => console.log("Viewing details...")}
          />
          <StatsCard
            title="Total Vendors"
            description="1,234"
            actionText="View Details"
            onActionClick={() => console.log("Viewing details...")}
          />
         
        </div>
      </div>
    </main>
  )
}
