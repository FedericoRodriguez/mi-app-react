// src/contexts/SelectedUserContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { User } from '../types'

type ContextType = {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}

const SelectedUserContext = createContext<ContextType | undefined>(undefined)

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext)
  if (!context) {
    throw new Error(
      'useSelectedUser debe usarse dentro de un SelectedUserProvider'
    )
  }
  return context
}

export const SelectedUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  )
}
