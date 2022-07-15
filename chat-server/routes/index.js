import express from "express";

/* Middleware */
import { encode } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/login/:username/:password", encode, (req, res) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
});

export default router;
