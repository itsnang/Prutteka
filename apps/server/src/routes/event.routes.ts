import express from 'express';
import imageUpload from '../utils/ImageUpload';

// controllers
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  createNestedEvent,
} from '../controllers/event.controllers';

const router = express.Router();

router
  .route('/')
  .get(getAllEvents)
  .post(imageUpload.eventFormMulter, createEvent);

router
  .route('/:eventId')
  .get(getEvent)
  .put(imageUpload.eventFormMulter, updateEvent);

router
  .route('/:eventId/nested')
  .post(imageUpload.eventFormMulter, createNestedEvent);

export default router;
