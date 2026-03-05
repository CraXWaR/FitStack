import {Router} from "express";
import {AIController} from "../controllers/ai.controller.js";

const router = Router();
const aiController = new AIController();

router.post("/suggest-set", aiController.suggestSet);

export default router;