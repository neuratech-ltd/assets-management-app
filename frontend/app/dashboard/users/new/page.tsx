import React from 'react'
import UserForm from '@/components/dashboard/UserForm'

const NewUsersPage = () => {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Add New User</h1>
        <UserForm />
      </div>
    </main>
  )
}

export default NewUsersPage
