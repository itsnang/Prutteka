import express from 'express';

// controllers
import { createUser } from '../controllers/user.controllers';

import firebaseMiddleware from '../middlewares/firebase-auth';

const router = express.Router();

router.route('/').post(firebaseMiddleware, createUser);

export default router;
