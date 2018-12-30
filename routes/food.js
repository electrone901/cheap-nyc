const express = require("express");
const passport = require('passport');
const { body } = require("express-validator/check");

const foodController = require("../controllers/food");

const router = express.Router();

router.get('/test', foodController.test);

router.get('/', foodController.findFoods);

router.post('/', passport.authenticate('jwt', {session: false}),
    [
        body('name')
            .trim()
            .isLength({min: 2, max: 30})
            .withMessage('Please enter a name that is least 2 characters long and not longer than 30 characters'),
        body('price')
            .isNumeric()
            .withMessage('Please enter a vaild price, ex - 1.99'),
        body('location')
            .isLength({min: 10, max: 70})
            .withMessage('Please enter a vaild location'),
        body('description')
            .trim()
            .isLength({min: 5, max: 300})
            .withMessage('Please enter a description that is least 5 characters long and not longer than 300 characters')
    ],
    foodController.createFood
);

router.get('/:foodId', foodController.findFood);

module.exports = router;