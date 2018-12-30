const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator/check");

const keys = require('../config/keys');
const User = require('../models/User');

exports.test = (req, res, next) => {
    res.json({msg: "Users route works"});
};

exports.registerUser = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({email: 'Email Already Exists'});
            }
            else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                
                bcrypt.genSalt(10, (err, salt) => {
                    if(err){
                        return res.status(500).json({error: err});
                    }
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            return res.status(500).json({error: err});
                        }
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.status(201).json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
};

exports.loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }

    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: 'User email not found'});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {id: user.id, name: user.name};

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err){
                                    return res.status(500).json({error: err});
                                }
                                res.status(201).json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                        });
                    }
                    else{
                        return res.status(400).json({password: 'Password Incorrect'});
                    }
                });
        });
};