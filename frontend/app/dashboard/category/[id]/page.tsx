'use client'

import React from 'react'
import CategoryForm from '@/components/dashboard/CategoryForm'
import { Button } from '@/components/ui/button'
import { useDeleteCategoryApi } from '@/services/react-query/hooks/useCategoryApi'
import { useRouter, useParams } from 'next/navigation'

const CategoryDetails = () => {
  const router = useRouter()
  const params = useParams()
  const id = Number(params?.id)

  const deleteData = useDeleteCategoryApi(id)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteData.mutateAsync()
        router.push('/dashboard/category')
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Category Details</h1>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Category
          </Button>
        </div>
        <CategoryForm />
      </div>
    </main>
  )
}

export default CategoryDetails
