import {Target} from "../models/target.model";
import {TLE} from "../models/TLE.model";
import {SPACE_TRACKER_API} from "../config/globals";


export namespace TLEService {



	export const pollSpaceTrakerForTLE = async ()=>{
		try{

			//TODO Make it work for both satellite: Foreach on satellite config
			const prev = await TLE.findOne().sort({createdAt: -1}).exec();

			if(prev === null){
				throw new Error("Not found");
			}

			if(prev.createdAt?.getHours() + 1 > new Date().getHours() && false){


				const res = await fetch(SPACE_TRACKER_API +" ", { headers: {
					"Authorization":""
					}})
				const newTLE = await res.text()

				console.log(newTLE);


			}

			return prev;

		}catch (e){

			console.error(e);
			throw e;

		}
	}



}