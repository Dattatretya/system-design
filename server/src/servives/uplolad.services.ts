import { randomUUID } from "node:crypto";
import { saveFileMetaData, updateFileAsCompleted } from "../storage/file.repository.js";
import { FileMetadata } from "../types/file.types.js";
import { getPresignedUploadUrl, uploadToS3, verifyS3Object } from "./file.storage.service.js";

export async function createFileMetadata (file: Express.Multer.File): Promise<FileMetadata>{
    
    const objectKey = `files/${randomUUID()}-${file.originalname}`
    
    const metadata: FileMetadata = {
        id: randomUUID(),
        originalName: file.originalname,
        storedName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        path: objectKey,
        status: "COMPLETED",
        createdAt: new Date().toISOString()
    }

    await saveFileMetaData(metadata);

    return metadata
};

export async function createPresignedUploadUrl(fileName: string, contentType: string){
    const objectKey = `files/${randomUUID()}-${fileName}`

    const fileId = randomUUID()

    const metadata: FileMetadata = {
        id: fileId,
        originalName: fileName,
        storedName: fileName,
        mimeType: contentType,
        size: 0,
        path: objectKey,
        status: "PENDING",
        createdAt: new Date().toISOString()
    };

    await saveFileMetaData(metadata);

    const url = await getPresignedUploadUrl(objectKey, contentType);
    

    return {
        fileId, url, objectKey
    }
}

export async function completeUpload (
    objectKey: string,
    fileName: string,
    fileId: string
){
    const s3Object = await verifyS3Object(objectKey)

    const metadata = await updateFileAsCompleted(fileId,{
        originalName: fileName,
        storedName: objectKey,
        mimeType: s3Object.contentType || "application/octet-stream",
        size: s3Object.size || 0,
        path: objectKey,
        status: "COMPLETED",
    })

    return metadata

}