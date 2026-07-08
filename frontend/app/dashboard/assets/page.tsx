'use client'

import React, { useMemo, useState } from 'react'
import { useGetAssetsApi } from '@/services/react-query/hooks/useAssetsApi'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function AssetsPage() {
  const { data: assets = [], isLoading: loading, error } = useGetAssetsApi()
  const [search, setSearch] = useState('')

  const router = useRouter()

  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return assets

    return assets.filter((asset) => {
      const haystack = [asset.name, asset.type, asset.modelNumber, asset.category?.name, asset.vendor?.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [assets, search])

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assets</h1>
          <Field className="w-full max-w-xl" orientation="horizontal">
            <Input
              type="search"
              placeholder="Search by name, type, category, vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
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
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Purchase Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="text-muted-foreground py-8 text-center" colSpan={7}>
                    Loading assets...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell className="text-red-500 py-8 text-center" colSpan={7}>
                    Failed to load assets.
                  </TableCell>
                </TableRow>
              ) : filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
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
                    <TableCell>{asset.type ?? '—'}</TableCell>
                    <TableCell>{asset.price ?? '—'}</TableCell>
                    <TableCell>{asset.category?.name ?? '—'}</TableCell>
                    <TableCell>{asset.vendor?.name ?? '—'}</TableCell>
                    <TableCell>
                      {asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : '—'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-muted-foreground py-8 text-center" colSpan={7}>
                    {search ? `No assets match "${search}".` : 'No assets found.'}
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
