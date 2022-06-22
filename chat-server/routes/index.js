import express from 'express'

/* Controllers */
import users from '../controllers/user.js'

/* Middleware */
import { encode } from '../middlewares/jwt.js';

const router = express.Router()

router.post('/login/:userid', encode, (req, res, next) => { });

export default router