const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authourization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "reddy");
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.user = decoded.username;
        next();
      } else {
        res.json({ msg: "not authenticated" });
      }
    } catch (err) {
      res.json({
        err: err.message,
      });
    }
  } else {
    res.json({ msg: "please login again" });
  }
};
module.exports = {
  auth,
};
