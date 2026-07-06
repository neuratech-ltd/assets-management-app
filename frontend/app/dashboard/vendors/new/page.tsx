import React from 'react'
import VendorForm from '@/components/dashboard/VendorForm'

const NewVendorPage = () => {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Add New Vendor</h1>
        <VendorForm />
      </div>
    </main>
  )
}

export default NewVendorPage
