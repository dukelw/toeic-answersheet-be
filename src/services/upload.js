const cloudinary = require("../configs/cloudinary");

const uploadImageFromUrl = async () => {
  try {
    const urlImage =
      "https://e7.pngegg.com/pngimages/458/39/png-clipart-mobile-banking-computer-icons-bank-service-logo.png";
    const folderName = "toeic/answers";
    const newFileName = "demo";

    const result = await cloudinary.uploader.upload(urlImage, {
      public_id: newFileName,
      folder: folderName,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const uploadImageFromLocal = async ({
  path,
  folderName = "toeic/answers",
  name = "image",
}) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: name,
      folder: folderName,
    });
    return {
      img_url: result.secure_url,
      thumb_url: cloudinary.url(result.public_id, {
        height: 100,
        width: 100,
      }),
    };
  } catch (error) {
    console.error(error);
  }
};

const uploadAudioFromLocal = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      resource_type: "video",
    });
    return { audio_url: result.secure_url };
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

module.exports = {
  uploadImageFromUrl,
  uploadImageFromLocal,
  uploadAudioFromLocal,
};
