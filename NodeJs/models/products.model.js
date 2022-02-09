import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  product_name: {
    type: String,
  },
  product_quantity: {
    type: Number,
  },
  product_price: {
    type: Number,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  productImage: {
    type: String,
  },
});

const Product = mongoose.model("Product", schema);

export default Product;
