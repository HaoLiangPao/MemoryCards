# Backend Development Notes

How to Start?

Step 1: *(commit : d0a3b2bd86be5145016eb0eef564ebbfdf8f679a)*

create a backend template

1. `server.js`
2. `db.js`
3. `config.env`

Step 2:

Create Error / Route handling templates

1. `ErrorResponse.js`: Everytime when we need to send an error message/status back, we can create a instance of ErrorResponse, much easier for use to change the error message or add more attributes into an ErrorResponse.
2. `ErrorHandler.js`: It is a middleware function takes care of any error cases after controller methods. We can put some common errors here such as: ValidationError, MongooseObject Error etc..
3. `AsyncHandler.js`: It is a middleware function which takes care of **try-catch** clauses in every endpoints. Instead of catch the server error in the catch clause for every endpoint, we can put the controller method into a `AyncHandler` which is an **asynchrounous function** and will call `ErrorHandler` when errors.

Step 3:

Create models, routes and controllers