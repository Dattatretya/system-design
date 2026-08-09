const BASE_URL = "http://localhost:3000/api/v1"

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T>{
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok){
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}