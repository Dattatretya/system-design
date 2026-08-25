import {Router} from "express"
import upload from "../middleware/upload.middleware.js"
import { completeUploadController, createPresignedUpload, getFile, getFiles, uploadFile } from "../controllers/upload.controller.js";

const router = Router()

router.post("/", upload.single("file") , uploadFile)

router.get("/", getFiles)

router.get("/:id", getFile)

router.post("/presign", createPresignedUpload )

router.post("/complete", completeUploadController)
    

export default router