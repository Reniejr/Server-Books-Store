const mainRoute = require("express").Router();

//MODEL IMPORTS

//SERVICES ENDPOINTS IMPORTS
const booksRoute = require("./books");

//ENDPOINTS
mainRoute.use("/books", booksRoute);

//EXPORT
module.exports = mainRoute;
