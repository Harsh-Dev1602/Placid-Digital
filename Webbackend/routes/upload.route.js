import express from 'express';
import upload from "../middleware/multer.js"
import { deleteUploadImg, uploadImg } from '../controllers/upload.controller.js';

const router = express.Router();
// Upload Img
router.post("/upload-img", upload.single("image"),uploadImg)
router.delete("/upload-img-delete",deleteUploadImg)

export default router;