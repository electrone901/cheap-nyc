const express = require('express');
const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;

const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");

const app = express();

app.use('/users', userRoutes);
app.use('/foods', foodRoutes);

app.get('/', (req, res) => res.send('It Working'));

const port = process.env.PORT || 8080;

mongoose.connect(db, { useNewUrlParser: true })
    .then(result => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => {
        console.log(err);
    });