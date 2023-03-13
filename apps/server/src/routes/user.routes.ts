import express from 'express';

// controllers
import { createUser } from '../controllers/user.controllers';
import {
  getEventsByUser,
  updateProfile,
  getUser,
  updateProfileImage,
} from '../controllers/user-event.controller';

import firebaseMiddleware from '../middlewares/firebase-auth';

import imageUpload from '../utils/ImageUpload';

const router = express.Router();

router.route('/').post(firebaseMiddleware, createUser);
router.route('/:userId').get(getUser).patch(updateProfile);
router
  .route('/:userId/image')
  .put(imageUpload.multer(['image_src', 'old_image_src']), updateProfileImage);
router.route('/:userId/events').get(getEventsByUser);

export default router;
