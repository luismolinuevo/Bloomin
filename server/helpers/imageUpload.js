import cloudinary from '../utils/cloudinary.js';
import upload from '../middlewares/mutler.js';

const uploadImageToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(file, {}, async (err) => {
      if (err) {
        reject(err);
      } else {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          resolve(result.url);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

export default uploadImageToCloudinary;