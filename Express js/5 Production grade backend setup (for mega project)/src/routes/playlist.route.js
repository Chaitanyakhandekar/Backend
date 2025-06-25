import { Router } from "express";
import 
{
    createPlaylist,
    updatePlaylist,
    addVideoToPlaylist
}
from "../controllers/playlist.controller.js"
import { verifyJWT } from "../middlewares/authenticate.middleware.js";
import {validateOwnership} from "../middlewares/validateOwnership.middleware.js"

const router = Router()

router.route("/create").post(verifyJWT,createPlaylist)
router.route("/update").patch(verifyJWT,validateOwnership,updatePlaylist)
router.route("/add-video").post(verifyJWT,validateOwnership,addVideoToPlaylist)

export default router;