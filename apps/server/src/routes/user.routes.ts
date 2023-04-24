import express from 'express';

// controllers
import { updateUser, getEventsByUser } from '../controllers/user.controllers';
import firebaseMiddleware from '../middlewares/firebase-auth';

import imageUpload from '../utils/ImageUpload';

const router = express.Router();

router
  .route('/:userId')
  .patch(firebaseMiddleware, imageUpload.multer(['image']), updateUser);

// router
//   .route('/:userId/image')
//   .put(imageUpload.multer(['image_src', 'old_image_src']), updateProfileImage);

router.route('/:userId/events').get(getEventsByUser);

export default router;
