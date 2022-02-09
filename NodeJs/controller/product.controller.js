import Category from "../models/category.model";
import Product from "../models/products.model";
import Subcategory from "../models/subcategory.model";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

export const insertProductData = async (req, res) => {
  // let findCategoryId=await Category.findOne({category_name:req.body.c_name});
  // let findSubcategoryId=await Subcategory.findOne({subcategory_name:req.body.sc_name});

  // if (
  //   !req.body.p_name ||
  //   !req.body.p_quantity ||
  //   !req.body.p_price ||
  //   !req.body.c_id ||
  //   !req.body.sc_id
  // ) {
  //   res.status(422).json({
  //     message: "Parameters to be inserted is missing.",
  //     status: false,
  //   });
  // } else {
  let uploadImage = multer({
    storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 },
  }).single("file");
  uploadImage(req, res, async function (err) {
    let productData = {
      product_name: req.body.p_name,
      product_quantity: req.body.p_quantity,
      product_price: req.body.p_price,
      categoryId: req.body.c_id,
      subcategoryId: req.body.sc_id,
      productImage: req.file.file,
    };
    let insertProduct = await Product.create(productData);
    console.log(req.file);
    console.log(req.files + " es");
    res.status(200).json({
      message: "Success",
      data: insertProduct,
      status: true,
    });
  });
  // }
};

//get all the products without sub category and category
export const getProducts = async (req, res) => {
  // let products=await Product.find({},{'product_name':1,'product_price':1,'product_quantity':1});
  let products = await Product.aggregate([
    {
      $lookup: {
        from: "subcategories",
        localField: "subcategoryId",
        foreignField: "_id",
        as: "subcategory",
      },
    },
    {
      $unwind: "$subcategory",
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
  ]);

  res.status(200).json({
    message: "Success",
    data: products,
    status: true,
  });
};
//get all the products without sub category and category

export const getProductsOnscc = async (req, res) => {
  if (req.body.id) {
    let findCategory = await Category.findOne({
      _id: req.body.id,
    });
    let findSubCategory = await Subcategory.findOne({
      _id: req.body.id,
    });
    if (findCategory) {
      let getProducts = await Product.aggregate([
        {
          $match: {
            categoryId: findCategory._id,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subcategoryId",
            foreignField: "_id",
            as: "subcategory",
          },
        },
        {
          $unwind: "$subcategory",
        },
      ]);

      res.status(200).json({
        message: "Success",
        data: getProducts,
        status: true,
      });
    } else {
      let getProducts = await Product.aggregate([
        {
          $match: {
            subcategoryId: findSubCategory._id,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subcategoryId",
            foreignField: "_id",
            as: "subcategory",
          },
        },
        {
          $unwind: "$subcategory",
        },
      ]);
      res.status(200).json({
        message: "Success",
        data: getProducts,
        status: true,
      });
    }
  } else {
    res.status(422).json({
      message: "Invalid Credentials. Id is missing.",
      status: false,
    });
  }
};

export const getProductonscc = async (req, res) => {
  let findCategory = await Category.findOne({
    category_name: req.params.cname,
  });
  let findSubcategory = await Subcategory.findOne({
    subcategory_name: req.params.scname,
  });
  let getProducts = await Product.find({
    categoryId: findCategory._id,
    subcategoryID: findSubcategory._id,
  });

  res.status(200).json({
    message: "Success",
    data: getProducts,
    status: true,
  });
};

export const getProductsonPrice = async (req, res) => {
  if (req.body.filter_name == "price") {
    price_filter();
  } else if (req.body.filter_name == "product_name") {
    product_name_filter();
  } else if (req.body.filter_name == "Product on categories") {
    product_on_categories();
  } else if (req.body.filter_name == "Product on subcategories") {
    product_on_subcategories();
  }

  if (!req.body.filter_name) {
    res.status(422).json({
      message: "Enter the filter-name.",
      status: false,
    });
  }

  async function product_on_subcategories() {
    if (!req.body.subcategory_id) {
      res.status(422).json({
        message: "subcategory_id is missing",
        status: false,
      });
    } else {
      let subcategories_product = await Product.find({
        subcategoryId: req.body.subcategory_id,
      });

      res.status(200).json({
        message: "Success",
        data: subcategories_product,
        status: true,
      });
    }
  }

  async function product_on_categories() {
    if (!req.body.category_id) {
      res.status(422).json({
        message: "category_id is missing",
        status: false,
      });
    } else {
      let categories_product = await Product.find({
        categoryId: req.body.category_id,
      });

      res.status(200).json({
        message: "Success",
        data: categories_product,
        status: true,
      });
    }
  }

  async function product_name_filter() {
    if (!req.body.product_to_filter) {
      res.status(422).json({
        message: "Enter the product_to_filter value.",
      });
    } else {
      let name_filter = await Product.find({
        product_name: new RegExp(req.body.product_to_filter, "i"),
      });

      res.status(200).json({
        mesage: "Success",
        data: name_filter,
        status: true,
      });
    }
  }

  async function price_filter() {
    if (req.body.gt_value && req.body.lt_value) {
      let findProducts = await Product.find({
        product_price: {
          $gt: req.body.gt_value,
          $lt: req.body.lt_value,
        },
      });

      res.status(200).json({
        message: "Success",
        data: findProducts,
        status: true,
      });
    } else if (req.body.gt_value) {
      let findProducts = await Product.find({
        product_price: {
          $gt: req.body.gt_value,
        },
      });

      res.status(200).json({
        message: "Success",
        data: findProducts,
        status: true,
      });
    } else if (req.body.lt_value) {
      let findProducts = await Product.find({
        product_price: {
          $lt: req.body.lt_value,
        },
      });

      res.status(200).json({
        message: "Success",
        data: findProducts,
        status: true,
      });
    } else {
      res.status(200).json({
        message: "Parameters missing",
      });
    }
  }
};
