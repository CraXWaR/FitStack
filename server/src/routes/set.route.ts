import express from "express";
import {SetController} from "../controllers/set.controller.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = express.Router();
const setController = new SetController();

router.post("/:workoutExerciseId", authenticate, setController.addSet);
router.get("/today", authenticate, setController.getTodayAddedSets);

export default router;