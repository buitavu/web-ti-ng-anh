'use client';
import { useRouter } from "next/navigation";
import Header from "../Header";

const { createContext, useEffect, useContext, useState } = require("react");

const AuthenContext = createContext({});

export const AuthenProvider = ({children}) =>{
    const route = useRouter();
    const [isToken, setIsToken] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setIsToken(true);
        }
    },[]);

    const onLogin = async(usename,password) =>{

    };

    return(
        <AuthenContext.Provider
        value={{
            onLogin
        }}
        >
            {isToken && <Header/>}
            {children}
        </AuthenContext.Provider>
    );
};

export const useAuthen = () => useContext(AuthenContext);