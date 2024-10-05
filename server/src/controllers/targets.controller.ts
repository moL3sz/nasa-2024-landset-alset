import express from "express";
import {ITarget, Target} from "../models/target.model";
import {defaultInputTarget} from "concurrently/dist/src/defaults";
import {TargetsService} from "../services/targets.service";
import {HistogramService} from "../services/histogram.service";
import {ISceneMetadata, SceneMetadata} from "../models/sceneMetadata.model";


const router = express.Router();


router.get("/", async (req, res) => {

	try{
		const targets = await Target.find().exec();


		res.status(200).send(targets);
	}catch (e){
		res.status(500).send(e);
	}
})
router.get("/passing", async (req, res) => {

	try{
		const targets = await Target.find().exec();
		const passing = await TargetsService.calculatePassingTime(
			targets.map((x:any)=>x._doc)
		)
		res.status(200).send(passing);
	}catch (e){
		console.error(e)
		res.status(500).send(e);
	}
})
router.get("/:id")
router.post("/", async (req, res) => {
	try {
		const entity = req.body as ITarget;
		console.log(entity);
		const target = new Target({...entity});
		res.status(200).send(await target.save())
	} catch (e) {
		res.status(500).send(e);
	}
})
router.put("/", async (req, res)=>{
	try {
		const entity = req.body as ITarget;
		const updated = await Target.findByIdAndUpdate(entity._id, {
			...entity
		})
		res.status(200).send(updated)
	} catch (e) {
		res.status(500).send(e);
	}
})
router.delete("/:id", async (req, res)=>{
	try {
		const {id} = req.params;
		const updated = await Target.findByIdAndDelete(id).exec();
		if(updated === null) {
			throw new Error("Not found");
		}
		res.status(200).send(updated)
	} catch (e) {
		res.status(500).send(e);
	}
})
router.get("/scene-metadata-old/:id", async (req, res)=>{
	try {
		const {id} = req.params;

		const hist = await HistogramService.calculateHistogramForTIF();
		const sceneMetadata : ISceneMetadata = {
			dataAcquired: new Date(),
			histogram: hist as any,
			startTime: new Date(),
			sceneId: "LC09_L2SP_015010_20241004_20241005_02_T1_SR",
			surfaceTemp: {
				temp1: 220,
				temp2: 250,
			},
			cloudCover: 89.61,
			stopTime: new Date(),
			IMAGE_QUALITY_OLI: 9,
			IMAGE_QUALITY_TIRS: 9
		}
		const sceneMetadat = new SceneMetadata({...sceneMetadata});
		const entity = await sceneMetadat.save()
		res.status(200).send(entity)
	} catch (e) {
		console.error(e)
		res.status(500).send(e);
	}
})

export default router;


