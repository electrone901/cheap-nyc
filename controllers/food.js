const { validationResult } = require("express-validator/check");

const Food = require("../models/Food");

exports.test = (req, res, next) => {
    res.json({msg: "Foods route works"});
};

exports.findFoods = (req, res, next) => {
    const type = req.query.type;
    
    switch(type){
        case 'price':
            const lowPrice = req.query.price1;
            const highPrice = req.query.price2;
            
            Food.find({price: {$lte: highPrice, $gte:lowPrice}})
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all foods with price range from $" + lowPrice + " to $" + highPrice,
                        foods: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
            break;
        case 'name':
            const foodName = req.query.name;
            
            Food.find({name: foodName})
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all foods that match with " + foodName,
                        foods: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
            break;
        default:
            Food.find()
                .then(result => {
                    res.status(200).json({
                        msg: "Success on finding all foods",
                        foods: result
                    });
                })
                .catch(err => {
                    return res.status(500).json({error: err});
                });
    }
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
                food: food
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.findFood = (req, res, next) => {
    const foodId = req.params.foodId;
    
    Food.findById(foodId)
        .then(food => {
            if(!food){
                return res.status(404).json({error: 'Food post not found'});
            }
            res.status(200).json({
                msg: 'Success on finding that food post',
                food: food
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
        
};

exports.editFood = (req, res, next) => {
    const foodId = req.params.foodId;
    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const description = req.body.description;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
    }
    
    Food.findById(foodId)
        .then(food => {
            if(!food){
                return res.status(404).json({error: 'Food post not found'});
            }
            
            if(food.userId.toString() !== req.user.id){
                return res.status(403).json({error: 'You are not allow to edit this food post'});
            }
            
            food.name = name;
            food.price = price;
            food.location = location;
            food.description = description;
            
            return food.save();
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on editing that food post',
                food: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};

exports.removeFood = (req, res, next) => {
    const foodId = req.params.foodId;
    Food.findById(foodId)
        .then(food => {
            if(!food){
                return res.status(404).json({error: 'Food post not found'});
            }
            
            if(food.userId.toString() !== req.user.id){
                return res.status(403).json({error: 'You are not allow to delete this food post'});
            }
            
            return Food.findByIdAndRemove(foodId);
        })
        .then(result => {
            res.status(200).json({
                msg: 'Success on deleting that food post',
                food: result
            });
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
};