import express from "express";
import {ITarget, Target} from "../models/target.model";
import {defaultInputTarget} from "concurrently/dist/src/defaults";


const router = express.Router();


router.get("/", async (req, res) => {

	try{
		const targets = await Target.find();
		console.log(targets)
		res.status(200).send(targets);
	}catch (e){
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
		const entity = req.body as ITarget;
		const updated = await Target.findByIdAndDelete(entity._id).exec();
		if(updated === null) {
			throw new Error("Not found");
		}
		res.status(200).send(updated)
	} catch (e) {
		res.status(500).send(e);
	}
})


export default router;


