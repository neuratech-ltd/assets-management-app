'use client'

import React from 'react'
import VendorForm from '@/components/dashboard/VendorForm'
import { Button } from '@/components/ui/button'
import { useDeleteVendorApi } from '@/services/react-query/hooks/useVendorApi'
import { useRouter, useParams } from 'next/navigation'

const VendorDetails = () => {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)

  const deleteData = useDeleteVendorApi(id)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteData.mutateAsync()
        router.push('/dashboard/vendors')
      } catch (error) {
        console.error('Error deleting vendor:', error)
      }
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Vendor Details</h1>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Vendor
          </Button>
        </div>
        <VendorForm />
      </div>
    </main>
  )
}

export default VendorDetails
