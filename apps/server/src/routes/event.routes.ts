import express from 'express';
import imageUpload from '../utils/ImageUpload';

// controllers
import {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  registerToAnEvent,
  updateEvent,
  createNestedEvent,
} from '../controllers/event.controllers';
import FirebaseAuth from '../middlewares/firebase-auth';
import multer from '../utils/multer';

const router = express.Router();

router
  .route('/')
  .get(getAllEvents)
  .post(imageUpload.eventFormMulter, createEvent);

router
  .route('/:eventId')
  .get(getEvent)
  .put(imageUpload.eventFormMulter, updateEvent)
  .delete(deleteEvent);

router.route('/:eventId/register').post(FirebaseAuth, registerToAnEvent);

router
  .route('/:eventId/nested')
  .post(imageUpload.eventFormMulter, createNestedEvent);

export default router;
