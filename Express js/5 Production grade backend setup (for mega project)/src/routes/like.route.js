import { Router } from "express";
import {verifyJWT} from "../middlewares/authenticate.middleware.js"
import 
{
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLikes
}
from "../controllers/like.controller.js"

const router = Router()

router.route("/toogle-like-video/:id").get(verifyJWT,toggleVideoLike)
router.route("/toogle-like-comment/:id").get(verifyJWT,toggleCommentLike)
router.route("/toogle-like-tweet/:id").get(verifyJWT,toggleTweetLikes)

export default router;