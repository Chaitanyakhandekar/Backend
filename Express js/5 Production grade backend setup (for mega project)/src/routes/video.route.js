import { Router } from "express";
import {verifyJWT} from "../middlewares/authenticate.middleware.js"
import
{
    uploadVideo
}
from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/upload").post(verifyJWT , upload.single("video1") , uploadVideo)

export default router