import { getUserApi } from '@/api/auth'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    retry: false,
  })
}
