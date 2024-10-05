import {Sidebar} from "primereact/sidebar";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {toggle} from "../../../../store/targetList/targetList.slice.ts";
import {Badge} from "primereact/badge";
import {TargetItemType} from "../../@types/targetItem.type.ts";
import {InputText} from "primereact/inputtext";
import {TargetItem} from "./TargetItem.tsx";


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


    const getTargetList = () =>{
        try {

        }
        catch (e){

        }
        finally {

        }
    }

    return <Sidebar
        visible={opened}
        className={"w-[500px]"}
        position={"right"}
        onHide={() => dispatch(toggle())}
    >
        <i className={"pi pi-map-marker"}/> <span>Current target locations</span>
        <Badge value={testData.length} severity={"danger"} className={"ms-2"}></Badge>

        <div className={"w-full mt-4"}>
            <InputText className={"w-full"} placeholder={"Search by location name..."} />
            <div className={"flex flex-col gap-2 mt-4 "}>
                {
                    testData.map((item)=>{
                        return <TargetItem data={item}/>
                    })
                }
            </div>

        </div>

    </Sidebar>
}