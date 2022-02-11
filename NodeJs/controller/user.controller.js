import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const insertAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(400).json({
        message: "Enter email",
      });
      return false;
    }
    if (!password) {
      res.status(400).json({
        message: "Enter password",
      });
      return false;
    }

    let userData = {
      email: email,
      password: password,
    };

    let insertAdminData = await User.create(userData);

    res.status(200).json({
      message: "Success",
      data: insertAdminData,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    //validations
    if (!req.body.email) {
      res.status(422).json({
        status: false,
        message: "Email required",
      });
    }
    if (!req.body.password) {
      res.status(422).json({
        status: false,
        message: "Password required",
      });
    }
    //validations

    //db check on given credentials
    let checkAdmin = await User.findOne({
      email: email,
      password: password,
    });

    if (checkAdmin) {
      // console.log("Chek Admin done", req.session);
      // req.session.adminId = checkAdmin._id;
      // console.log("Admin", req.session);
      let id = checkAdmin._id;
      let signjwt = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: 30000,
      });
      res.status(200).json({
        status: true,
        token: signjwt,
        message: "Logged in successfully",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
  //db check on given credentials
};

export const myprofile = async (req, res) => {
  //get user data based on session
  let checkProfile = await User.findOne({ _id: req.session.adminId });
  if (checkProfile) {
    res.status(200).json({
      status: true,
      data: checkProfile,
      message: "Logged in successfully",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
  //get user data based on session
};
