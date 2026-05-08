let ImageKit = null;

try {
  ImageKit = require("@imagekit/nodejs");
} catch (error) {
  console.log("ImageKit package not installed - image uploads will be disabled");
  ImageKit = null;
}

let imagekit = null;

if (
  ImageKit &&
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT
) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}

module.exports = imagekit;
