'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useGetCategoryApi } from '@/services/react-query/hooks/useCategoryApi'
import { useGetUsersApi } from '@/services/react-query/hooks/useUsersApi'
import { useGetVendorApi } from '@/services/react-query/hooks/useVendorApi'
import { useCreateAssetApi, useGetAssetByIdApi } from '@/services/react-query/hooks/useAssetsApi'

interface AssetForm {
  name: string
  description: string
  type: string
  price: string
  purchaseDate: string
  modelNumber: string
  specifications: string
  imageUrl: string
  assignedToId: string
  categoryId: string
  vendorId: string
}

interface CreateAssetPayload {
  name: string
  description?: string | null
  type?: string | null
  price?: number | null
  purchaseDate?: Date | null
  modelNumber?: string | null
  specifications?: string | null
  imageUrl?: string | null
  assignedToId?: number | null
  categoryId: number
  vendorId: number
}

const inputClass = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs'

const AssetForm = () => {
  const params = useParams()
  const id = Number(params.id)

  const { data: assets } = useGetAssetByIdApi(id)

  const response = useRouter()
  const { data: categories = [] } = useGetCategoryApi()
  const { data: users = [] } = useGetUsersApi()
  const { data: vendors = [] } = useGetVendorApi()

  const createAssetMutation = useCreateAssetApi()

  const [form, setForm] = useState<AssetForm>({
    name: assets?.name ?? '',
    description: assets?.description ?? '',
    type: assets?.type ?? '',
    price: assets?.price ? assets.price.toString() : '',
    purchaseDate: assets?.purchaseDate ? new Date(assets.purchaseDate).toISOString().split('T')[0] : '',
    modelNumber: assets?.modelNumber ?? '',
    specifications: assets?.specifications ?? '',
    imageUrl: assets?.imageUrl ?? '',
    assignedToId: assets?.assignedToId ? assets.assignedToId.toString() : '',
    categoryId: assets?.categoryId ? assets.categoryId.toString() : '',
    vendorId: assets?.vendorId ? assets.vendorId.toString() : '',
  })

  const [errors, setErrors] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      type: '',
      price: '',
      purchaseDate: '',
      modelNumber: '',
      specifications: '',
      imageUrl: '',
      assignedToId: '',
      categoryId: '',
      vendorId: '',
    })
    setErrors(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors(null)

    try {
      if (!form.categoryId || !form.vendorId) {
        setErrors('Category and Vendor are required')
        setLoading(false)
        return
      }

      const payload: CreateAssetPayload = {
        name: form.name,
        description: form.description || null,
        type: form.type || null,
        price: form.price ? Number(form.price) : null,
        purchaseDate: form.purchaseDate ? new Date(form.purchaseDate) : null,
        modelNumber: form.modelNumber || null,
        specifications: form.specifications || null,
        imageUrl: form.imageUrl || null,
        assignedToId: form.assignedToId ? Number(form.assignedToId) : null,
        categoryId: Number(form.categoryId),
        vendorId: Number(form.vendorId),
      }

      await createAssetMutation.mutateAsync(payload)
      resetForm()
      response.push('/dashboard/assets')
    } catch (error) {
      setErrors('Failed to create asset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Asset name" />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className={inputClass + ' h-24 resize-y'}
            placeholder="Short description"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Input id="type" name="type" value={form.type} onChange={handleChange} placeholder="e.g. Laptop" />
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>
          <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} placeholder="0.00" />
        </Field>

        <Field>
          <FieldLabel htmlFor="purchaseDate">Purchase Date</FieldLabel>
          <Input id="purchaseDate" name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} />
        </Field>

        <Field>
          <FieldLabel htmlFor="modelNumber">Model Number</FieldLabel>
          <Input id="modelNumber" name="modelNumber" value={form.modelNumber} onChange={handleChange} />
        </Field>

        <Field>
          <FieldLabel htmlFor="specifications">Specifications</FieldLabel>
          <textarea
            id="specifications"
            name="specifications"
            value={form.specifications}
            onChange={handleChange}
            className={inputClass + ' h-24 resize-y'}
            placeholder="CPU, RAM, Storage, etc."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="assignedToId">Assign To</FieldLabel>
          <select
            id="assignedToId"
            name="assignedToId"
            value={form.assignedToId}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Unassigned</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.fullName ?? u.email}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="categoryId">Category</FieldLabel>
          <select
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select category</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="vendorId">Vendor</FieldLabel>
          <select id="vendorId" name="vendorId" value={form.vendorId} onChange={handleChange} className={inputClass}>
            <option value="">Select vendor</option>
            {vendors.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </Field>

        {errors && (
          <Field>
            <FieldError>{errors}</FieldError>
          </Field>
        )}

        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
            Reset
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Create Asset'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default AssetForm
