import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import type { User } from '@/lib/types'

export const useGetUsersApi = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get('/users')
      return response.data
    },
  })
}
