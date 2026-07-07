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

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  designation: yup.string().nullable(),
  employeeId: yup.string().nullable(),
  joiningDate: yup.date().nullable(),
  password: yup.string().when('$isEdit', {
    is: true,
    then: (s) => s.notRequired(), // optional on edit — blank means "don't change"
    otherwise: (s) => s.required('Password is required'),
  }),
})

type UserFormValues = {
  fullName: string
  email: string
  designation?: string | null
  employeeId?: string | null
  joiningDate?: Date | null
  password?: string
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

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        email: user.email,
        designation: user.designation ?? '',
        employeeId: user.employeeId ?? '',
        joiningDate: user.joiningDate ? new Date(user.joiningDate) : null,
        password: '',
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
          <FieldLabel className="block text-sm font-medium">Joining Date</FieldLabel>
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
          <Button type="submit">{user ? 'Update User' : 'Create User'}</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default UserForm
