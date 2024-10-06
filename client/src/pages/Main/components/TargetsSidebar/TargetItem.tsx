import {memo, useMemo, useRef, useState} from "react";
import {TargetItemType} from "../../@types/targetItem.type.ts";
import Countdown from "react-countdown";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";
import {BASE_API_URL} from "../../../../config/globals.ts";
import {useAppDispatch} from "../../../../store/hooks.ts";
import {deleteTarget, setCenterPosition, setZoom} from "../../../../store/map/map.slice.ts";
import {toggleVisible} from "../../../../store/imageScenes/imageScenes.slice.ts";
import {Notifications} from "../../../../components/Notifications/Notifications.tsx";
import {OverlayPanel} from "primereact/overlaypanel";


type TargetItemProps = {
    data: TargetItemType
}

const severityColors: { [key: number]: string } = {
    0: "warning",
    1: "contrast",
    2: "success",
}

export const TargetItem = memo(({data}: TargetItemProps) => {

    const [targetData, setTargetData] = useState<TargetItemType>(data);
    const dispatch = useAppDispatch();
    const notificationsRef = useRef<OverlayPanel>(null);

    const delTarget = async () =>{
        try{
            const response = await fetch(BASE_API_URL + `/targets/${targetData._id}`, {
                method:"DELETE",
            });
            const deletedId = await response.json();
            dispatch(deleteTarget(deletedId));
        }
        catch (e){

        }
    }


    const plusTime =  new Date(targetData.passingTime).getTime() - new Date().getTime();

    return <div className={"hover:backdrop-brightness-125 p-3 cursor-pointer rounded-lg"}>
        <div className={"flex items-center gap-2 w-full"}>

            <span className={`flag-icon flag-icon-${targetData.ISO_alpha2}`}/>
            <div className={"text-white font-bold"}>{targetData.locationName}</div>

        </div>

        <div className={"mt-2 flex justify-between"}>
            <div>
                <div>Latitude: {data.coordinate.lat}</div>
                <div>Longitude: {data.coordinate.lng}</div>
                <div className={"flex items-center gap-1 pt-2"}>
                    {targetData.sendMode.map((x: string, index: number) => {
                        const color: string = severityColors[index];
                        return <Badge key={x} value={x} severity={color}/>
                    })}
                </div>

            </div>
            <div>
                <div>Passing ca.</div>
                <Countdown className={"text-xl text-white font-semibold"} date={Date.now() + plusTime}/>
            </div>
        </div>
        <div className={"flex w-full gap-2 mt-4 border-[1px] border-gray-700 rounded-full"}>
            <Button
                icon={"pi pi-bell"}
                className={"rounded-l-full"}
                size={"small"}
                severity={"warning"}
                text
                label={"Notifications"}
                onClick={(event)=>notificationsRef.current?.toggle(event)}
            />
            <Button icon={"pi pi-eye"} size={"small"} text label={"View"} onClick={()=>{
                dispatch(setCenterPosition([targetData.coordinate.lat, targetData.coordinate.lng]));
                dispatch(setZoom(10));
            }}/>
            <Button icon={"pi pi-images"} size={"small"} label={"Scenes"} text severity={"secondary"} onClick={()=>{
                dispatch(toggleVisible());
            }}/>
            <Button icon={"pi pi-trash"} size={"small"} className={"rounded-r-full"} severity={"danger"} text onClick={delTarget}/>
        </div>

        <Notifications ref={notificationsRef} targetData={targetData} setTargetData={setTargetData}/>

    </div>


});