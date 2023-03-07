import express from 'express';

// controllers
import {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  registerToAnEvent,
} from '../controllers/event.controllers';
import FirebaseAuth from '../middlewares/firebase-auth';
import multer from '../utils/multer';

const router = express.Router();

router.route('/').get(getAllEvents).post(multer, createEvent);

router.route('/:eventId').get(getEvent).delete(deleteEvent);

router.route('/:eventId/register').post(FirebaseAuth, registerToAnEvent);

export default router;
