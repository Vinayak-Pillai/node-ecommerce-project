import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoute from "./routes/user.route";
import productRoute from "./routes/product.route";
import subcategoryRoute from "./routes/subcategory.routes";
import categoryRoute from "./routes/category.route";
import cors from "cors";
const dotenv = require("dotenv").config();

let port = process.env.PORT;

const app = express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Your_first_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/subcategory", subcategoryRoute);
app.use("/category", categoryRoute);

mongoose
  .connect("mongodb://localhost:27017/Project")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Error");
  });

app.listen(port, function () {
  console.log("Server created at port 3000");
});
