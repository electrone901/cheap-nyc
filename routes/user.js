const express = require("express");
const { body } = require("express-validator/check");

const userController = require("../controllers/user");

const router = express.Router();

router.get('/test', userController.test);

router.post('/register',
    [
        body('name')
            .trim()
            .isAlpha()
            .withMessage('Please enter a vaild first name only'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter a vaild email'),
        body('password')
            .isLength({min: 5, max: 20})
            .withMessage('Please enter password that is at least 5 characters long and not longer than 20 characters'),
        body('confirmPassword').custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Please make sure the that both passwords match');
                }
                return true;
            })
    ],
    userController.registerUser
);

router.post('/login',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter a vaild email'),
        body('password')
            .isLength({min: 5, max: 20})
            .withMessage('Please enter password that is at least 5 characters long and not longer than 20 characters')
    ],
    userController.loginUser
);

module.exports = router;