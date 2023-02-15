import multer from 'multer';
import path from 'path';

// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // let ext = path.extname(file.originalname);
    // if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    //   cb(new Error('Unsupported file type!') as any, false);
    //   return;
    // }
    cb(null, true);
  },
});

const acceptedFields = [
  'name',
  'type',
  'category',
  'detail',
  'is_nested',
  'date_time',
  'locations',
  'schedules',
  'join_methods',
].map((field) => ({ name: field }));

export default upload.fields([
  ...acceptedFields,
  { name: 'image_src', maxCount: 1 },
]);
