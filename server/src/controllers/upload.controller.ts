import {Request, Response} from "express"
import { Readable } from "node:stream";
import { completeUpload, createFileMetadata, createPresignedUploadUrl } from "../servives/uplolad.services.js"
import { getAllFiles, getFileById } from "../storage/file.repository.js";
import path from "node:path";
import { downloadFromS3, getPresignedDownloadUrl } from "../servives/file.storage.service.js";


export async function uploadFile(req: Request, res: Response){
    if (!req.file){
        res.status(400).json({
            success:false,
            error: "No file uploaded"
        });

        return
    }
    const metadata = await createFileMetadata(req.file)

    res.status(201).json({
        success: true,
        data: metadata
    })

}

export async function getFiles(_req: Request, res: Response){
    const files = await getAllFiles()

    res.status(200).json({
        success: true,
        data: files
    })
}

export async function getFile(req: Request<{id: string}>, res: Response){

    const file = await getFileById(req.params.id);

    if(!file){
        res.status(404).json({
            success: false,
            error: "File not found"
        });
        return
    }

    const url = await getPresignedDownloadUrl(file.path)

    res.status(200).json({
        success: true,
        url
    })
}

export async function createPresignedUpload(req: Request, res: Response){
    const {fileName, contentType} = req.body

    if (!fileName || !contentType){
        res.status(400).json({
            success: false,
            error: "Filename and Content type are required"
        })
        return
    }

    const result = await createPresignedUploadUrl(fileName, contentType)


    res.status(200).json({
        success: true,
        url: result.url,
        objectKey: result.objectKey,
        fileId: result.fileId
    });
}

export async function completeUploadController (req: Request, res: Response){
    const {
        objectKey,
        fileName, fileId
    } = req.body


    if (!objectKey || !fileName || !fileId ){
            return res.status(400).json({
                success: false,
                error: "Missing file metadata"
            })
        }

    const metadata = await completeUpload(
        objectKey,
        fileName,
        fileId
    )

    res.status(201).json({
        success: true,
        file: metadata
    })
}