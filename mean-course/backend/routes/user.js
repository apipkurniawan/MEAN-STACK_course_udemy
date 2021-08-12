const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();


// method APIs
router.post('/signup', UserController.createUser);

router.get('', UserController.getAllUser);

router.post('/login', UserController.userLogin);


module.exports = router;