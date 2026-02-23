import express from "express";
import {authenticate} from "../middlewares/authenticate.js";
import {ProgramController} from "../controllers/program.controller.js";

const router = express.Router();
const programController = new ProgramController();

router.post("/create", authenticate, programController.create);
router.get("/", authenticate, programController.getAll);
router.get("/:slug", authenticate, programController.getProgramBySlug)
router.get('/getProgramWorkouts/:programId', authenticate, programController.getProgramWorkouts)

export default router;
