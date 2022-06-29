import express from "express";

/* Controllers */
import users from "../controllers/user.js";

/* Middleware */
import { encode } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/login/:userid", encode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
});

export default router;
