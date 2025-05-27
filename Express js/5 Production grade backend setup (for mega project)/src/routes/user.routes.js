import {Router} from 'express'
import {registerUser,loginUser,logoutUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from '../middlewares/authenticate.middleware.js';

const router = Router()

router.route("/register").post(
    upload.fields([                 // here we injected Middleware and choose to upload multiple fields
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),

    registerUser
)

router.route("/login").post(loginUser)

// secured Routes

router.route("/logout").post(verifyJWT, logoutUser)


export default router;