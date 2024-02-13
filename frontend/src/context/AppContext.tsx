import { createContext, useContext } from "react"
import { useQuery } from "react-query"
import * as apiClient from '../api-client'
 

const AppContext = createContext({
  isLoggedIn:false
})

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {

    const {isError} = useQuery("validate-token",apiClient.validateToken,{
      retry:false
    })
  return (
    <AppContext.Provider value={{
      isLoggedIn:!isError
    }}  >
        {children}
    </AppContext.Provider>
  )
}
 
export const useAppContext = () => useContext(AppContext)