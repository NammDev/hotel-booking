import { UserType } from '@/lib/type'
import { ReactNode, createContext, useContext } from 'react'
import { useProfile } from '@/hooks/use-profile'

type AppContext = {
  user?: UserType
}

const AppContext = createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useProfile()

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
