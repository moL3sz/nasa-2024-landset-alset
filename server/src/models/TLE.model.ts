import {model, Model, Schema} from "mongoose"
import {TimestampedEntity} from "./@types/timestamp.type";

export interface ITLE extends TimestampedEntity{
	data: {
		lineOne: string,
		lineTwo: string,
	},
	NORAD_CAT_ID: string,
	satelliteName: string,
}

interface TLEModel extends Model<ITLE> {
}

export const tleScheme = new Schema<ITLE, TLEModel>({
	data: {
		lineOne: String,
		lineTwo: String,
	},
	NORAD_CAT_ID: String,
	satelliteName: String,



}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})


// Post model
export const TLE = model<ITLE, TLEModel>("TLE", tleScheme, "tles");


