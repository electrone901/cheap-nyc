const { validationResult } = require("express-validator/check");

const Food = require("../models/Food");

exports.test = (req, res, next) => {
    res.json({msg: "Foods route works"});
};

exports.findFoods = (req, res, next) => {
    Food.find()
        .then(result => {
            res.status(200).json({
                msg: "Success on finding all foods",
                foods: result
            });
        });
};

exports.createFood = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const description = req.body.description;
    const userId = req.user.id;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }
    
    const food = new Food({
        name: name,
        price: price,
        location: location,
        description: description,
        userId: userId
    });
    
    food.save()
        .then(result => {
            res.status(201).json({
                msg: "Success on creating a food post",
                food: result
            });
        })
        .catch(err => console.log(err));
};

exports.findFood = (req, res, next) => {
    const foodId = req.params.foodId;
    
    Food.findById(foodId)
        .then(food => {
            if(!food){
                return res.status(404).json({error: 'Food post not found'});
            }
            res.status(200).json({
                msg: 'Success on finding that post',
                food: food
            });
        })
        .catch(err => console.log(err));
        
};