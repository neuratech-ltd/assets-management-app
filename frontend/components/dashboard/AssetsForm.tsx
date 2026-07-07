'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useGetCategoryApi } from '@/services/react-query/hooks/useCategoryApi'
import { useGetUsersApi } from '@/services/react-query/hooks/useUsersApi'
import { useGetVendorApi } from '@/services/react-query/hooks/useVendorApi'
import { useCreateAssetApi, useGetAssetByIdApi, useUpdateAssetApi } from '@/services/react-query/hooks/useAssetsApi'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),

  description: yup.string().nullable(),

  type: yup.string().nullable(),

  price: yup
    .number()
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .positive('Price must be positive'),

  purchaseDate: yup.date().nullable(),

  modelNumber: yup.string().nullable(),

  specifications: yup.string().nullable(),

  imageUrl: yup
    .string()
    .nullable()
    .transform((v) => (v === '' ? null : v))
    .url('Invalid URL'),

  assignedToId: yup.number().nullable(),

  categoryId: yup.number().moreThan(0, 'Category is required'),

  vendorId: yup.number().moreThan(0, 'Vendor is required'),
})

interface AssetForm {
  name: string
  description: string
  type: string
  price: number
  purchaseDate: Date | null
  modelNumber: string
  specifications: string
  imageUrl: string
  assignedToId: number | null
  categoryId: number
  vendorId: number
}

const inputClass = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs'

const AssetForm = () => {
  const params = useParams()

  const id = Number(params?.id)
  const router = useRouter()

  const { data: categories = [] } = useGetCategoryApi()
  const { data: users = [] } = useGetUsersApi()
  const { data: vendors = [] } = useGetVendorApi()
  const { data: assets } = useGetAssetByIdApi(id)

  const { mutateAsync: createAsset, isPending: isCreatingAsset } = useCreateAssetApi()
  const { mutateAsync: updateAsset, isPending: isUpdatingAsset } = useUpdateAssetApi(id)

  const methods = useForm<AssetForm>({
    //@ts-ignore
    resolver: yupResolver(validationSchema),

    defaultValues: {
      name: '',
      description: '',
      type: '',
      price: 0,
      purchaseDate: null,
      modelNumber: '',
      specifications: '',
      imageUrl: '',
      assignedToId: null,
      categoryId: 0,
      vendorId: 0,
    },
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  useEffect(() => {
    if (assets) {
      reset({
        name: assets.name,
        description: assets.description ?? '',
        type: assets.type ?? '',
        price: assets.price ?? 0,
        purchaseDate: assets.purchaseDate ? new Date(assets.purchaseDate) : null,
        modelNumber: assets.modelNumber ?? '',
        specifications: assets.specifications ?? '',
        imageUrl: assets.imageUrl ?? '',
        assignedToId: assets.assignedToId ?? null,
        categoryId: assets.categoryId,
        vendorId: assets.vendorId,
      })
    }
  }, [assets, reset])

  const onsubmit = handleSubmit(async (data) => {
    if (assets) {
      try {
        await updateAsset({
          name: data.name,
          description: data.description || null,
          type: data.type || null,
          price: data.price ?? null,
          purchaseDate: data.purchaseDate ?? null,
          modelNumber: data.modelNumber || null,
          specifications: data.specifications || null,
          imageUrl: data.imageUrl || null,
          assignedToId: data.assignedToId ?? null,
          categoryId: data.categoryId,
          vendorId: data.vendorId,
        })
        router.push('/dashboard/assets')
      } catch (error) {
        console.error('Error updating asset:', error)
      }
    } else {
      try {
        await createAsset({
          name: data.name,
          description: data.description || null,
          type: data.type || null,
          price: data.price ?? null,
          purchaseDate: data.purchaseDate ?? null,
          modelNumber: data.modelNumber || null,
          specifications: data.specifications || null,
          imageUrl: data.imageUrl || null,
          assignedToId: data.assignedToId ?? null,
          categoryId: data.categoryId,
          vendorId: data.vendorId,
        })
        router.push('/dashboard/assets')
      } catch (error) {
        console.error('Error creating asset:', error)
      }
    }
  })

  return (
    <form onSubmit={onsubmit} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" {...register('name')} placeholder="Asset name" />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <textarea
            id="description"
            {...register('description')}
            className={inputClass + ' h-24 resize-y'}
            placeholder="Short description"
          />
          {errors.description && <FieldError>{errors.description.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Input id="type" {...register('type')} placeholder="e.g. Laptop" />
          {errors.type && <FieldError>{errors.type.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>
          <Input id="price" type="number" {...register('price', { valueAsNumber: true })} placeholder="0.00" />
          {errors.price && <FieldError>{errors.price.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="purchaseDate">
            Purchase Date : {assets?.purchaseDate ? new Date(assets.purchaseDate).toLocaleDateString() : '—'}
          </FieldLabel>
          <Input
            id="purchaseDate"
            type="date"
            {...register('purchaseDate', {
              setValueAs: (value) => (value ? new Date(value) : null),
            })}
          />

          {errors.purchaseDate && <FieldError>{errors.purchaseDate.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="modelNumber">Model Number</FieldLabel>
          <Input id="modelNumber" {...register('modelNumber')} />
          {errors.modelNumber && <FieldError>{errors.modelNumber.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="specifications">Specifications</FieldLabel>
          <textarea
            id="specifications"
            {...register('specifications')}
            className={inputClass + ' h-24 resize-y'}
            placeholder="CPU, RAM, Storage, etc."
          />
          {errors.specifications && <FieldError>{errors.specifications.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
          <Input id="imageUrl" {...register('imageUrl')} placeholder="https://..." />
          {errors.imageUrl && <FieldError>{errors.imageUrl.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="assignedToId">Assign To</FieldLabel>
          <select id="assignedToId" {...register('assignedToId', { valueAsNumber: true })} className={inputClass}>
            <option value="">Unassigned</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.id}>
                {u.fullName ?? u.email}
              </option>
            ))}
          </select>
          {errors.assignedToId && <FieldError>{errors.assignedToId.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="categoryId">Category</FieldLabel>
          <select id="categoryId" {...register('categoryId', { valueAsNumber: true })} className={inputClass}>
            <option value="">Select category</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <FieldError>{errors.categoryId.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="vendorId">Vendor</FieldLabel>
          <select id="vendorId" {...register('vendorId', { valueAsNumber: true })} className={inputClass}>
            <option value="">Select vendor</option>
            {vendors.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          {errors.vendorId && <FieldError>{errors.vendorId.message}</FieldError>}
        </Field>

        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Reset
          </Button>
          <Button disabled={isCreatingAsset} type="submit">
            {assets
              ? isUpdatingAsset
                ? 'Updating...'
                : 'Update Asset'
              : isCreatingAsset
                ? 'Creating...'
                : 'Create Asset'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default AssetForm
