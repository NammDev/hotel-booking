import { getUserApi } from '@/api/auth'
import { UserType } from '@/lib/type'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

type UseProfileQueryOptions = Omit<UseQueryOptions<UserType>, 'queryKey' | 'queryFn'>

export const useProfile = (options?: UseProfileQueryOptions) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    ...options,
  })
}
