const cloudinary = require('../cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else if (file.fieldname === 'recipe') {
      folder = 'recipe';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
