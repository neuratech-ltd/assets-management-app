import AssetForm from '@/components/dashboard/AssetsForm'
import React from 'react'

const NewPage = () => {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Add New Asset</h1>
        <AssetForm />
      </div>
    </main>
  )
}

export default NewPage
