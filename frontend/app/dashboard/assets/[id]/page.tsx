'use client'

import React from 'react'
import AssetForm from '@/components/dashboard/AssetsForm'
import { Button } from '@/components/ui/button'
import { useDeleteAssetApi } from '@/services/react-query/hooks/useAssetsApi'
import { useRouter, useParams } from 'next/navigation'

const AssetDetails = () => {
  const router = useRouter()
  const params = useParams()

  const id = Number(params?.id)

  const deleteData = useDeleteAssetApi(id)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this asset?')) {
      try {
        await deleteData.mutateAsync()
        router.push('/dashboard/assets')
      } catch (error) {
        console.error('Error deleting asset:', error)
      }
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Asset Details</h1>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Asset
          </Button>
        </div>
        <AssetForm />
      </div>
    </main>
  )
}

export default AssetDetails
