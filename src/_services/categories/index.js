const categoryRoute = require("express").Router(),
  CategoryModel = require("./model");

//METHODS

//POST
categoryRoute.route("/").post(async (req, res, next) => {
  let body = req.body;
  try {
    const newCategory = await CategoryModel(body),
      { _id } = await newCategory.save();
    res.send(newCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET
categoryRoute.route("/").get(async (req, res, next) => {
  try {
    let categories;
    if (req.query) {
      let query = req.query;
      categories = await CategoryModel.find(query).populate("booksList");
    } else {
      categories = await CategoryModel.find();
    }
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET BY ID
categoryRoute.route("/:categoryId").get(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await CategoryModel.findById(categoryId);
    res.send(category);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//PUT
categoryRoute.route("/:categoryId").put(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  let body = req.body;
  try {
    const editCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      body,
      { runValidators: true, new: true }
    );
    res.send(
      `Category with ID : ${categoryId} has been edited to: ${editCategory}`
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//DELETE
categoryRoute.route("./:categoryId").delete(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const deleteCategory = await CategoryModel.findByIdAndRemove(categoryId);
    res.send(`Category with ID : ${categoryId} has been deleted`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = categoryRoute;
