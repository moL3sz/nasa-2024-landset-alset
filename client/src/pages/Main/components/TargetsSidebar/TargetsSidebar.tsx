import {Sidebar} from "primereact/sidebar";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {toggle} from "../../../../store/targetList/targetList.slice.ts";
import {Badge} from "primereact/badge";
import {TargetItemType} from "../../@types/targetItem.type.ts";
import {InputText} from "primereact/inputtext";
import {TargetItem} from "./TargetItem.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import {BASE_API_URL} from "../../../../config/globals.ts";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {ScrollPanel} from "primereact/scrollpanel";


const testData: any[] = [

    {
        locationName: "Eger",
        latitude: 47.20,
        longitude: 20.32,
        count:20000
    },
    {
        locationName: "Budapest",
        latitude: 47.20,
        longitude: 20.32,
        count:50000
    },
    {
        locationName: "New York",
        latitude: 47.20,
        longitude: 20.32,
        count:100000
    },
    {
        locationName: "Eger",
        latitude: 47.20,
        longitude: 20.32,
        count:20000
    },
    {
        locationName: "Budapest",
        latitude: 47.20,
        longitude: 20.32,
        count:50000
    },
    {
        locationName: "New York",
        latitude: 47.20,
        longitude: 20.32,
        count:100000
    },
    {
        locationName: "Eger",
        latitude: 47.20,
        longitude: 20.32,
        count:20000
    },
    {
        locationName: "Budapest",
        latitude: 47.20,
        longitude: 20.32,
        count:50000
    },
    {
        locationName: "New York",
        latitude: 47.20,
        longitude: 20.32,
        count:100000
    },
    {
        locationName: "Eger",
        latitude: 47.20,
        longitude: 20.32,
        count:20000
    },
    {
        locationName: "Budapest",
        latitude: 47.20,
        longitude: 20.32,
        count:50000
    },
    {
        locationName: "New York",
        latitude: 47.20,
        longitude: 20.32,
        count:100000
    }
]

export const TargetSidebar = () => {

    const opened = useAppSelector(state => state.targetList.opened);
    const dispatch = useAppDispatch();
    const targets = useAppSelector(state=>state.map.targets);
    const [query, setQuery] = useState<string>("");


    const filteredData = useMemo(() => {
        return targets.filter(item =>
            item.locationName.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, targets]);


    return <Sidebar
        visible={opened}
        className={"w-[500px] z-10"}
        position={"right"}
        onHide={() => dispatch(toggle())}
    >
        <i className={"pi pi-map-marker"}/> <span>Current target locations</span>
        <Badge value={targets.length} severity={"danger"} className={"ms-2"}></Badge>

        <div className={"w-full mt-4"}>
            <IconField iconPosition="left">
                <InputIcon className={"pi pi-search"}/>
                <InputText className={"w-full"} placeholder={"Search by location name..."} onChange={(e)=>{
                    setTimeout(()=>{
                        setQuery(e.target.value);
                    }, 500);
                }}/>
            </IconField>
            <ScrollPanel style={{height:"calc(100vh - 200px)"}} className={"mt-2"}>
                {
                    filteredData.map((item)=>{
                        return <TargetItem data={item}/>
                    })
                }
            </ScrollPanel>

        </div>

    </Sidebar>
}