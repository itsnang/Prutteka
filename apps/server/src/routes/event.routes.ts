import express from 'express';

// controllers
import { getAllEvents, createEvent } from '../controllers/event.controllers';
import multer from '../utils/multer';

const router = express.Router();

router.route('/').get(getAllEvents).post(multer, createEvent);

export default router;
