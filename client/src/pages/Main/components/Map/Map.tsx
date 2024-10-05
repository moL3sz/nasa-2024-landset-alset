// @ts-ignore
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {Marker, Popup, useMap as useLeafletMap} from "react-leaflet";
import "./Map.css";
import {Button} from "primereact/button";
import {useMap} from "./hooks/useMap.ts";
import {useEffect} from "react";
import {Image} from "primereact/image";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import Control from "react-leaflet-custom-control";
import {OverlayPanel} from "primereact/overlaypanel";
import {Calendar} from "primereact/calendar";
import {Divider} from "primereact/divider";
import {SatellitePathLayer} from "./layers/SatellitePathLayer.tsx";
import {useAppDispatch} from "../../../../store/hooks.ts";
import {setPathDate} from "../../../../store/map/map.slice.ts";
import {SatelliteImageLayer} from "./layers/SatelliteImageLayer.tsx";


type MapRecenterProps = {
    lat:number,
    lng:number,
    zoomLevel:number
}
const MapRecenter = ({ lat, lng, zoomLevel }:MapRecenterProps) => {
    const map = useLeafletMap();


    useEffect(() => {
        map.flyTo([lat, lng], zoomLevel );
    }, [lat, lng]);

    return null;

};

export const Map = () => {

    const {
        targets,
        showScenes,
        centerPosition,
		overlayPanel,
		calendar
    } = useMap();
    const dispatch = useAppDispatch();

    return (
        <div className={""}>
            <MapContainer
                id={"map"}
                center={[...centerPosition]}
                zoom={6}
                scrollWheelZoom={true}
                style={{height: "100vh", width: "100%"}}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    targets.map((target) => {
                        console.log(target)
                        return <Marker position={target.coordinate}>
                            <Popup>
                                <div className={"w-full flex flex-col gap-2"}>
                                    <div className={"flex gap-1"}>
                                        <span className={`flag-icon flag-icon-${target.ISO_alpha2}`}/>
                                        <div className={"font-extrabold"}>{target.locationName}</div>
                                    </div>

                                    <div>{target.coordinate.lat}, {target.coordinate.lng}</div>
                                    <Button
                                        size={"small"}
                                        className={"w-full"}
                                        text
                                        label={"Scenes"}
                                        onClick={showScenes}/>
                                </div>
                            </Popup>
                        </Marker>
                    })
                }
				<Control position={"topleft"} prepend={false}>
					<Button rounded={true} icon={"pi pi-cloud"} onClick={(e)=>{
						overlayPanel.current?.toggle(e);
					}}/>
				</Control>
				<SatellitePathLayer/>
				<SatelliteImageLayer width={50} height={50}/>
                <MapRecenter lat={centerPosition[0]} lng={centerPosition[1]} zoomLevel={6}/>
            </MapContainer>

            <div className={"fixed bottom-0 h-96 w-full mx-auto bg-gray-800 bg-opacity-80 rounded-t-2xl"}>
                <div>
                    <i className={"pi pi-images"}/>
                    <span className={"text-white ms-2"}>Image scenes</span>

                    <Image
                        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"}
                        width={"48"} height={"48"}/>
                    <DataTable>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>
                </div>

            </div>
			<OverlayPanel ref={overlayPanel} >
				<div>
					<div>
						<h2>Select date for landset path</h2>
						<Divider/>
					</div>

					<div className={"flex flex-gap gap-x-3"}>
						<Calendar
							ref={calendar}
							onChange={(e)=>{
						}}/>
						<Button rounded={true} icon={"pi pi-search"} severity={"success"} onClick={()=>{
							dispatch(setPathDate(  calendar.current?.getInput().value || ""))
						}}/>
						<Button rounded={true} icon={"pi pi-times"} severity={"danger"} onClick={()=>{
							dispatch(setPathDate(  ""))
						}}/>
					</div>
				</div>

			</OverlayPanel>
        </div>


    );


}