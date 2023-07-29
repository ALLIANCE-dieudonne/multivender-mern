const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dw3oy1kwb",
  api_key: "398863727963285",
  api_secret: "i5ybWRvpFwp0vh76OFl4ErmDPNo",
});

const imageUpload = (files, folder) => {
  const filesArray = Array.isArray(files) ? files : [files];

  const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
    folder: folder,
    maxWidth: 800, // Set the desired max width
    maxHeight: 800, // Set the desired max height
    quality: 0.7,
  };

  const uploadPromises = filesArray.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, opts, (error, result) => {
        if (result && result.secure_url && result.public_id) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          reject({ message: error && error.message });
        }
      });
    });
  });

  return Promise.all(uploadPromises);
};

const deleteImage = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error("Error deleting image:", error);
        reject({ message: "Failed to delete avatar. Error: " + error.message });
      } else {
        console.log("Image deleted successfully!");
        console.log("Cloudinary Response:", result);
        resolve();
      }
    });
  });
};



module.exports = { imageUpload, deleteImage };
