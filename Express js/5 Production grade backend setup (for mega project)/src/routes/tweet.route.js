import { Router } from "express";
import 
{ 
    createTweet,
    getTweetById,
    updateTweet,
    deleteTweet,

} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.route("/create-tweet").post(verifyJWT,createTweet)
router.route("/:id").get(verifyJWT,getTweetById)
router.route("/update-tweet").post(verifyJWT,updateTweet)
router.route("/delete-tweet/:id").get(verifyJWT,deleteTweet)

export default router;