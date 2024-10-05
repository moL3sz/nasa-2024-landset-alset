import express from "express";
import {TLEService} from "../services/tle.service";
import {SceneMetadata} from "../models/sceneMetadata.model";


const router = express.Router();


router.get("/:id", async (req, res) => {

	try{
		const metadatas = await SceneMetadata.find().exec();
		res.status(200).send(metadatas);
	}catch (e){
		res.status(500).send(e);
	}
})


export default router;