import { createContext, useState } from "react"

export const AgroContext = createContext(); 

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  return (
    <AgroContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </AgroContext.Provider>
  )
}
