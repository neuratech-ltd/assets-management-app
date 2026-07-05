import { api } from '@/lib/api'
import { Asset } from '@/lib/types'
import { endpoints } from '@/routes/paths'
import { useQuery } from '@tanstack/react-query'

export const useGetAssetsApi = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async (): Promise<Asset[]> => {
      const response = await api.get(endpoints.getAssets)
      return response.data
    },
  })
}
