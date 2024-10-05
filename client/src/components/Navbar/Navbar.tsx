import {memo, useRef, useState} from "react";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setMode} from "../../store/mode/mode.slice.ts";
import {OverlayPanel} from "primereact/overlaypanel";
import {Notifications} from "../Notifications/Notifications.tsx";
import {Targets} from "../Targets/Targets.tsx";
import {toggle} from "../../store/targetList/targetList.slice.ts";
import {Badge} from "primereact/badge";
import {InputText} from "primereact/inputtext";
import {SearchResults} from "../SearchResults/SearchResults.tsx";
import {OPENCAGE_APIKEY} from "../../config/globals.ts";

export const Navbar = memo(() => {

    const mode = useAppSelector(state => state.mode.mode);
    const dispatch = useAppDispatch();

    const [searchResults, setSearchResults] = useState<any[]>([]);

    const notificationsRef = useRef<OverlayPanel>(null);
    const targetsRef = useRef<OverlayPanel>(null);
    const searchInputRef = useRef<any>(null);
    const searchResultsRef = useRef<OverlayPanel>(null);

    const changeMode = () => dispatch(setMode());

    const openNotifications = (e: any) => notificationsRef.current?.toggle(e);

    const openTargetList = () => dispatch(toggle());



    const searchLocations = async (e:any) =>{

        if (e.code !== "Enter") {
            return;
        }

        const searchValue = searchInputRef.current?.value;
        console.log(searchValue)

        searchResultsRef.current?.toggle(e)
        try{
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchValue}&key=${OPENCAGE_APIKEY}`, {
                method:"GET"
            });
            const data = await response.json();
            setSearchResults(data.results)
        }
        catch (e){
            console.error(e);
        }
        finally {

        }

    }

    return (
        <div className={"flex items-center w-full fixed z-50 shadow-lg h-[60px] px-4 bg-gray-800 bg-opacity-75 gap-2"}>
            <Image
                src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1224px-NASA_logo.svg.png"}
                width={48} height={48}/>
            <Button type="button" icon={"pi pi-image"} label="Scenes" size={"small"} className={"min-w-fit"}/>
            <Button type="button" icon={"pi pi-bell"}  className={"min-w-fit"} label="Notifications" size={"small"} severity="warning"
                    onClick={openNotifications}/>
            <InputText ref={searchInputRef} className={"opacity-50 w-full"} placeholder={"Search locations"} onKeyPress={searchLocations}/>
            <div className={"flex items-center gap-2"}>
                <Button
                    className={"justify-self-end"}
                    size={"small"}
                    label={mode ? "Map" : "Globe"}
                    icon={mode ? "pi pi-map" : "pi pi-globe"}
                    onClick={changeMode}
                />

                <Button size={"small"} icon={"pi pi-map-marker"} severity={"danger"} text onClick={openTargetList}>
                    <Badge value="2" className={"ms-1"} severity={"danger"}></Badge>
                </Button>
            </div>

            <Notifications ref={notificationsRef}/>
            <Targets ref={targetsRef}/>
            <SearchResults ref={searchResultsRef} searchResults={searchResults}/>
        </div>
    );

})