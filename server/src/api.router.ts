import express from "express";
import targetsController from "./controllers/targets.controller";
import tleController from "./controllers/tle.controller";
import sceneMetadataController from "./controllers/sceneMetadata,controller";


const router = express.Router();


// --- Targets ---
router.use("/targets", targetsController)
router.use("/tle", tleController)
router.use("/scene-metadata/", sceneMetadataController)





export default router;



