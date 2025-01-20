
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUD_KEY,       // Replace with your Cloudinary API key
  api_secret: process.env.CLOUD_SECERT,  // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
