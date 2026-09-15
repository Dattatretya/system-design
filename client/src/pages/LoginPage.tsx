import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { login } from "../services/auth.service";

function LoginPage(){

    const {setAccessToken} = useAuth();

    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.SubmitEvent){
        e.preventDefault();

        try{
            setError("");

            const data = await login(email, password);

            setAccessToken(data.accessToken);

        }
        catch(error){
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Login failed");
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>

                    <input 
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    />
                </div>

                <button type="submit">
                    Login
                </button>


                {error && <p>{error}</p>}

            </form>
        </div>
    )
}

export default LoginPage;