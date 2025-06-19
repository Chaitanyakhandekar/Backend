import { Router } from "express";
import {verifyJWT} from "../middlewares/authenticate.middleware.js"
import 
{
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLikes,
    getVideoLikesCount,
     getCommentLikesCount,
    getTweetLikesCount
}
from "../controllers/like.controller.js"

const router = Router()

router.route("/toogle-like-video/:id").get(verifyJWT,toggleVideoLike)
router.route("/toogle-like-comment/:id").get(verifyJWT,toggleCommentLike)
router.route("/toogle-like-tweet/:id").get(verifyJWT,toggleTweetLikes)
router.route("/likes-count-video/").get(verifyJWT,getVideoLikesCount)
router.route("/likes-count-comment/").get(verifyJWT,getCommentLikesCount)
router.route("/likes-count-tweet/").get(verifyJWT,getTweetLikesCount)

export default router;