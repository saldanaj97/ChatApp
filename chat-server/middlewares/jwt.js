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
    const payload = {
      userid: verifiedLogin.user._id,
      userType: verifiedLogin.user.type,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    res.cookie("Authorization", token, { SameSite: "None", secure: true });
    console.log("cookie", res.cookie);
    return res.status(200).json({ success: true, userId: verifiedLogin.user._id });
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
export const decode = (req, res, next) => {
  if (req.cookies === "") {
    return res.status(400).json({ success: false, error: "No access token provided " });
  }
  const accessToken = req.cookies["Authorization"];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userid;
    req.userType = decoded.userType;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Could not decode authorization token",
    });
  }
};
