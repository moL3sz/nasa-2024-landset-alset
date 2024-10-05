import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongodbUri: string = process.env.MONGODB_URI || '';
export const dbo = {
	init () {
		console.log(`💡 Trying to connect to MongoDB: (${mongodbUri}) ...`)
		mongoose.connect(mongodbUri).then(()=>{
			console.log("✅  Database initialized successfully!")
		}).catch((err)=>{
			console.error(err)
		})

	}
}