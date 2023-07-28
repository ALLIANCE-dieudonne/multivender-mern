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
        console.log("started upload")
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

// const deleteImage = (imageUrls) => {
//   const imageUrlsArray = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

//   const deletePromises = imageUrlsArray.map((imageUrl) => {
//     const publicId = getImagePublicId(imageUrl);
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.destroy(publicId, (error, result) => {
//         if (error) {
//           console.error("Error deleting image:", error);
//           reject({ message: "Failed to delete image. Error: " + error.message });
//         } else {
//           console.log("Image deleted successfully!");
//           console.log("Cloudinary Response:", result);
//           resolve();
//         }
//       });
//     });
//   });

//   return Promise.all(deletePromises);
// };

// const getImagePublicId = (imageUrl) => {
//   // Assuming your image URLs are in the format "https://res.cloudinary.com/<cloud_name>/<resource_type>/upload/<public_id>"
//   // Extracting the public_id from the URL
//   const urlParts = imageUrl.split("/");
//   return urlParts[urlParts.length - 1].split(".")[0];
// };

module.exports = { imageUpload, deleteImage };
