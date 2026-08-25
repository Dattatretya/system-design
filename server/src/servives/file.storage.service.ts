import { createReadStream } from "node:fs";
import {s3} from "../config/s3.config.js"
import { PutObjectCommand, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.S3_BUCKET_NAME;

export async function uploadToS3(file: Express.Multer.File, objectKey: string):Promise<void>{
    const fileStream = createReadStream(file.path)

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: objectKey,
        Body: fileStream,
        ContentType: file.mimetype
    })


    console.log("bucket", process.env.S3_BUCKET_NAME)

    await s3.send(command)
}

export async function downloadFromS3(objectKey: string){
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: objectKey
    })

    const response = await s3.send(command)
    return response
}

export async function getPresignedDownloadUrl(objectKey: string):Promise<string>{
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: objectKey
    });

    const url = await getSignedUrl(s3, command, {
        expiresIn: 900
    });

    return url
}

export async function getPresignedUploadUrl(objectKey: string, contentType: string):Promise<string>{
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: objectKey,
        ContentType: contentType
    })

    return getSignedUrl(s3, command, {
        expiresIn: 900
    })
}

export async function verifyS3Object(objectKey: string) {
    const command = new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: objectKey
    });

    const response = await s3.send(command)

    return {
        contentType: response.ContentType,
        size: response.ContentLength
    }
}