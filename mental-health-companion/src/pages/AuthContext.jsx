import { createContext, useState } from "react";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login  = ()=>{
        setUser(userName)
    }
    const isAuthenticated =  () =>{
        if(user != null) return true
        else return false

    }
    return <AuthContext.Provider value={{ userName, setUserName, password, setPassword, user, setUser, login, isAuthenticated }}>{children}</AuthContext.Provider>
}