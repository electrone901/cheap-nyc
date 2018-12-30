const Food = require("../models/Food");

exports.test = (req, res, next) => {
    res.json({msg: "Foods route works"});
};

exports.createFood = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const description = req.body.description;
    const userId = req.user.id;
    
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