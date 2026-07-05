import React from 'react'
import AssetForm from '@/components/dashboard/AssetsForm'

const page = () => {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Asset Details</h1>
        <AssetForm />
      </div>
    </main>
  )
}

export default page
