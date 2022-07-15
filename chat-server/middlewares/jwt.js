import jwt from "jsonwebtoken";
import User from "../controllers/user.js";

const SECRET_KEY = "test key";

/* Function that will check to see if a user is in the DB and if they are, will then assign them a 
  an authentication token */
export const encode = async (req, res, next) => {
  try {
    const { username, password } = req.params;
    const verifiedLogin = await User.onUserLogin(username, password);
    if (verifiedLogin.statusCode === 400) {
      return;
    }
    const payload = {
      userid: verifiedLogin.user._id,
      userType: verifiedLogin.user.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    req.authToken = authToken;
    return res.status(200).json({ success: true, authToken });
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
    return res.status(400).json({ success: false, error: "No access token provided " });
  }
  const accessToken = req.headers["authorization"].split(" ")[1];
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
