import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

type LoginPayload = {
  email: string
  password: string
}

type User = {
  id: number
  email: string
  fullName: string
  designation: string
  employeeId: string
}

export const useLoginApi = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post('/auth/login', payload)
      return res.data.user as User
    },
  })
}

export const useLogoutApi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const res = await api.post('/auth/logout')
      return res.data
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export const useMeApi = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/auth/me')
      return res.data.user as User
    },
    retry: false,
  })
}
