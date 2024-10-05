
import * as gdal from "gdal-async";
import path from "path"
export namespace HistogramService {

	const calculateHistogram = (data:any, bins = 64, min = 0, max = 65535)=> {
		const histogram = new Array(bins).fill(0);
		const binWidth = (max - min) / bins;

		data.forEach((value:any) => {
			if (value >= min && value <= max) {
				const bin = Math.floor((value - min) / binWidth);
				histogram[bin]++;
			}
		});

		return histogram;
	}
	export const calculateHistogramForTIF = async ()=>{

		const files = [
			path.join(__dirname, "..","assets/LC09_L2SP_015010_20241004_20241005_02_T1_SR_B1.TIF"),
			path.join(__dirname, "..","assets/LC09_L2SP_015010_20241004_20241005_02_T1_SR_B2.TIF"),
			path.join(__dirname, "..","assets/LC09_L2SP_015010_20241004_20241005_02_T1_SR_B3.TIF"),
			path.join(__dirname, "..","assets/LC09_L2SP_015010_20241004_20241005_02_T1_SR_B4.TIF"),
			path.join(__dirname, "..","assets/LC09_L2SP_015010_20241004_20241005_02_T1_SR_B5.TIF"),
			path.join(__dirname, "..","assets/LC09_L2SP_015010_20241004_20241005_02_T1_SR_B6.TIF"),

			//
		]



		const res = {} as any;
		for(let file of files){
			console.log(file)

			const ds = gdal.open(file);
			const numBands = ds.bands.count();
			for (let i = 1; i <= numBands; i++) {
				const band = ds.bands.get(i);
				// Read raster data for this band
				const rasterData = band.pixels.read(0, 0, band.size.x, band.size.y);

				// Flatten raster data into a single array (since it may be multi-dimensional)

				// Calculate histogram
				const histogram = calculateHistogram(rasterData);
				res[file.split("\\").slice(-1).pop() as string] = histogram;
			}
		}
		return res;

	}
}