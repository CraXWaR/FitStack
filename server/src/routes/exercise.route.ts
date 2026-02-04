import express from "express";
import {ExerciseController} from "../controllers/exersice.controller.js";

const router = express.Router();
const exerciseController = new ExerciseController();

router.get('/getAll', exerciseController.getAll);

export default router;