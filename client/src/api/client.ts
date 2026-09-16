import { getAccessToken } from "../services/auth.service";

const BASE_URL = "http://localhost:3000/api/v1"

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T>{
    
    const token = getAccessToken();

    const headers = new Headers(options.headers);

    if(token){
        headers.set("Authorization", `Bearer ${token}`);
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include"
    });

    if (!response.ok){
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}