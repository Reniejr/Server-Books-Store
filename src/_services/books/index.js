const bookRoute = require("express").Router(),
  BookModel = require("./model");

//METHODS

//POST
bookRoute.route("/").post(async (req, res, next) => {
  let body = req.body;
  try {
    const newBook = await BookModel(body),
      { asin } = await newBook.save();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET
bookRoute.route("/").get(async (req, res, next) => {
  try {
    let books;
    if (req.query) {
      books = await BookModel.find(req.query);
    } else {
      books = await BookModel.find();
    }
    res.send(books);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET BY ID
bookRoute.route("/:bookId").get(async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await BookModel.findById(bookId);
    res.send(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//PUT
bookRoute.route("/:bookId").put(async (req, res, next) => {
  const bookId = req.params.bookId;
  let body = req.body;
  try {
    const editBook = await BookModel.findByIdAndUpdate(bookId, body, {
      runValidators: true,
      new: true,
    });
    res.send(`Book with ID : ${bookId} has been updated to ${editBook}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//DELETE
bookRoute.route("/:bookId").delete(async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const deleteBook = await BookModel.findByIdAndRemove(bookId);
    res.send(`Book with ID : ${bookId} has been deleted`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = bookRoute;
