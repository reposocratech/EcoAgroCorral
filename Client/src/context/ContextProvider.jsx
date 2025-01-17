import { createContext, useEffect, useState } from "react"
import { fetchData } from "../helpers/axiosHelper";
<<<<<<< HEAD

export const AgroContext = createContext(); 

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

=======
export const AgroContext = createContext();
export const ContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
>>>>>>> 717e3a86530afddbd304ecda94fd5621a2659a3f
  useEffect(()=>{
    const fetchUser = async (token)  =>{
      try {
        const userResult = await fetchData("api/user/findUserById", "get", null,{Authorization:`Bearer ${token}`});
        setUser(userResult);
      } catch (error) {
        console.log(error);
      }
    }
    const tokenLocal = localStorage.getItem("token");
    if(tokenLocal){
      fetchUser(tokenLocal)
      setToken(tokenLocal)
    }
  }, [])
<<<<<<< HEAD


=======
>>>>>>> 717e3a86530afddbd304ecda94fd5621a2659a3f
  return (
    <AgroContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </AgroContext.Provider>
  )
}