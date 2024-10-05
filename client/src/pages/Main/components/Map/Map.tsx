// @ts-ignore
import {MapContainer} from 'react-leaflet/MapContainer'
import {TileLayer} from 'react-leaflet/TileLayer'
import {Marker, Popup, useMap as useLeafletMap} from "react-leaflet";
import "./Map.css";
import {Button} from "primereact/button";
import {useMap} from "./hooks/useMap.ts";
import {useEffect} from "react";



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
        centerPosition
    } = useMap();


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
                <MapRecenter lat={centerPosition[0]} lng={centerPosition[1]} zoomLevel={6}/>
            </MapContainer>


        </div>


    );


}