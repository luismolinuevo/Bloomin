// import upload from "../middlewares/mutler";
import cloudinary from "../utils/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
        });
      } else {
        console.log(result.url);
        res.status(201).json({
          success: true,
          message: "Uploaded image to cloudinary!",
          data: result.url,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export { uploadImage };
