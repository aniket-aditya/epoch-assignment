const express = require('express');
const { convertNumberToWords } = require('../controllers/convertController');

const router = express.Router();

router.post('/', convertNumberToWords);

module.exports = router;
