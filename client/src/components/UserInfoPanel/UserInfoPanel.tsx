import {memo} from "react";
import {Sidebar} from "primereact/sidebar";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {toggleUserInfoVisible} from "../../store/gobal/global.store.ts";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";


export const UserInfoPanel = memo(()=>{


    const visible = useAppSelector(state=>state.global.userInfoVisible);
    const dispatch = useAppDispatch();
    const targets = useAppSelector(state=>state.map.targets);


    return <Sidebar visible={visible} position={"right"} onHide={()=>dispatch(toggleUserInfoVisible())}>
        <div className={"h-[100px] w-full rounded bg-no-repeat shadow-2xl"}
             style={{backgroundImage:"url(https://geology.com/satellite/phytoplankton-blooms-from-space/south-island-new-zealand.jpg)",
             }}>

        </div>
        <div className={"flex flex-col items-center justify-between"} style={{height:"calc(100vh - 200px)"}}>
            <div className={"flex flex-col items-center gap-4"}>
                <div
                    className={"translate-y-[-20px] bg-gradient-to-bl p-1 transition-all from-indigo-400 to-blue-500 h-[64px] w-[64px] rounded-full flex items-center justify-center shadow-2xl cursor-pointer"}>
                    MB
                </div>

                <div className={"font-semibold text-white"}>
                    Test username
                </div>
                <div>
                    test@gmail.com
                </div>
                <Badge value={`${targets.length} current target locations`}/>
            </div>




            <Button icon={"pi pi-sign-out"} severity={"danger"} label={"Sign out"} size={"small"} className={"w-full"}/>
        </div>
    </Sidebar>


});