import jwt from "jsonwebtoken";
import User from "../controllers/user.js";
import { SECRET_KEY } from "../app.js";

/* Function that will check to see if a user is in the DB and if they are, will then assign them a 
  an authentication token */
export const encode = async (req, res, next) => {
  try {
    const { username, password } = req.params;
    const verifiedLogin = await User.onUserLogin(username, password);
    if (verifiedLogin.success === false) {
      return res.status(401).json({ success: false, message: "Invalid login credentials" });
    }
    const token = jwt.sign({ userid: verifiedLogin.user._id, userType: verifiedLogin.user.type }, SECRET_KEY);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Problem while trying to authenticate ",
      error: error,
    });
  }
};

/* Function that will decode the userId and type from the auth token IF PROVIDED, 
 otherwise an error will be returned */
export const decode = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    console.log("token", token);
    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log("decodedtoken", decodedToken);
    const user = decodedToken;
    console.log("user", user);
    req.userId = user.userid;
    req.userType = user.userType;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Could not decode authorization token",
    });
  }
};
