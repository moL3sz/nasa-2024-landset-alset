import {memo} from "react";
import {TargetItemType} from "../../@types/targetItem.type.ts";
import Countdown from "react-countdown";




type TargetItemProps = {
    data:TargetItemType
}
export const TargetItem = memo(({data}:TargetItemProps) =>{





    return <div className={"border-b-[1px] border-gray-700 py-1"}>
        <div className={"text-white font-bold"}>{data.locationName}</div>
        <div className={"mt-2 flex justify-between"}>
            <div >
                <div>Latitude: {data.coordinate.lat}</div>
                <div>Longitude: {data.coordinate.lng}</div>
            </div>
            <div>
                <Countdown date={Date.now() + 0} />
            </div>
        </div>



    </div>


});