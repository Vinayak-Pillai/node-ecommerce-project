import Category from "../models/category.model";
import Subcategory from "../models/subcategory.model";

export const insertCategoryData = async (req, res) => {
  if (!req.body.c_name) {
    res.status(422).json({
      message: "c_name is missing.",
      status: false,
    });
  } else {
    let categoryData = {
      category_name: req.body.c_name,
    };
    let insertCategory = await Category.create(categoryData);
    res.status(200).json({
      message: "Success",
      data: insertCategory,
      status: true,
    });
  }
};

export const getallCategories = async (req, res) => {
  let categories = await Category.find({});

  res.status(200).json({
    message: "Success",
    data: categories,
    status: true,
  });
};

export const updateCategories = async (req, res) => {
  let categoryId = { _id: req.body.c_id };
  let updateCategoryFeild = { category_name: req.body.c_name };
  if (!req.body.c_id) {
    res.status(422).json({
      message: "_id field is missing",
      status: false,
    });
  } else if (!req.body.c_name) {
    res.status(422).json({
      message: "category_name is missing",
      status: false,
    });
  } else {
    let updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateCategoryFeild
    );
    let findCategory = await Category.findOne({
      _id: req.body.c_id,
    });
    res.status(200).json({
      message: "Success",
      data: findCategory,
      status: true,
    });
  }
};

export const deleteCategory = async (req, res) => {
  let categoryId = { _id: req.body.c_id };

  let categoryData = await Category.deleteOne(categoryId);
  let subcategoryData = await Subcategory.deleteMany({
    categoryId: req.body.c_id,
  });
  res.status(200).json({
    message: "Success",
    data: [categoryData, subcategoryData],
    status: true,
  });
};
