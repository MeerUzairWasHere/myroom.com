import { createContext, useContext } from "react"

 

const AppContext = createContext({})

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <AppContext.Provider value={{user:"Uzair"}}  >
        {children}
    </AppContext.Provider>
  )
}
 
export const useAppContext = () => useContext(AppContext)