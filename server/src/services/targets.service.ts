import {ITarget} from "../models/target.model";
import {TLEService} from "./tle.service";
import {PassingTimeTargetType} from "../models/@types/target.type";
import * as satellite from 'satellite.js';
import {EciVec3, Kilometer, SatRec} from 'satellite.js';
import * as turf from '@turf/turf';
import {ITLE} from "../models/TLE.model";

export namespace TargetsService {


	const getSatelliteDistanceAtTime = (time: Date, satrec: SatRec, target: ITarget): number => {
		const positionAndVelocity = satellite.propagate(satrec, time);
		const positionEci = positionAndVelocity.position;

		if (!positionEci) {
			return Number.MAX_SAFE_INTEGER;  // Ha nincs adat, nagy távolságot adunk vissza
		}

		// ECI (Earth-Centered Inertial) pozíció átalakítása földrajzi koordinátákra
		const gmst = satellite.gstime(time);
		const positionGd = satellite.eciToGeodetic(positionEci as EciVec3<Kilometer>, gmst);
		const satelliteLat = satellite.degreesLat(positionGd.latitude);
		const satelliteLon = satellite.degreesLong(positionGd.longitude);

		// Műhold pozíció (lat/lon) Turf.js pontként
		const satellitePoint = turf.point([satelliteLon, satelliteLat]);
		const targetPoint = turf.point([target.coordinate.lng, target.coordinate.lat]);

		// Távolság kiszámítása Turf.js segítségével (kilométerben)
		const distance = turf.distance(satellitePoint, targetPoint, {units: 'kilometers'});
		return distance;
	}


	const calculatePassingTimeOnTarget = ({stopTime, startTime, iterations, target, tle}: {
		startTime: Date,
		stopTime: Date,
		iterations: number,
		target: ITarget,
		tle: ITLE
	}): { closestTime: Date, minDistance: number } => {

		let closestTime = startTime;
		let minDistance = Number.MAX_SAFE_INTEGER;
		let time = new Date(startTime)
		const satRec = satellite.twoline2satrec(tle.data.lineOne, tle.data.lineTwo);
		for (let i = 0; i < iterations; i++) {

			const distance = getSatelliteDistanceAtTime(time, satRec, target);
			if (distance < minDistance) {
				minDistance = distance;
				closestTime = new Date(time);
			}

			// Finomítjuk az időintervallumot
			if (distance === 0) break;  // Ha tökéletes egyezést találunk

			time.setTime(time.getTime() + 60 * 1000)
		}

		const prevMinute = new Date(closestTime)
		prevMinute.setTime(closestTime.getTime() - 60 * 1000 * 2);


		time = new Date(prevMinute);
		for (let i = 0; i < 240; i++) {

			const distance = getSatelliteDistanceAtTime(time, satRec, target);
			if (distance < minDistance) {
				minDistance = distance;
				closestTime = new Date(time);
			}

			// Finomítjuk az időintervallumot
			if (distance === 0) break;  // Ha tökéletes egyezést találunk

			time.setTime(time.getTime() + 1 * 1000)
		}
		return {closestTime, minDistance};


	}
	export const calculatePassingTime = async (targets: ITarget[]) => {
		const now = new Date(new Date().toLocaleDateString());
		console.log(now)
		const latestTLE = await TLEService.pollSpaceTrakerForTLE() as ITLE;
		const iterations = 20_160;
		const stopTime16Day = new Date(now)
		stopTime16Day.setDate(stopTime16Day.getDate() + 14);
		console.log(stopTime16Day)

		const result = [] as PassingTimeTargetType[];

		for (const target of targets) {

			const res = calculatePassingTimeOnTarget({
				stopTime: stopTime16Day,
				startTime: now,
				target,
				tle: latestTLE,
				iterations
			})
			console.log(res.minDistance)
			const extendedTarget: PassingTimeTargetType = {
				...target,
				passingTime: res.closestTime
			}
			result.push(extendedTarget)
		}
		return result;

	}
}