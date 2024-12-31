import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { deleteImage, getallImages, uploadImage } from '../controllers/image.controller.js'
import {auth} from "../middlewares/auth.middleware.js"
const router = Router()


router.route('/upload-image').post(upload.single('image'), uploadImage)
router.route('/').get(auth, getallImages)
router.route('/:id').delete(auth, deleteImage)
export default router