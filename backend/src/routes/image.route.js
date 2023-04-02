const express = require('express');

const {
  processImageController,
} = require('../controller/image.controller');
const router = express.Router();

router.post(
  '/process',
  processImageController
);

module.exports = router;
