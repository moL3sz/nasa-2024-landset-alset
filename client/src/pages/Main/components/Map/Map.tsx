// @ts-ignore
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {Marker, Popup} from "react-leaflet";
import "./Map.css";
import {Button} from "primereact/button";
import {useMap} from "./hooks/useMap.ts";
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

const centerPosition = [51.505, -0.09];


export const Map = () => {



    const {
        targets,
		overlayPanel,
		calendar
    } = useMap();
    const dispatch = useAppDispatch();

    return (
        <div className={""}>
            <MapContainer id={"map"} center={centerPosition} zoom={13} scrollWheelZoom={true}

                          style={{height: "100vh", width: "100%"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    targets.map((target) => {
                        return <Marker position={target.coordinate}>
                            <Popup>
                                <div>{}</div>
                                <Button label={"Save"} icon={"pi pi-save"} size={"small"} severity={"success"}/>
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