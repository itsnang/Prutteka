import express from 'express';

// controllers
import {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
} from '../controllers/event.controllers';
import multer from '../utils/multer';

const router = express.Router();

router.route('/').get(getAllEvents).post(multer, createEvent);

router.route('/:eventId').get(getEvent).delete(deleteEvent);

export default router;
