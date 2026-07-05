'use client'

import React from 'react'
import { useGetAssetsApi } from '@/services/react-query/hooks/useAssetsApi'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'

export default function AssetsPage() {
  const { data: assets = [], isLoading: loading, error } = useGetAssetsApi()

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assets</h1>
          <Button>
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
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.description ?? '—'}</TableCell>
                    <TableCell>{asset.type ?? '—'}</TableCell>
                    <TableCell>{asset.price ?? '—'}</TableCell>
                    <TableCell>{asset.assignedToId ?? '—'}</TableCell>
                    <TableCell>{asset.modelNumber ?? '—'}</TableCell>
                    <TableCell>{asset.specifications ?? '—'}</TableCell>
                    <TableCell>{asset.categoryId ?? '—'}</TableCell>
                    <TableCell>{asset.vendorId ?? '—'}</TableCell>
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
