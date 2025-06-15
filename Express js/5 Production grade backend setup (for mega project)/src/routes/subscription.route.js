import {Router} from "express"
import {verifyJWT} from "../middlewares/authenticate.middleware.js"
import{
    subscribeToUser,
    unsubscribeFromUser,
    getUserSubscribers,
    getUserSubscriptions,
    isSubscribedToUser,
}from "../controllers/subscription.controller.js"

const router = Router()

router.route("/subscribe/:channel").get(verifyJWT,subscribeToUser)
router.route("/unsubscribe/:channel").get(verifyJWT,unsubscribeFromUser)



export default router;