import { api } from '@/lib/api'
import { Asset } from '@/lib/types'
import { endpoints } from '@/routes/paths'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

export const useGetAssetsApi = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async (): Promise<Asset[]> => {
      const response = await api.get(endpoints.getAssets)
      return response.data
    },
  })
}

export const useGetAssetByIdApi = (id: number) => {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: async (): Promise<Asset> => {
      const response = await api.get(`${endpoints.getAssetById(id)}`)
      return response.data
    },
  })
}

export const useCreateAssetApi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Asset> => {
      const response = await api.post(endpoints.createAsset, assetData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
    },
  })
}
