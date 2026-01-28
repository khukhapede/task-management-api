import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      // Determine folder based on file field name
      let uploadPath = './uploads';

      if (file.fieldname === 'avatar') {
        uploadPath = './uploads/avatars';
      } else if (file.fieldname === 'attachment') {
        uploadPath = './uploads/attachments';
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Generate unique filename: uuid + original extension
      const uniqueName = `${uuid()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs only
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type. Only images and PDFs are allowed.'),
        false,
      );
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
};
