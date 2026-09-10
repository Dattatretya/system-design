import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextValue {
    accessToken: string | null;
    isAuthenticated: boolean;
    setAccessToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider ({children}: AuthProviderProps){
    const [accessToken, setAccessToken] = useState<string | null> (null);

    return (
        <AuthContext.Provider
        value={{
            accessToken,
            isAuthenticated: accessToken !== null,
            setAccessToken
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

