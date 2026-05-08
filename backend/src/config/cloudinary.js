let cloudinary = null;

try {
  const cloudinaryPackage = require("cloudinary");
  if (cloudinaryPackage) {
    cloudinary = cloudinaryPackage.v2;
    
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    }
  }
} catch (error) {
  console.log("Cloudinary package not installed - image uploads will be disabled");
  cloudinary = null;
}

module.exports = cloudinary;