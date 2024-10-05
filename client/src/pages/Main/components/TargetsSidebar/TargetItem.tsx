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
                <div>Latitude: {data.latitude}</div>
                <div>Longitude: {data.longitude}</div>
            </div>
            <div>
                <Countdown date={Date.now() + data.count} />
            </div>
        </div>



    </div>


});