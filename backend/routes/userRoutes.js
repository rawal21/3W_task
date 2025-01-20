const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../utils/cloudinaryConfig");
const User = require('../models/Users');

const router = express.Router();

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social-media-task', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
  },
});

const upload = multer({ storage });

// POST: Add a new user
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const images = req.files.map((file) => file.path); // Store Cloudinary URLs
    const user = new User({ name, socialHandle, images });
    await user.save();
    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
