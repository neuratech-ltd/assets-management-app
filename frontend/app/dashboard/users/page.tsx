'use client'

import React from 'react'
import { useGetUsersApi } from '@/services/react-query/hooks/useUsersApi'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UsersPage = () => {
  const { data: users = [], isLoading: loading, error } = useGetUsersApi()

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
          <Button onClick={() => router.push('/dashboard/users/new')} size="sm">
            <PlusCircleIcon /> Add new
          </Button>
        </div>

        <div className="rounded-lg border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Employee Id</TableHead>
                <TableHead>Joining Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/dashboard/users/${user.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        router.push(`/dashboard/users/${user.id}`)
                      }
                    }}
                  >
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.designation ?? '—'}</TableCell>
                    <TableCell>{user.email ?? '—'}</TableCell>
                    <TableCell>{user.employeeId ?? '—'}</TableCell>
                    <TableCell>{user.joiningDate ? new Date(user.joiningDate).toLocaleDateString() : '—'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-muted-foreground py-8 text-center" colSpan={3}>
                    No users found.
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

export default UsersPage
