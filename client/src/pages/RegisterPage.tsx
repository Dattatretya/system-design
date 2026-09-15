import type React from "react";
import { useState } from "react";
import { register } from "../services/auth.service";

interface RegisterPageProps{
    onRegistered: ()=> void;
}

function RegisterPage ({onRegistered}: RegisterPageProps){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleRegister(e: React.SubmitEvent){
        e.preventDefault();

        try{

            setLoading(true);
            setError("");

            await register(email, password);

            onRegistered();

        }
        catch(error){
            if (error instanceof Error){
                setError(error.message);
            }else{
                setError("Registration failed")
            }
        }
        finally{
            setLoading(false)
        }

    }

    return (

        <div>
            <h1>Create Account</h1>

            <form onSubmit={handleRegister}>

                <div>
                    <label>Email</label>

                    <input
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                    />

                    <label>Password</label>

                    <input
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    />

                </div>

                {error && (
                    <p>{error}</p>
                )}

                <button 
                type="submit"
                disabled={loading}
                >
                    {loading ? "Creating Account..": "Registered"}
                </button>

            </form>
        </div>

    );
}

export default RegisterPage;