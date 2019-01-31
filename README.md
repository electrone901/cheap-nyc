# cheap-nyc

Rest API - https://cheapnycserver.herokuapp.com

## User
---
Link - https://cheapnycserver.herokuapp.com/users/register
* Description - Create a new user
* Request - POST
* Body - name, email, password, confirmPassword

Link - https://cheapnycserver.herokuapp.com/users/login
* Description - Login the user in and get a token
* Request - POST
* Body - email, password

## Food
---
Link - https://cheapnycserver.herokuapp.com/foods
* Description - Get all food posts
* Request - GET

Link - https://cheapnycserver.herokuapp.com/foods
* Description - Create a food post
* Request - POST
* Body - name, price, location, description
* Must be authenticate

Link - https://cheapnycserver.herokuapp.com/foods/:foodId
* Description - Get that food post that match with the foodID
* Request - GET

Link - https://cheapnycserver.herokuapp.com/foods/:foodId
* Description - Edit that food post that match with the foodID
* Request - PUT
* Body - name, price, location, description
* Must be authenticate

Link - https://cheapnycserver.herokuapp.com/foods/:foodId
* Description - Delete that food post that match with the foodID
* Request - DELETE
* Must be authenticate