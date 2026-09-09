import {Router} from "express"
import upload from "../middleware/upload.middleware.js"
import { completeUploadController, createPresignedUpload, getFile, getFiles, uploadFile } from "../controllers/upload.controller.js";
import { authenticateRequest } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/", authenticateRequest, upload.single("file") , uploadFile)

router.get("/", authenticateRequest, getFiles)

router.get("/:id", authenticateRequest, getFile)

router.post("/presign", authenticateRequest, createPresignedUpload )

router.post("/complete", authenticateRequest, completeUploadController)
    

export default router