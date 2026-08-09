import { useState, useEffect } from "react";
import type { HealthResponse } from "../types/heath.types";
import { getHealth } from "../services/health.service";
import UploadFiles from "../components/UploadFiles";

function HomePage(){

    const [health, setHealth] = useState<HealthResponse | null>(null);

    useEffect(()=>{
        async function loadHealth(){
            const response = await getHealth()
            setHealth(response)
        }
        loadHealth();
    },[])

    return (
        <div>
            <h1>Drivelite</h1>
            <pre>
                {JSON.stringify(health, null, 2)}
            </pre>
            <UploadFiles/>
        </div>
    )
}

export default HomePage