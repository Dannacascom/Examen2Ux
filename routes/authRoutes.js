const express = require('express');
const { createUser , logIn , logOut} = require('../controllers/authController');
const router = express.Router();

router.post('/createUser', createUser);
router.post('/logIn', logIn);
router.post('/logOut', logOut);

module.exports = router;
