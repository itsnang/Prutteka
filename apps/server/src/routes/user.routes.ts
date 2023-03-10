import express from 'express';

// controllers
import { createUser } from '../controllers/user.controllers';
import {
  getEventsByUser,
  updateProfile,
  getUser,
} from '../controllers/user-event.controller';

import firebaseMiddleware from '../middlewares/firebase-auth';

const router = express.Router();

router.route('/').post(firebaseMiddleware, createUser);
router.route('/:userId').get(getUser).patch(updateProfile);
router.route('/:userId/events').get(getEventsByUser);

export default router;
