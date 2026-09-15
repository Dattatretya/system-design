import { useState } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

type AuthPage = "register" | "login";

function AppContext() {

  const {isAuthenticated} = useAuth();

  const [authPage, setAuthPage] = useState<AuthPage>("register")

  if (authPage === "register"){
    return (
      <RegisterPage
      onRegistered={()=> setAuthPage("login")}
      />
    );
  }

  if(!isAuthenticated){
    return <LoginPage/> 
  }

  if(isAuthenticated){
    return <HomePage/>
  }

}

function App(){

  return (
    <AuthProvider>
    <AppContext/>
    </AuthProvider>
  )
}

export default App;
