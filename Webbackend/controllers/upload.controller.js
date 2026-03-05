import cloudinary from "../config/cloudinary.js";

// Upload Img API
export const uploadImg = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      localPath: req.file.path,       
      fileName: req.file.filename,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Delete Img API      
export const deleteUploadImg = async (req, res) => {
  try {
    const { publicId } = req.body;

    console.log("Public ID Received:", publicId); // 👈 ADD THIS

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "publicId is required",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Cloudinary Result:", result); // 👈 ADD THIS

    if (result.result !== "ok") {
      return res.status(400).json({
        success: false,
        message: "Image not found or already deleted",
      });
    }

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};