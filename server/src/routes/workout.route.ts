import express from "express";
import {WorkoutController} from "../controllers/workout.controller.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = express.Router();
const workoutController = new WorkoutController();

router.post('/create', authenticate, workoutController.create);
router.get('/getProgramWorkouts/:programId', authenticate, workoutController.getProgramWorkouts)

export default router;