import { Router } from "express";
import upload from "../middlewares/mutler.js";
import * as imageUploadControllers from "../controllers/imageupload.js";

const router = Router();

router.post(
  "/upload",
  upload.single("image"),
  imageUploadControllers.uploadImage
);

export default router;