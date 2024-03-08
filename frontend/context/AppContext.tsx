import { validateTokenApi } from '@/services/api/auth'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, createContext, useContext } from 'react'

type AppContext = {
  isLoggedIn: boolean
}

const AppContext = createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // const { isError } = useQuery({
  //   queryKey: ['validateToken'],
  //   queryFn: validateTokenApi,
  //   retry: false,
  // })

  const isError = false
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
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
