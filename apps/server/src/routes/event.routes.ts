import express from 'express';

// controllers
import { getAllEvents } from '../controllers/event.controllers';

const router = express.Router();

router.route('/').get(getAllEvents);

export default router;
