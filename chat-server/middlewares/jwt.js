import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const SECRET_KEY = "test key";

/* Function that will check to see if a user is in the DB and if they are, will then assign them a 
  an authentication token */
export const encode = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await UserModel.getUserById(userid);
    const payload = {
      userid: user._id,
      userType: user.userType,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Could not encode authorization token",
    });
  }
};

/* Function that will decode the userId and type from the auth token IF PROVIDED, 
 otherwise an error will be returned */
export const decode = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, error: "No access token provided " });
  }
  const accessToken = req.headers["authorization"].split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Could not decode authorization token",
    });
  }
};
