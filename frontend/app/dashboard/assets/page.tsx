'use client'

import React from 'react'
import { useGetAssetsApi } from '@/services/react-query/hooks/useAssetsApi'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AssetsPage() {
  const { data: assets = [], isLoading: loading, error } = useGetAssetsApi()

  const router = useRouter()

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assets</h1>
          <Button size="sm" onClick={() => router.push('/dashboard/assets/new')}>
            <PlusCircleIcon /> Add new
          </Button>
        </div>

        <div className="rounded-lg border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Model Number</TableHead>
                <TableHead>Specification</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Purchase Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <TableRow
                    key={asset.id}
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/dashboard/assets/${asset.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        router.push(`/dashboard/assets/${asset.id}`)
                      }
                    }}
                  >
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.description ?? '—'}</TableCell>
                    <TableCell>{asset.type ?? '—'}</TableCell>
                    <TableCell>{asset.price ?? '—'}</TableCell>
                    <TableCell>{asset.assignedTo?.fullName ?? '—'}</TableCell>
                    <TableCell>{asset.modelNumber ?? '—'}</TableCell>
                    <TableCell>{asset.specifications ?? '—'}</TableCell>
                    <TableCell>{asset.category?.name ?? '—'}</TableCell>
                    <TableCell>{asset.vendor?.name ?? '—'}</TableCell>
                    <TableCell>
                      {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : '—'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-muted-foreground py-8 text-center" colSpan={3}>
                    No assets found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
