'use client'

import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useGetUserByIdApi, useCreateUserApi, useUpdateUserApi } from '@/services/react-query/hooks/useUsersApi'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Asset } from '@/lib/types'

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  designation: yup.string().nullable(),
  employeeId: yup.string().nullable(),
  joiningDate: yup.date().nullable(),
  password: yup.string().notRequired(),
  assets: yup.array().of(
    yup.object({
      id: yup.number().required(),
      name: yup.string().required(),
      type: yup.string().nullable(),
      price: yup.number().nullable(),
      purchaseDate: yup.date().nullable(),
      modelNumber: yup.string().nullable(),
      specifications: yup.string().nullable(),
      imageUrl: yup.string().nullable(),
      assignedToId: yup.number().nullable(),
      categoryId: yup.number().required(),
      vendorId: yup.number().required(),
    }),
  ),
})

type UserFormValues = {
  fullName: string
  email: string
  designation?: string | null
  employeeId?: string | null
  joiningDate?: Date | null
  password?: string
  assets?: Asset[]
}

const inputClass = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs'

const UserForm = () => {
  const params = useParams()
  const id = Number(params?.id)
  const router = useRouter()

  const { data: user } = useGetUserByIdApi(id)
  const createUser = useCreateUserApi()
  const updateUser = useUpdateUserApi(id)

  const { reset, register, handleSubmit, formState } = useForm<UserFormValues>({
    // @ts-ignore
    resolver: yupResolver(schema),

    defaultValues: { fullName: '', email: '', designation: '', employeeId: '', joiningDate: null, password: '' },
  })

  const assignedAssets = user?.assets ?? []

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        designation: user.designation ?? '',
        employeeId: user.employeeId ?? '',
        joiningDate: user.joiningDate ? new Date(user.joiningDate) : null,
        password: '',
        assets: user.assets ?? [],
      })
    }
  }, [user, reset])

  const onsubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        designation: data.designation ?? null,
        employeeId: data.employeeId ?? null,
        joiningDate: data.joiningDate ?? null,
        password: data.password ?? null,
      }

      if (user) {
        await updateUser.mutateAsync(payload)
      } else {
        await createUser.mutateAsync(payload)
      }
      router.push('/dashboard/users')
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <form onSubmit={onsubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel className="block text-sm font-medium">Full name</FieldLabel>
          <Input className={inputClass} {...register('fullName')} />
          {formState.errors.fullName && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.fullName.message)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="block text-sm font-medium">Email</FieldLabel>
          <Input className={inputClass} {...register('email')} type="email" />
          {formState.errors.email && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.email.message)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="block text-sm font-medium">Designation</FieldLabel>
          <Input className={inputClass} {...register('designation')} />
          {formState.errors.designation && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.designation.message)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="block text-sm font-medium">Employee ID</FieldLabel>
          <Input className={inputClass} {...register('employeeId')} />
          {formState.errors.employeeId && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.employeeId.message)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="block text-sm font-medium">
            Joining Date : {user?.joiningDate ? new Date(user.joiningDate).toLocaleDateString() : '—'}
          </FieldLabel>
          <Input
            className={inputClass}
            {...register('joiningDate', { setValueAs: (value) => (value ? new Date(value) : null) })}
            type="date"
          />
          {formState.errors.joiningDate && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.joiningDate.message)}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel className="block text-sm font-medium">Password</FieldLabel>
          <Input className={inputClass} type="password" {...register('password')} />
          {formState.errors.password && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.password.message)}</FieldError>
          )}
          {user && <p className="text-xs text-muted-foreground">Leave blank to keep current password</p>}
        </Field>
        <Field>
          <FieldLabel className="block text-sm font-medium">Assigned assets</FieldLabel>
          {assignedAssets.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-2">
              {assignedAssets.map((asset) => (
                <div key={asset.id} className="border rounded-md p-4">
                  <h3 className="font-semibold">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground">{asset.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-3">
              <p className="text-sm text-muted-foreground">No assets assigned to this user.</p>
            </div>
          )}
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">{user ? 'Update User' : 'Create User'}</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default UserForm
