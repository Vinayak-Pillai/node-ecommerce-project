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
  console.log("Req session:", req.session);
  if (req.session.adminId) {
    next();
  } else {
    res.status(500).json({
      status: false,
      message: "Unauthorized Access",
    });
  }
};
