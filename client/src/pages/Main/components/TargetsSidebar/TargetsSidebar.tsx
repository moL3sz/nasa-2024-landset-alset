import {Sidebar} from "primereact/sidebar";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks.ts";
import {toggle} from "../../../../store/targetList/targetList.slice.ts";
import {Badge} from "primereact/badge";
import {InputText} from "primereact/inputtext";
import {TargetItem} from "./TargetItem.tsx";
import {useEffect, useMemo, useState} from "react";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {ScrollPanel} from "primereact/scrollpanel";
import {BASE_API_URL} from "../../../../config/globals.ts";
import {TargetItemType} from "../../@types/targetItem.type.ts";


export const TargetSidebar = () => {

    const opened = useAppSelector(state => state.targetList.opened);
    const dispatch = useAppDispatch();
    const [targets, setTargets] = useState<TargetItemType[]>([]);
    const [query, setQuery] = useState<string>("");


    const getTargets = async () =>{
        try{
            const response = await fetch(BASE_API_URL + "/targets/passing");
            const data = await response.json();
            setTargets(data);

        }
        catch (e){

        }
    }

    useEffect(()=>{
        getTargets();
    },[opened])

    const filteredData = useMemo(() => {
        return targets.filter(item =>
            item.locationName.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, targets]);


    return <Sidebar
        modal={false}
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
                        return <TargetItem key={item._id} data={item}/>
                    })
                }
            </ScrollPanel>

        </div>

    </Sidebar>
}