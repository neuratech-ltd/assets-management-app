import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/lib/types'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { endpoints } from '@/routes/paths'

export const useGetUsersApi = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get('/users')
      return response.data
    },
  })
}

export const useGetUserByIdApi = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async (): Promise<User> => {
      const response = await api.get(endpoints.updateUser(id.toString()))
      return response.data
    },
    enabled: !!id,
  })
}

export const useCreateUserApi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
      const response = await api.post(endpoints.createUser, userData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUserApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
      const response = await api.put(endpoints.updateUser(id.toString()), userData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}

export const useDeleteUserApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(endpoints.deleteUser(id.toString()))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}
