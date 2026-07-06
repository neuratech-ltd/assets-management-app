import React from 'react'
import CategoryForm from '@/components/dashboard/CategoryForm'

const NewCategory = () => {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Add New Category</h1>
        <CategoryForm />
      </div>
    </main>
  )
}

export default NewCategory
