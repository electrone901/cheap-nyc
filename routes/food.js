const express = require("express");

const foodController = require("../controllers/food");

const router = express.Router();

router.get('/test', foodController.test);

module.exports = router;