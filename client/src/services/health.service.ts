import { api } from "../api/client";
import type { HealthResponse } from "../types/heath.types";

export async function getHealth(): Promise<HealthResponse>{
    return api<HealthResponse>("/")
}