import { BASE_URL } from "../constants/api.constant";

export async function UplopadFile (file: File) {
    const formData = new FormData()

    formData.append("file", file)

    const response = await fetch (
        BASE_URL,
        {
            method: "POST",
            body: formData
        }
    )

    if (!response.ok){
        throw new Error (`Upload failed: ${response.status}`)
    }

    return response.json();
}

export async function uploadFileDIrectlyToS3(file: File){
    const presignResponse = await fetch(`${BASE_URL}/uploads/presign`,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileName: file.name,
                contentType: file.type
            })
        }
    )

    if (!presignResponse.ok){
        throw new Error(`Failed to get upload URL: ${presignResponse.status}`)
    }

    const {url, objectKey, fileId} = await presignResponse.json();

    const uploadResponse = await fetch (url, {
        method: "PUT",
        headers:{
            "Content-Type": file.type
        },
        body: file
    })

    if (!uploadResponse.ok) {
        throw new Error(
            `S3 upload failed: ${uploadResponse.status}`
        );
    }

    const completeResponse = await fetch(`${BASE_URL}/uploads/complete`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            objectKey,
            fileName: file.name,
            fileId
        })
    })

    if(!completeResponse.ok){
        throw new Error (`Failed to save metadata: ${completeResponse.status}`)
    }

    return await completeResponse.json();
}