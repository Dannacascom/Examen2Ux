const express = require('express');
const { createUser , logIn } = require('../controllers/authController');
const router = express.Router();

router.post('/createUser', createUser);
router.post('/logIn', logIn);

module.exports = router;
