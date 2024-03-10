import { UserType } from '@/lib/type'
import { getUser } from '@/services/api/auth'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext } from 'react'

type AppContext = {
  user?: UserType
}

const AppContext = createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
  })

  return (
    <AppContext.Provider
      value={{
        user: data,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context as AppContext
}
