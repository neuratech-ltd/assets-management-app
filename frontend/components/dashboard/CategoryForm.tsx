'use client'

import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  useGetCategoryByIdApi,
  useCreateCategoryApi,
  useUpdateCategoryApi,
} from '@/services/react-query/hooks/useCategoryApi'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().nullable(),
})

type CategoryFormValues = {
  name: string
  description?: string | null
}

const inputClass = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs'

const CategoryForm = () => {
  const params = useParams()
  const id = Number(params?.id)
  const router = useRouter()

  const { data: category } = useGetCategoryByIdApi(id)
  const createCategory = useCreateCategoryApi()
  const updateCategory = useUpdateCategoryApi(id)

  const { reset, register, handleSubmit, formState } = useForm<CategoryFormValues>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    if (category) {
      reset({ name: category.name, description: category.description ?? '' })
    }
  }, [category, reset])

  const onsubmit = handleSubmit(async (data) => {
    try {
      if (category) {
        await updateCategory.mutateAsync({ name: data.name, description: data.description ?? null })
      } else {
        await createCategory.mutateAsync({ name: data.name, description: data.description ?? null })
      }
      router.push('/dashboard/category')
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <form onSubmit={onsubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel className="block text-sm font-medium">Name</FieldLabel>
          <Input className={inputClass} {...register('name')} />
          {formState.errors.name && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.name.message)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="block text-sm font-medium">Description</FieldLabel>
          <Input className={`${inputClass} min-h-[80px]`} {...register('description')} />
          {formState.errors.description && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.description.message)}</FieldError>
          )}
        </Field>

        <Field>
          <Button type="submit">{category ? 'Update Category' : 'Create Category'}</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default CategoryForm
