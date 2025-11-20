import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads/');

const createStorage = (prefix) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const cvFileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
};

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype.toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only JPEG, PNG, or WEBP images are allowed'));
};

export const cvUpload = multer({
  storage: createStorage('cv'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: cvFileFilter
});

export const imageUpload = multer({
  storage: createStorage('profile'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFileFilter
});
