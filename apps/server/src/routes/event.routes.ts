import express from 'express';
import imageUpload from '../utils/ImageUpload';

// controllers
import {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} from '../controllers/event.controllers';
import firebaseMiddleware from '../middlewares/firebase-auth';

const router = express.Router();

router
  .route('/')
  .get(getAllEvents)
  .post(firebaseMiddleware, imageUpload.eventFormMulter, createEvent);

router
  .route('/:eventId')
  .get(getEvent)
  .put(imageUpload.eventFormMulter, updateEvent)
  .delete(firebaseMiddleware, deleteEvent);

// router.route('/:eventId/register').post(firebaseMiddleware, registerToAnEvent);

export default router;
