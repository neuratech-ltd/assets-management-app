'use client'

import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useGetVendorByIdApi, useCreateVendorApi, useUpdateVendorApi } from '@/services/react-query/hooks/useVendorApi'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  contactInfo: yup.string().nullable(),
})

type VendorFormValues = {
  name: string
  contactInfo?: string | null
}

const inputClass = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs'

const VendorForm = () => {
  const params = useParams()
  const id = Number(params?.id)
  const router = useRouter()

  const { data: vendor } = useGetVendorByIdApi(id)
  const createVendor = useCreateVendorApi()
  const updateVendor = useUpdateVendorApi(id)

  const { reset, register, handleSubmit, formState } = useForm<VendorFormValues>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: { name: '', contactInfo: '' },
  })

  useEffect(() => {
    if (vendor) {
      reset({ name: vendor.name, contactInfo: vendor.contactInfo ?? '' })
    }
  }, [vendor, reset])

  const onsubmit = handleSubmit(async (data) => {
    try {
      if (vendor) {
        await updateVendor.mutateAsync({ name: data.name, contactInfo: data.contactInfo ?? null })
      } else {
        await createVendor.mutateAsync({ name: data.name, contactInfo: data.contactInfo ?? null })
      }
      router.push('/dashboard/vendors')
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
          <FieldLabel className="block text-sm font-medium">Contact Info</FieldLabel>
          <Input className={`${inputClass} min-h-[80px]`} {...register('contactInfo')} />
          {formState.errors.contactInfo && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.contactInfo.message)}</FieldError>
          )}
        </Field>

        <Field>
          <Button type="submit">{vendor ? 'Update Vendor' : 'Create Vendor'}</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default VendorForm
