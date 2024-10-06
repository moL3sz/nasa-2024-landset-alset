import {memo, useMemo} from "react";
import {TargetItemType} from "../../@types/targetItem.type.ts";
import Countdown from "react-countdown";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";
import {BASE_API_URL} from "../../../../config/globals.ts";
import {useAppDispatch} from "../../../../store/hooks.ts";
import {deleteTarget, setCenterPosition, setZoom} from "../../../../store/map/map.slice.ts";
import {toggleVisible} from "../../../../store/imageScenes/imageScenes.slice.ts";


type TargetItemProps = {
    data: TargetItemType
}

const severityColors: { [key: number]: string } = {
    0: "warning",
    1: "contrast",
    2: "success",
}

export const TargetItem = memo(({data}: TargetItemProps) => {


    const dispatch = useAppDispatch();


    const delTarget = async () =>{
        try{
            const response = await fetch(BASE_API_URL + `/targets/${data._id}`, {
                method:"DELETE",
            });
            const deletedId = await response.json();
            dispatch(deleteTarget(deletedId));
        }
        catch (e){

        }
    }



    return <div className={"hover:backdrop-brightness-125 p-3 cursor-pointer rounded-lg"}>
        <div className={"flex items-center gap-2 w-full"}>

            <span className={`flag-icon flag-icon-${data.ISO_alpha2}`}/>
            <div className={"text-white font-bold"}>{data.locationName}</div>

        </div>

        <div className={"mt-2 flex justify-between"}>
            <div>
                <div>Latitude: {data.coordinate.lat}</div>
                <div>Longitude: {data.coordinate.lng}</div>
                <div className={"flex items-center gap-1 pt-2"}>
                    {data.sendMode.map((x: string, index: number) => {
                        const color: string = severityColors[index];
                        return <Badge value={x} severity={color}/>
                    })}
                </div>

            </div>
            <div>
                <Countdown date={Date.now() + 100000}/>
            </div>

        </div>

        <div className={"flex w-full justify-end"}>
            <Button icon={"pi pi-eye"} size={"small"} text label={"View"} onClick={()=>{
                dispatch(setCenterPosition([data.coordinate.lat, data.coordinate.lng]));
                dispatch(setZoom(10));
            }}/>
            <Button icon={"pi pi-images"} size={"small"} label={"Scenes"} text severity={"secondary"} onClick={()=>{
                dispatch(toggleVisible());
            }}/>
            <Button icon={"pi pi-trash"} size={"small"} severity={"danger"} text onClick={delTarget}/>
        </div>

    </div>


});