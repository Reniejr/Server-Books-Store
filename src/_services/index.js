const mainRoute = require("express").Router();
const mongoose = require("mongoose");

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
mainRoute
  .route("/categories/listBooks/:categoryId")
  .put(async (req, res, next) => {
    //GET BOOK
    let bookId = req.query.bookId;
    //GET CATEGORY
    const categoryId = req.params.categoryId;
    //INSERT BOOK IN BOOKSLIST
    let body = req.body;
    body = {
      ...body,
      booksList: body.booksList.concat(new mongoose.Types.ObjectId(bookId)),
    };
    //ADD BOOK TO CATEGORY
    try {
      const editCategory = await CategoryModel.findByIdAndUpdate(categoryId);
      res.send(
        `Book with ID : ${bookId} has been added to category ${categoryId}`
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

//EXPORT
module.exports = mainRoute;
