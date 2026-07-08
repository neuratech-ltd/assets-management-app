'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetVendorApi } from '@/services/react-query/hooks/useVendorApi'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const VendorsPage = () => {
  const { data: vendors = [], isLoading: loading, error } = useGetVendorApi()

  const router = useRouter()

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              <ArrowLeftIcon /> Back
            </Button>
          </div>
          <Button size="sm" onClick={() => router.push('/dashboard/vendors/new')}>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/dashboard/vendors/${vendor.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        router.push(`/dashboard/vendors/${vendor.id}`)
                      }
                    }}
                  >
                    <TableCell className="font-medium">{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.contactInfo ?? '—'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-muted-foreground py-8 text-center" colSpan={3}>
                    No vendors found.
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

export default VendorsPage
