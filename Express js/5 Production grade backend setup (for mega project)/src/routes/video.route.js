import { Router } from "express";
import {verifyJWT} from "../middlewares/authenticate.middleware.js"
import
{
    uploadVideo,
    getAllVideos
}
from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/upload").post(verifyJWT , upload.single("video1") , uploadVideo)
router.route("/get-all/").get(verifyJWT,getAllVideos)

export default router