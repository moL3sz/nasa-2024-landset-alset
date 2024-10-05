import {Polyline} from "react-leaflet";
import {useAppSelector} from "../../../../../store/hooks.ts";
import {useMemo} from "react";
import {TLEType} from "../../Globe/@types/tle.type.ts";
import {calculatelonlat} from "../../../../../utils/calculatelonlat.ts";


export const SatellitePathLayer = () => {

	const tleList = useAppSelector(state => state.global.TLEList) as TLEType[]
	const pathDateString = useAppSelector(state => state.map.pathDate)


	const pos = useMemo(() => {
		if(tleList.length === 0) return [];
		if(pathDateString.length === 0) return [];

		const tle = tleList[0];
		const pathDate = new Date(pathDateString);
		const res = [];
		let temp = [];
		for(let i = 0; i < 1440; i++){
			const{longitude, latitude} =  calculatelonlat(tle, pathDate)

			pathDate.setTime(pathDate.getTime() + 60 * 1000)
			if(temp.length > 0 && (Math.sign(temp.slice(-1)[0][0]) !== Math.sign(latitude)
				|| (Math.sign(temp.slice(-1)[0][1]) !== Math.sign(longitude)))){
				res.push(temp);
				temp = []
			}
			temp.push([latitude, longitude])
		}
		return res;
	}, [pathDateString, tleList])


	return (
		<Polyline positions={pos} >

		</Polyline>
	)


}