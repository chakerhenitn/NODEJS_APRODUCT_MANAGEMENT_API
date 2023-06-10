const express = require("express");
const productRoutes = require("./Routes/product.route");
const dotenv = require('dotenv').config();


const app = express();
//middlware to parse data from body content type application json
app.use(express.json());
//middlware to parse data type urlencoded
app.use(express.urlencoded({ extended: true }));


//initialize DB from the initDB ()=>
require('./initDB')();

//handle the products route by expres

app.use("/products", productRoutes);


//this middleware used to be handled if there is no route

//404 handler
app.use((req, res, next) => {   
  /* const err = new Error("Not Found");
  err.status = 404;
  next(err); */
next(createError(404, 'NOT FOUND'))
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
