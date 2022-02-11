import jwt from "jsonwebtoken";
export const setSession = (req, res) => {
  console.log(req.session);
  req.session.name = req.params.sessionName;
  console.log(req.session);
  res.status(200).json({
    message: "Success",
    data: req.session.name,
    status: true,
  });
};

export const getSession = (req, res) => {
  console.log(req.session);
  res.status(200).json({
    sessionName: req.session.name,
    status: true,
  });
};

export const destroySession = (req, res) => {
  req.session.destroy(function (err) {
    return res.status(200).json({
      message: "Session Destroyed",
      status: true,
    });
  });
};

export const checkSession = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.id;
    next();
  } else {
    res.status(400).json({
      message: "Not authorized",
    });
  }
};
