const express = require("express");
const passport = require('passport');

const foodController = require("../controllers/food");

const router = express.Router();

router.get('/test', foodController.test);

router.get('/', foodController.findFoods);

router.post('/', passport.authenticate('jwt', {session: false}), foodController.createFood);

module.exports = router;