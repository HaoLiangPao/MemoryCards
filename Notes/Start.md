# Backend Development Notes for Biginnners

## How to Start?

#### Step 1: 

*Example code is available here (commit : [d0a3b2bd86be5145016eb0eef564ebbfdf8f679a](https://github.com/HaoLiangPao/MemoryCards/commit/d0a3b2bd86be5145016eb0eef564ebbfdf8f679a))*

create a backend template

1. `server.js`
2. `db.js`
3. `config.env`

#### Step 2: 

Example code is available here *(commit : [eeafb7aba295b55a4cfda2d0894e469c4ebecfeb](https://github.com/HaoLiangPao/MemoryCards/commit/eeafb7aba295b55a4cfda2d0894e469c4ebecfeb))*

Create Error / Route handling templates

1. `ErrorResponse.js`: Everytime when we need to send an error message/status back, we can create a instance of ErrorResponse, much easier for use to change the error message or add more attributes into an ErrorResponse.
2. `ErrorHandler.js`: It is a middleware function takes care of any error cases after controller methods. We can put some common errors here such as: ValidationError, MongooseObject Error etc..
3. `AsyncHandler.js`: It is a middleware function which takes care of **try-catch** clauses in every endpoints. Instead of catch the server error in the catch clause for every endpoint, we can put the controller method into a `AyncHandler` which is an **asynchrounous function** and will call `ErrorHandler` when errors.

#### Step 3:

Example code is available here *(commit : [dbee2fc776fe2dbebf5590d6b7b40340b026f83f](https://github.com/HaoLiangPao/MemoryCards/commit/dbee2fc776fe2dbebf5590d6b7b40340b026f83f))*

Create models, routes and controllers

1. `models/Memocollection.js`
2. `routes/memoCollections.js`
3. `controllers/memoCollections.js`

#### Step 4: 

Start implementing based on customized design

Simple CRUD template:

```javascript
// @desc        Get all collections
// @route       GET /api/v1/collections
// @access      Public
exports.getCollections = AsyncHandler(async (req, res, next) => {
  // search collections from the database
  const collections = await MemoCollection.find();
  res
    .status(200)
    .json({ success: true, count: collections.length, data: collections }); // could get results send by this middleware function in this way
});
```

Step 5: (Optional)

Create data seeder which can quickly manipulate your database, which makes testing and developing much easier.

1. `_data` folder:
2. `seeder.js`: Connect to the database seperately, fetch testing data from `_data` folder and **add/remove** them **to/from** the database.

---

> ***Hope this starter template can help beginners like me to start development of a backend API service.***

Hao

2020.06.25