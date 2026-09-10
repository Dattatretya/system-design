import { AUTH_BASE_URL } from "../constants/api.constant";

let accessToken : string | null = null;

export function setAccessToken(token: string){
    accessToken = token;
}

export function getAccessToken(){
    return accessToken
}

export function clearAccessToken(){
    accessToken = null;
}

export async function login(email: string, password: string){
    const response = await fetch(`${AUTH_BASE_URL}/login`,
        {
            method: "POST",
            headers:{
                "content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password
            })
        }
    )

    if (!response.ok){
        throw new Error(`Login failed ${response.status}`)
    }

    const data = await response.json();

    setAccessToken(data.data.accessToken);

    return data.data
}

export async function refreshAccessToken(){
    const response = await fetch(`${AUTH_BASE_URL}/refresh`,{
        method: "POST",
        credentials: "include"
    });

    if(!response.ok){
        clearAccessToken();

        throw new Error(`Failed to refresh access token ${response.status}`)
    }

    const data = await response.json();

    setAccessToken(data.accessToken);

    return data.accessToken;
}

export async function logout (){
    try{
        await fetch(`${AUTH_BASE_URL}/logout`,
            {
                method: "POST",
                credentials: "include"
            }
        );
    }
    finally{
        clearAccessToken();
    }
}