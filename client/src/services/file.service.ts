import { BASE_URL } from "../constants/api.constant";
import type { FileMetaData } from "../types/file.types";

export async function getFiles(): Promise<FileMetaData[]>{
    const response = await fetch(`${BASE_URL}/uploads`)

    if(!response.ok){
        throw new Error(`Failed to fetch files: ${response.status}`)
    }

    const result = await response.json()

    return result.data;
}

export async function getFileDownloadUrl(id: string): Promise<string>{
    const response = await fetch(`${BASE_URL}/uploads/${id}`)

    if (!response.ok){
        throw new Error(`Failed to get download URL: ${response.status}`)
    }

    const result = await response.json();

    return result.url;
}