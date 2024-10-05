import {useEffect, useRef} from "react";
import {View} from "./View.ts";


export const Globe = () =>{

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		console.log("asd")
		const app = new View({
			canvas: document.getElementById("map") as HTMLCanvasElement,
			//theme: "resources/style1.json"
		});

		const mapView = app.mapView;

// make map full-screen
		mapView.resize(window.innerWidth, window.innerHeight);

		const resize = () => {
			mapView.resize(window.innerWidth, window.innerHeight);
		}
// react on resize events from the browser.
		window.addEventListener("resize",resize );

// center the camera to New York

// make sure the map is rendered
		mapView.update();

		return ()=>{
			mapView.removeAllEventListeners();
			window.removeEventListener("resize",resize);
			canvasRef.current?.remove();
			mapView.dispose(true);
		}
	}, []);

    return (
        <div>
			<canvas ref={canvasRef} id={"map"}>
			</canvas>
        </div>
    );


}