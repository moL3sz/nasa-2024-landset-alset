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
import {ZIndexUtils} from "primereact/utils";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {toggleUserInfoVisible} from "../../store/gobal/global.store.ts";


export const Navbar = memo(() => {

    const mode = useAppSelector(state => state.mode.mode);
    const targetCount = useAppSelector(state=>state.map.targets.length)
    const dispatch = useAppDispatch();

    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const notificationsRef = useRef<OverlayPanel>(null);
    const targetsRef = useRef<OverlayPanel>(null);
    const searchInputRef = useRef<any>(null);
    const searchResultsRef = useRef<OverlayPanel>(null);

    const changeMode = () => dispatch(setMode());

    const openNotifications = (e: any) => notificationsRef.current?.toggle(e);

    const openTargetList = () => dispatch(toggle());


    const toggleTheme = () =>{
        const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
        console.log(themeLink)
        if (themeLink) {
            themeLink.href = "primereact/resources/themes/lara-light-teal/theme.css"
        }

    }


    const searchLocations = async (e:any) =>{

        if (e.code !== "Enter") {
            return;
        }

        const searchValue = searchInputRef.current?.value;
        console.log(searchValue)
        if (!searchValue || searchValue.length === 0) return;

        searchResultsRef.current?.toggle(e);
        setLoading(true)
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
            setTimeout(()=>{
                setLoading(false);
            },300);
        }

    }

    return (
        <div className={"flex items-center w-full fixed z-50 shadow-lg h-[60px] px-5 bg-gray-800 bg-opacity-75 gap-2 "}>
            {/*<img
                className={"rounded-full shadow-2xl"}
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2AU7HrCZiGamsHv-C4M_zGYO6UBCkuR74zE4NqeF5ENLIP4pcPNSmyGCbz4yibH9R1EY&usqp=CAU"}
                width={48} height={48}/>*/}


            <Button
                visible={false}
                type="button"
                icon={"pi pi-bell"}
                className={"min-w-fit"}
                label="Notifications"
                size={"small"}
                severity="warning"
                onClick={openNotifications}
                tooltip={"Notification settings"}
                tooltipOptions={{position:"bottom"}}
            />
            <IconField iconPosition="left" className={"opacity-50 w-full"}>
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText
                    ref={searchInputRef}
                    tooltip={"Search by city, country, region"}
                    tooltipOptions={{position:"bottom"}}
                    className={"w-full"}
                    placeholder={"Search locations..."}
                    onKeyPress={searchLocations}

                />
            </IconField>


            <div className={"flex items-center gap-2"}>
                <Button
                    icon={"pi pi-sun"}
                    text
                    severity={"warning"}
                    onClick={toggleTheme}
                    tooltip={"Theme"}
                    tooltipOptions={{position:"bottom"}}
                />
                <Button
                    className={"justify-self-end"}
                    size={"small"}
                    text
                    icon={mode ? "pi pi-map" : "pi pi-globe"}
                    onClick={changeMode}
                    tooltip={"Mode"}
                    tooltipOptions={{position:"bottom"}}
                />

                <Button
                    tooltip={"Targets"}
                    tooltipOptions={{position:"bottom"}}
                    size={"small"}
                    icon={"pi pi-map-marker"}
                    severity={"danger"}
                    text
                    onClick={openTargetList}>
                    {
                        targetCount === 0 ? null :
                        <Badge value={targetCount} className={"ms-1"} severity={"danger"}></Badge>
                    }

                </Button>

                <div
                    onClick={()=>dispatch(toggleUserInfoVisible())}
                    className={"hover:scale-110 bg-gradient-to-bl p-1 transition-all from-indigo-400 to-blue-500 h-[32px] w-[32px] rounded-full flex items-center justify-center shadow-2xl cursor-pointer"}>
                    MB
                </div>
            </div>

            <Notifications ref={notificationsRef}/>
            <Targets ref={targetsRef}/>
            <SearchResults ref={searchResultsRef} searchResults={searchResults} loading={loading}/>
        </div>
    );

})