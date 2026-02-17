import express from "express";
import {authenticate} from "../middlewares/authenticate.js";
import {ProgramController} from "../controllers/program.controller.js";

const router = express.Router();
const programController = new ProgramController();

router.post("/create", authenticate, programController.create);

export default router;
