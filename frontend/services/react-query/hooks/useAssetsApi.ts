import { api } from '@/lib/api'
import { Asset, AssetInput } from '@/lib/types'
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
    mutationFn: async (assetData: AssetInput): Promise<Asset> => {
      const response = await api.post(endpoints.createAsset, assetData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
    },
  })
}

export const useUpdateAssetApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (assetData: AssetInput): Promise<Asset> => {
      const response = await api.put(endpoints.updateAsset(id), assetData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['asset', id] })
    },
  })
}

export const useDeleteAssetApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(endpoints.deleteAsset(id))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] })
      queryClient.invalidateQueries({ queryKey: ['asset', id] })
    },
  })
}
