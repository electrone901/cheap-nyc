const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get('/test', userController.test);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;