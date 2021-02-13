const mainRoute = require("express").Router();

//MODEL IMPORTS
const CategoryModel = require("./categories/model");
const BookModel = require("./books/model");

//SERVICES ENDPOINTS IMPORTS
const categoriesRoute = require("./categories");
const booksRoute = require("./books");

//ENDPOINTS
mainRoute.use("/categories", categoriesRoute);
mainRoute.use("/books", booksRoute);

//CONNECTED ENDPOINT
mainRoute.route("/categories/:bookId").put(async (req, res, next) => {
  //GET BOOK
  const bookId = req.params.bookId;
  const bookToAdd = await BookModel.findById(bookId);
  //GET CATEGORY
  let categoryId = req.query.categoryId;
  const categoryToEdit = await CategoryModel.findById(categoryId);
  //ADD BOOK TO CATEGORY
});

//EXPORT
module.exports = mainRoute;
