// components/LoginForm.tsx
'use client'

import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useLoginApi } from '@/services/react-query/hooks/useAuthApi'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

type LoginFormValues = {
  email: string
  password: string
}

const inputClass = 'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs'

const LoginForm = () => {
  const router = useRouter()
  const login = useLoginApi()

  const { register, handleSubmit, formState, setError } = useForm<LoginFormValues>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onsubmit = handleSubmit(async (data) => {
    try {
      await login.mutateAsync(data)
      router.push('/dashboard')
    } catch (error: any) {
      setError('password', {
        message: error?.response?.data?.message || 'Invalid email or password',
      })
    }
  })

  return (
    <form onSubmit={onsubmit} className="w-full max-w-sm space-y-4 border p-6 rounded-lg">
      <h1 className="text-xl font-semibold">Login</h1>
      <FieldGroup>
        <Field>
          <FieldLabel className="block text-sm font-medium">Email</FieldLabel>
          <Input className={inputClass} type="email" {...register('email')} />
          {formState.errors.email && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.email.message)}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel className="block text-sm font-medium">Password</FieldLabel>
          <Input className={inputClass} type="password" {...register('password')} />
          {formState.errors.password && (
            <FieldError className="text-sm text-red-500">{String(formState.errors.password.message)}</FieldError>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={login.isPending}>
            {login.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
