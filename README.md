# cheap-nyc

Rest API - https://cheapnycserver.herokuapp.com

##User
Create a new user
* Link - https://cheapnycserver.herokuapp.com/users/register
* Request - POST
* Body - name, email, password, confirmPassword

Login the user in and get a token
* Link - https://cheapnycserver.herokuapp.com/users/login
* Request - POST
* Body - email, password

##Food
Get all food posts
* Link - https://cheapnycserver.herokuapp.com/foods
* Request - GET

Get all food posts by price range
* Link - https://cheapnycserver.herokuapp.com/foods?price1=1&price2=5
* Request - GET
* Params - price1 and price2 must be a number

Create a food post
* Link - https://cheapnycserver.herokuapp.com/foods
* Request - POST
* Body - name, price, location, description
* Must be authenticate

Get that food post that match with the foodID
* Link - https://cheapnycserver.herokuapp.com/foods/:foodId
* Request - GET

Edit that food post that match with the foodID
* Link - https://cheapnycserver.herokuapp.com/foods/:foodId
* Request - PUT
* Body - name, price, location, description
* Must be authenticate

Delete that food post that match with the foodID
* Link - https://cheapnycserver.herokuapp.com/foods/:foodId
* Request - DELETE
* Must be authenticate