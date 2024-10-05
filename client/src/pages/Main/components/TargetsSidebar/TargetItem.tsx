import {memo} from "react";
import {TargetItemType} from "../../@types/targetItem.type.ts";
import Countdown from "react-countdown";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";


type TargetItemProps = {
    data: TargetItemType
}

const severityColors: { [key: number]: string } = {
    0: "warning",
    1: "contrast",
    2: "success",
}

export const TargetItem = memo(({data}: TargetItemProps) => {


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
                <Countdown date={Date.now() + 0}/>
            </div>

        </div>

        <div className={"flex w-full justify-end"}>
            <Button icon={"pi pi-trash"} size={"small"} severity={"danger"} text/>
        </div>

    </div>


});