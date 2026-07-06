import { api } from '@/lib/api'
import { AssetCategory } from '@/lib/types'
import { endpoints } from '@/routes/paths'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

export const useGetCategoryApi = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<AssetCategory[]> => {
      const response = await api.get(endpoints.getCategories)
      return response.data
    },
  })
}

export const useGetCategoryByIdApi = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async (): Promise<AssetCategory> => {
      const response = await api.get(`${endpoints.updateCategory(id.toString())}`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useCreateCategoryApi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<AssetCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<AssetCategory> => {
      const response = await api.post(endpoints.createCategory, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export const useUpdateCategoryApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<AssetCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<AssetCategory> => {
      const response = await api.put(endpoints.updateCategory(id.toString()), data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', id] })
    },
  })
}

export const useDeleteCategoryApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(endpoints.deleteCategory(id.toString()))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', id] })
    },
  })
}
