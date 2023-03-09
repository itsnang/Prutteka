import multer, { MulterError } from 'multer';
import sharp from 'sharp';

import cloudinary, { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//wrapper to use cloudinary to upload Buffer which is returned from sharp
const bufferUpload = async (
  buffer: UploadApiOptions
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const writeStream = cloudinary.v2.uploader.upload_stream((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result as UploadApiResponse);
    });
    const readStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    readStream.pipe(writeStream);
  });
};

// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    //filename can be file/jpeg or file/jpg or ...
    let fileName: string | string[] = file.mimetype;
    const sppFileType = ['jpeg', 'jpg', 'png', 'webp'];

    if (!fileName.includes('image'))
      return cb(
        new MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Unsupported file type!'
        ) as any,
        false
      );

    fileName = fileName.split('/');

    if (
      fileName.length != 2 ||
      sppFileType.every((file) => fileName[1] != file)
    )
      return cb(
        new MulterError(
          'LIMIT_UNEXPECTED_FILE',
          'Unsupported file type!'
        ) as any,
        false
      );

    cb(null, true);
  },
});

class ImageUpload {
  multer(acceptedFields: string[]) {
    return upload.fields(acceptedFields.map((field) => ({ name: field })));
  }

  sharp(image_path: string) {
    return sharp(image_path)
      .resize({ width: 500 })
      .webp({ quality: 80 })
      .toBuffer();
  }

  cloudinary(buffer: UploadApiOptions) {
    return bufferUpload(buffer);
  }

  #eventFormFields = [
    'name',
    'type',
    'category',
    'detail',
    'is_nested',
    'date_time',
    'locations',
    'schedules',
    'join_methods',
    'image_src',
  ];

  eventFormMulter = this.multer(this.#eventFormFields);
}

const imageUpload = new ImageUpload();

export default imageUpload;
