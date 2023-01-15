import { createContext, useContext } from "react"
export type GlobalContent = {
    loggedIn: boolean
    setLoggedIn: (c: boolean) => void
    userID: string
    setUserID: (c: string) => void
    username: string
    setUsername: (c: string) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
    loggedIn: false, // set a default value
    setLoggedIn: () => { },
    userID: "",
    setUserID: () => { },
    username: "",
    setUsername: () => { }
})
export const useGlobalContext = () => useContext(MyGlobalContext)