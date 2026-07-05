import { api } from '@/lib/api'
import { AssetCategory } from '@/lib/types'
import { endpoints } from '@/routes/paths'
import { useQuery } from '@tanstack/react-query'

export const useGetCategoryApi = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<AssetCategory[]> => {
      const response = await api.get(endpoints.getCategories)
      return response.data
    },
  })
}
