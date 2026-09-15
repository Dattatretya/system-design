import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextValue {
    accessToken: string | null;
    isAuthenticated: boolean;
    setAccessToken: (token: string | null) => void
    logout: ()=> void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider ({children}: AuthProviderProps){
    const [accessToken, setAccessTokenState] = useState<string | null> (null);

    function setAccessToken(token: string){
        setAccessTokenState(token)
    }

    function logout(){
        setAccessTokenState(null);
    }

    const isAuthenticated = accessToken !== null;


    return (
        <AuthContext.Provider
        value={{
            accessToken,
            isAuthenticated,
            setAccessToken,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth (){

    const context = useContext(AuthContext);

    if(!context){
        throw new Error ("useAuth must be used inside AuthProvider")
    }

    return context
}

