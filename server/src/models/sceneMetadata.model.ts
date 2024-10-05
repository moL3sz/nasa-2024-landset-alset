import {model, Model, Schema} from "mongoose"
import {containsNumber} from "@turf/turf";

export interface ISceneMetadata {
	histogram: {
		[key: string]: number[]
	},
	surfaceTemp:{
		temp1: number,
		temp2: number,
	}
	sceneId: string,
	dataAcquired: Date,
	startTime: Date,
	stopTime: Date,
	cloudCover: number,
	IMAGE_QUALITY_OLI: number,
	IMAGE_QUALITY_TIRS: number,

}

interface SceneMetadataModel extends Model<ISceneMetadata> {
}

export const sceneMetadataScheme = new Schema<ISceneMetadata, SceneMetadataModel>({
	histogram: Object,
	surfaceTemp:{
		temp1: Number,
		temp2: Number,
	},
	sceneId: String,
	dataAcquired: Date,
	startTime: Date,
	stopTime: Date,
	cloudCover: Number,
	IMAGE_QUALITY_OLI: Number,
	IMAGE_QUALITY_TIRS: Number,
})


// Post model
export const SceneMetadata = model<ISceneMetadata, SceneMetadataModel>("SceneMetadata", sceneMetadataScheme, "sceneMetaDatas");


