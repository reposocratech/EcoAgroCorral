import { createContext, useEffect, useState } from "react"
import { fetchData } from "../helpers/axiosHelper";

export const AgroContext = createContext();

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(()=>{
    const fetchUser = async (token)  =>{
      try {
        const userResult = await fetchData("api/user/findUserById", "get", null,{Authorization:`Bearer ${token}`});
        setUser(userResult);
      } catch (error) {
        
      }
    }
    const tokenLocal = localStorage.getItem("token");
    if(tokenLocal){
      fetchUser(tokenLocal)
      setToken(tokenLocal)
    }
  }, [])

  return (
    <AgroContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </AgroContext.Provider>
  )
}