'use strict';

const multer = require('multer');

let name;

// tells where to store the file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // makes a unique file name
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        name = `${file.filename}-${uniqueSuffix}-${file.originalname}`;
        cb(null, name);
    },
});

// stores the file in the upload folder
const upload = multer({ storage: storage });

module.exports = { upload, name };
