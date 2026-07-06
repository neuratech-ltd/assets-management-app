import { api } from '@/lib/api'
import { Vendor } from '@/lib/types'
import { endpoints } from '@/routes/paths'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

export const useGetVendorApi = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: async (): Promise<Vendor[]> => {
      const response = await api.get(endpoints.getVendors)
      return response.data
    },
  })
}

export const useGetVendorByIdApi = (id: number) => {
  return useQuery({
    queryKey: ['vendor', id],
    queryFn: async (): Promise<Vendor> => {
      const response = await api.get(endpoints.updateVendor(id.toString()))
      return response.data
    },
    enabled: !!id,
  })
}

export const useCreateVendorApi = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (vendorData: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vendor> => {
      const response = await api.post(endpoints.createVendor, vendorData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
    },
  })
}

export const useUpdateVendorApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (vendorData: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vendor> => {
      const response = await api.put(endpoints.updateVendor(id.toString()), vendorData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      queryClient.invalidateQueries({ queryKey: ['vendor', id] })
    },
  })
}

export const useDeleteVendorApi = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(endpoints.deleteVendor(id.toString()))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      queryClient.invalidateQueries({ queryKey: ['vendor', id] })
    },
  })
}
