import React, { useContext, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

type AppContextType = {
  stripePromise: Promise<Stripe | null>
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider
      value={{
        stripePromise,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context as AppContextType
}
