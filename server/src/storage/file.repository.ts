import { db } from "../config/database.config.js";
import { FileMetadata } from "../types/file.types.js";

export async function saveFileMetaData(file: FileMetadata):Promise<void>{
    await db.query(
        `INSERT INTO files (
            id,
            original_name,
            stored_name,
            mime_type,
            size,
            storage_path,
            status,
            created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `,
        [
            file.id,
            file.originalName,
            file.storedName,
            file.mimeType,
            file.size,
            file.path,
            file.status,
            file.createdAt
        ]
    )
}

export async function getAllFiles(): Promise<FileMetadata[]>{
    const result = await db.query(`
        SELECT 
        id,
        original_name AS "originalName",
        stored_name AS "storedName",
        mime_type AS "mimeType",
        size,
        storage_path AS path,
        status,
        created_at AS "createdAt"
        FROM files
        ORDER BY created_at DESC
        `);

        return result.rows;
}

export async function getFileById(id:string):Promise<FileMetadata | null>{
   
    const result = await db.query(
        `
        SELECT 
            id,
            original_name AS "originalName",
            stored_name AS "storedName",
            mime_type AS "mimeType",
            size,
            storage_path AS path,
            status,
            created_at AS "createdAt" 
        FROM files
        WHERE id=$1`,
        [id]
    );
    
    return result.rows[0] ?? null
} 

export async function updateFileAsCompleted (fileId: string,
    file: {
        originalName: string;
        storedName: string;
        mimeType: string;
        size: number;
        path: string;
        status: "COMPLETED";
    }
){
    const result = await db.query(
        `
        UPDATE files
        SET
            original_name = $1,
            stored_name = $2,
            mime_type = $3,
            size = $4,
            storage_path = $5,
            status = $6
        WHERE id = $7
        RETURNING
            id,
            original_name AS "originalName",
            stored_name AS "storedName",
            mime_type AS "mimeType",
            size,
            storage_path AS path,
            status,
            created_at AS "createdAt"
        `,
        [
            file.originalName,
            file.storedName,
            file.mimeType,
            file.size,
            file.path,
            file.status,
            fileId
        ]
    )

    if (result.rows.length === 0){
        throw new Error ("File metadata not found")
    }

    return result.rows[0]

}