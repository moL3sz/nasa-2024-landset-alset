import express from "express";
import targetsController from "./controllers/targets.controller";
import tleController from "./controllers/tle.controller";


const router = express.Router();


// --- Targets ---
router.use("/targets", targetsController)
router.use("/tle", tleController)





export default router;



