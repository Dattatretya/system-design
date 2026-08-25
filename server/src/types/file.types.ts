export interface FileMetadata {
    id: string;
    originalName: string;
    storedName: string;
    mimeType: string;
    size: number;
    path: string;
    status:  "PENDING" | "COMPLETED";
    createdAt: string;
}