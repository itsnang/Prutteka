import express from 'express';

// controllers
import { login, signup } from '../controllers/auth.controllers';

import firebaseAuthMiddleware from '../middlewares/firebase-auth';

const router = express.Router();

router.route('/login').post(firebaseAuthMiddleware, login);
router.route('/signup').post(firebaseAuthMiddleware, signup);

export default router;
