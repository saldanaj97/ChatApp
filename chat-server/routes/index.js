import express from "express";

/* Middleware */
import { encode } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/login/:username/:password", encode);

export default router;
