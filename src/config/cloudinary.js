import { v2 as cloudinary } from 'cloudinary';
import router from '../routes/contacts.js';
import upload from '../middlewares/upload.js';
import fs from 'fs';
import path from 'path';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads/', req.file.filename);
    const result = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    res.status(200).json({
      message: 'File successfully uploaded to Cloudinary!',
      fileUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while uploading the file', error });
  }
});

export { cloudinary };
