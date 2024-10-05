import express from "express";
import {TLEService} from "../services/tle.service";


const router = express.Router();


router.get("/latest", async (req, res) => {

	try{
		const latest = await TLEService.pollSpaceTrakerForTLE();
		res.status(200).send(latest);
	}catch (e){
		res.status(500).send(e);
	}
})
router.get("/prev", async (req, res) => {

	try{
		await TLEService.pollSpaceTrakerForTLE();
	}catch (e){
		res.status(500).send(e);
	}
})


export default router;