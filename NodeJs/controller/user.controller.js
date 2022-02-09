import User from "../models/user.model";

export const insertAdmin = async (req, res) => {
  let userData = {
    email: "admin@mail.com",
    password: "admin123",
  };

  let insertAdminData = await User.create(userData);
  res.status(200).json({
    message: "Success",
    data: insertAdminData,
    status: true,
  });
};

export const login = async (req, res) => {
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

  let { email, password } = req.body;

  //db check on given credentials
  let checkAdmin = await User.findOne({
    email: email,
    password: password,
  });

  if (checkAdmin) {
    // console.log("Chek Admin done", req.session);
    req.session.adminId = checkAdmin._id;
    // console.log("Admin", req.session);
    res.status(200).json({
      status: true,
      message: "Logged in successfully",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "Invalid Credentials",
    });
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
