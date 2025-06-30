import {Router} from "express"
import {registerUser,
        loginUser, 
        logout,
        getCurrentUser,
        refreshAccessToken,
        changePassword,
        changeUsername,
        changeEmail,
        deleteUser,
        changeAvatar,
        changeCoverImage,
        changeBio,
        getUserById
    } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(upload.fields([
    {
    name: "avatar",
    maxCount:1
    },
    {
        name: "coverImage",
        maxCount:1
    }
]),registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logout)
router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
router.route("/User").get(verifyJWT, getCurrentUser)
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/change-username").post(verifyJWT, changeUsername)
router.route("/change-email").post(verifyJWT, changeEmail)
router.route("/delete").post(verifyJWT, deleteUser)
router.route("/change-avatar").post(verifyJWT, upload.single('avatar'),changeAvatar)
router.route("/change-coverImage").post(verifyJWT, upload.single('coverImage'),changeCoverImage)
router.route("/change-bio").post(verifyJWT, changeBio)
router.route("/get-user-by-id/:id").get(getUserById)

export default router