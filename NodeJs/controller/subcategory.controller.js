import Category from "../models/category.model";
import Subcategory from "../models/subcategory.model";

export const insertSubcategoryData = async (req, res) => {
  //finding the category Id

  // let findCategoryID=await Category.findOne({category_name:req.body.c_name});

  //finding the category Id

  //setting subcategory and categoryId on the basis of category name.
  if (!req.body.sc_name) {
    res.status(422).json({
      message: "sc_name is missing",
      status: false,
    });
  } else if (!req.body.c_id) {
    res.status(422).json({
      message: "c_id is missing",
    });
  } else {
    let subcategoryData = {
      subcategory_name: req.body.sc_name,
      // 'categoryId':findCategoryID._id
      categoryId: req.body.c_id,
    };
    let insertSubcategory = await Subcategory.create(subcategoryData);
    //setting subcategory and categoryId on the basis of category name.

    res.status(200).json({
      message: "Success",
      data: insertSubcategory,
      status: true,
    });
  }
};

export const getSubcategory = async (req, res) => {
  let subcategory = await Subcategory.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "result",
      },
    },
  ]);

  res.status(200).json({
    message: "Success",
    data: subcategory,
    status: true,
  });
};

export const getSubcategoryonCategory = async (req, res) => {
  //Finds the category name from api parameter.
  if (!req.body.cId) {
    res.status(422).json({
      message: "cId is missing",
      status: false,
    });
  } else {
    let category = await Category.findOne({
      _id: req.body.cId,
    });
    console.log(category);
    //Finds the subcategories which fall in the above category and selects only the subcategory_name to display.
    let getSubcategories = await Subcategory.find({
      categoryId: category._id,
    }).select("subcategory_name");

    res.status(200).json({
      message: "Success",
      data: getSubcategories,
      status: 200,
    });
  }
};
