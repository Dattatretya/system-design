import { BASE_URL } from "../constants/api.constant";

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
    const response = await fetch(`${BASE_URL}/auth/login`,
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
    const response = await fetch(`${BASE_URL}/auth/refresh`,{
        method: "POST",
        credentials: "include"
    });

    if(!response.ok){
        throw new Error(`Failed to refresh access token ${response.status}`)
    }

    const data = await response.json();

    setAccessToken(data.accessToken);

    return data.accessToken;
}