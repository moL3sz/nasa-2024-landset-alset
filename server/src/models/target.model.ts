import {model, Model, Schema} from "mongoose"

export interface ITarget {
	coordinate: {
		lng: number,
		lat: number,
	}
	sendMode: string,
	_id: string
}

interface TargetModel extends Model<ITarget> {
}

export const targetScheme = new Schema<ITarget, TargetModel>({
	coordinate: {
		lng: Number,
		lat: Number,
	},
	sendMode: String,


})


// Post model
export const Target = model<ITarget, TargetModel>("Target", targetScheme, "targets");


