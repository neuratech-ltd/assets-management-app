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
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),

  description: yup.string().nullable(),

  type: yup.string().nullable(),

  price: yup
    .number()
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .positive('Price must be positive'),

  quantity: yup
    .number()
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .min(0, 'Quantity cannot be negative')
    .integer('Quantity must be a whole number'),

  purchaseDate: yup.date().nullable(),

  modelNumber: yup.string().nullable(),

  specifications: yup.string().nullable(),

  imageUrl: yup
    .string()
    .nullable()
    .transform((v) => (v === '' ? null : v))
    .url('Invalid URL'),

  assignedUserIds: yup
    .array()
    .of(yup.number().required())
    .test('max-quantity', 'Cannot assign more users than available quantity', function (value) {
      const { quantity } = this.parent
      if (quantity == null || !value) return true
      return value.length <= quantity
    }),

  categoryId: yup.number().moreThan(0, 'Category is required'),

  vendorId: yup.number().moreThan(0, 'Vendor is required'),
})

interface AssetForm {
  name: string
  description: string
  type: string
  price: number
  quantity: number | null
  purchaseDate: Date | null
  modelNumber: string
  specifications: string
  imageUrl: string
  assignedUserIds: number[]
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

  const userAnchor = useComboboxAnchor()

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
      quantity: 1,
      purchaseDate: null,
      modelNumber: '',
      specifications: '',
      imageUrl: '',
      assignedUserIds: [],
      categoryId: 0,
      vendorId: 0,
    },
  })

  const {
    reset,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods

  const quantity = watch('quantity')
  const assignedUserIds = watch('assignedUserIds') ?? []

  useEffect(() => {
    if (assets) {
      const activeUserIds = (assets.assignments ?? []).filter((a: any) => !a.returnedAt).map((a: any) => a.userId)

      reset({
        name: assets.name,
        description: assets.description ?? '',
        type: assets.type ?? '',
        price: assets.price ?? 0,
        quantity: assets.quantity ?? 1,
        purchaseDate: assets.purchaseDate ? new Date(assets.purchaseDate) : null,
        modelNumber: assets.modelNumber ?? '',
        specifications: assets.specifications ?? '',
        imageUrl: assets.imageUrl ?? '',
        assignedUserIds: activeUserIds,
        categoryId: assets.categoryId,
        vendorId: assets.vendorId,
      })
    }
  }, [assets, reset])

  const onsubmit = handleSubmit(async (data) => {
    const payload = {
      name: data.name,
      description: data.description || null,
      type: data.type || null,
      price: data.price ?? null,
      quantity: data.quantity ?? null,
      purchaseDate: data.purchaseDate ?? null,
      modelNumber: data.modelNumber || null,
      specifications: data.specifications || null,
      imageUrl: data.imageUrl || null,
      assignedUserIds: data.assignedUserIds ?? [],
      categoryId: data.categoryId,
      vendorId: data.vendorId,
    }

    if (assets) {
      try {
        await updateAsset(payload)
        router.push('/dashboard/assets')
      } catch (error) {
        console.error('Error updating asset:', error)
      }
    } else {
      try {
        await createAsset(payload)
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
          <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
          <Input id="quantity" type="number" {...register('quantity', { valueAsNumber: true })} placeholder="e.g. 5" />
          {errors.quantity && <FieldError>{errors.quantity.message}</FieldError>}
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
          <FieldLabel htmlFor="assignedUserIds">
            Assign To {quantity != null && `(${assignedUserIds.length}/${quantity} used)`}
          </FieldLabel>
          <Controller
            name="assignedUserIds"
            control={control}
            render={({ field }) => {
              const selectedUsers = users.filter((u: any) => field.value?.includes(u.id))

              return (
                <Combobox
                  multiple
                  autoHighlight
                  items={users}
                  itemToStringLabel={(u: any) => u.fullName ?? u.email}
                  value={selectedUsers}
                  onValueChange={(values: any[]) => {
                    field.onChange(values.map((u) => u.id))
                  }}
                >
                  <ComboboxChips ref={userAnchor} className="w-full">
                    <ComboboxValue>
                      {(values: any[]) => (
                        <>
                          {values.map((u) => (
                            <ComboboxChip key={u.id}>{u.fullName ?? u.email}</ComboboxChip>
                          ))}
                          <ComboboxChipsInput placeholder="Search users..." />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent anchor={userAnchor}>
                    <ComboboxEmpty>No users found.</ComboboxEmpty>
                    <ComboboxList>
                      {(u: any) => (
                        <ComboboxItem key={u.id} value={u}>
                          {u.fullName ?? u.email}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )
            }}
          />
          {errors.assignedUserIds && <FieldError>{errors.assignedUserIds.message as string}</FieldError>}
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
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button disabled={isCreatingAsset || isUpdatingAsset} type="submit">
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
