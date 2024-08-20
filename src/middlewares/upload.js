import multer from 'multer';
import { storage } from '../config/cloudinary.js'; // Імпортуйте налаштування Cloudinary

const upload = multer({ storage });

export default upload;
