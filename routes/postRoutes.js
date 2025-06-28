const express = require('express');
const {createPost} = require('../controllers/postController');
const router = express.Router();

router.post('/createPost', createPost);

module.exports = router;
