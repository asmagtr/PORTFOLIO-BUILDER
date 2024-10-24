const userModel = require("../models/user")
const {verifyToken} = require("../lib/auth");

async function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);


    const data = verifyToken(token);
    if (!data) {
      return res.sendStatus(401);
    }

    // Use findById to exclude the password field
    const user = await userModel.findById(data.id).select('-password');
    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
}

module.exports = authenticateUser;