// @ts-ignore
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {Marker, Popup} from "react-leaflet";
import "./Map.css";
import {Button} from "primereact/button";
import {useMap} from "./hooks/useMap.ts";

const centerPosition = [51.505, -0.09];

export const Map = () => {


    const {
        targets,
        showScenes
    } = useMap();


    return (
        <div className={""}>
            <MapContainer
                id={"map"}
                center={centerPosition}
                zoom={13}
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
                                    <div className={"font-extrabold"}>Eger</div>
                                    <div>
                                        kfopkopkfoős
                                        flklsklfs
                                        űlfspőslkősf
                                        kfoősk
                                    </div>
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
            </MapContainer>


        </div>


    );


}