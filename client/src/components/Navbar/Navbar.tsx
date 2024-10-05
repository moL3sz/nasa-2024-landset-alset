import {memo, useRef} from "react";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setMode} from "../../store/mode/mode.slice.ts";
import {OverlayPanel} from "primereact/overlaypanel";
import {Notifications} from "../Notifications/Notifications.tsx";
import {Targets} from "../Targets/Targets.tsx";


export const Navbar = memo(() => {

    const mode =useAppSelector(state=>state.mode.mode);
    const dispatch = useAppDispatch();

    const notificationsRef = useRef<OverlayPanel>(null);
    const targetsRef = useRef<OverlayPanel>(null);

    const changeMode = () => dispatch(setMode());

    const openNotifications = (e:any) => notificationsRef.current?.toggle(e);
    const openTargets = (e:any) => targetsRef.current?.toggle(e);

    return (
        <div className={"flex items-center justify-between w-full fixed z-50 shadow-lg h-[60px] px-4 bg-gray-800"}>
            <div className={"flex items-center gap-2"}>
                <Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"} width={48} height={48}/>
                <Button type="button" icon={"pi pi-image"} label="Scenes" size={"small"}/>
                <Button type="button" icon={"pi pi-map-marker"} label="Targets" size={"small"} severity="danger" onClick={openTargets}/>
                <Button type="button" icon={"pi pi-bell"} label="Notifications" size={"small"} severity="warning" onClick={openNotifications}/>
            </div>

            <Button
                className={"justify-self-end"}
                size={"small"}
                label={mode ? "Map" : "Globe"}
                text
                icon={mode ? "pi pi-map" : "pi pi-globe"}
                severity="secondary"
                onClick={changeMode}
            />
            <Notifications ref={notificationsRef}/>
            <Targets ref={targetsRef}/>
        </div>
    );

})