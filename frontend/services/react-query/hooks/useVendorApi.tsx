import { api } from '@/lib/api'
import { Vendor } from '@/lib/types'
import { endpoints } from '@/routes/paths'
import { useQuery } from '@tanstack/react-query'

export const useGetVendorApi = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: async (): Promise<Vendor[]> => {
      const response = await api.get(endpoints.getVendors)
      return response.data
    },
  })
}
