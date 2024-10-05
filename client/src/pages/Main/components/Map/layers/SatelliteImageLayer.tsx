import {useEffect, useState} from "react";
import {useAppSelector} from "../../../../../store/hooks.ts";
import {TLEType} from "../../Globe/@types/tle.type.ts";
import {calculatelonlat} from "../../../../../utils/calculatelonlat.ts";
import {ImageOverlay} from "react-leaflet";
import Image from "../../../../../assets/satellite.png"
type SatelliteImageLayerProps = {
	width: number,
	height: number
}
export const SatelliteImageLayer = ({width, height}: SatelliteImageLayerProps )=>{

	const [bounds, setBounds] = useState<number[][]>([])
	const tle = useAppSelector(state => state.global.TLEList) as TLEType[]


	useEffect(() => {
		if(tle.length === 0) return ;
		const int = setInterval(()=>{

			const {latitude, longitude} = calculatelonlat(tle[0], new Date())
			const center = [latitude, longitude]
			// Kiszámítjuk a bounds-ot a középpont és a méretek alapján
			const southWest = [
				center[0] - (height / 2) * 0.000008983, // Latitude
				center[1] - (width / 2) * 0.000008983,  // Longitude
			];

			const northEast = [
				center[0] + (height / 2) * 0.000008983, // Latitude
				center[1] + (width / 2) * 0.000008983,  // Longitude
			];

			setBounds([southWest, northEast])
		},100)

		return ()=>{
			clearInterval(int)
		}
	}, [tle]);

	return (
		bounds.length > 0 ?
		<ImageOverlay bounds={bounds} url={Image}>

		</ImageOverlay> : null
	)


}