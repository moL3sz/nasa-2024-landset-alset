import {TLEType} from "../pages/Main/components/Globe/@types/tle.type.ts";
import * as satellite from 'satellite.js';
import {EciVec3, Kilometer} from "satellite.js";

export const calculatelonlat =(tle: TLEType, date: Date)=>{

	if(!tle) return {longitude:0, latitude:0, altitude:0} ;

	// Create a satellite record from the TLE lines
	const satrec = satellite.twoline2satrec(tle.data.lineOne, tle.data.lineTwo);

	// Get satellite position and velocity using the current time
	const positionAndVelocity = satellite.propagate(satrec, date);
	const positionEci = positionAndVelocity.position;

	if (positionEci) {
		// Convert the position from ECI (Earth-centered inertial) coordinates to geodetic coordinates
		const gmst = satellite.gstime(date);
		const positionGd = satellite.eciToGeodetic(positionEci as EciVec3<Kilometer>, gmst);

		// Convert latitude and longitude to degrees
		const latitude = satellite.degreesLat(positionGd.latitude);
		const longitude = satellite.degreesLong(positionGd.longitude);
		const altitude = positionGd.height;

		// Update the state with the satellite's current position
		return {longitude, latitude, altitude}
	}
	return {longitude:0, latitude:0, altitude:0};


}