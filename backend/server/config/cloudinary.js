// backend/firebaseAdmin.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name:Process.env.cloud_name,//'',
  api_key:Process.env.cloud_api_key,//'',
  api_secret:Process.env.cloud_api_secret,//'',
});

export default cloudinary;

