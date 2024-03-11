import { getUserApi } from '@/api/auth'
import { QueryKeys } from '@/config/query-key'
import { UserType } from '@/lib/type'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

type UseProfileQueryOptions = Omit<UseQueryOptions<UserType>, 'queryKey' | 'queryFn'>

export const useProfile = (options?: UseProfileQueryOptions) => {
  return useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: getUserApi,
    ...options,
  })
}
