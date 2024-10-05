import {model, Model, Schema} from "mongoose"

export interface ITarget {
	coordinate: {
		lng: number,
		lat: number,
	}
	sendMode: string[],
	_id: string
	locationName:string,
	ISO_alpha2:string
}

interface TargetModel extends Model<ITarget> {
}

export const targetScheme = new Schema<ITarget, TargetModel>({
	coordinate: {
		lng: Number,
		lat: Number,
	},
	sendMode: [
		String
	],
	locationName:String,
	ISO_alpha2:String

})


// Post model
export const Target = model<ITarget, TargetModel>("Target", targetScheme, "targets");


