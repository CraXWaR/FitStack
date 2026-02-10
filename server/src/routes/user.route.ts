import express from "express";
import {UserController} from "../controllers/user.controller.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authenticate, userController.getUserInfo);

export default router;