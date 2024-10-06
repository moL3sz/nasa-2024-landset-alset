import {Map} from "./components/Map/Map.tsx";
import {Navbar} from "../../components/Navbar/Navbar.tsx";
import {TargetSidebar} from "./components/TargetsSidebar/TargetsSidebar.tsx";
import {ImageScenes} from "./components/ImageScenes/ImageScenes.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {BASE_API_URL} from "../../config/globals.ts";
import {TLEType} from "./components/Globe/@types/tle.type.ts";
import {setTLEData} from "../../store/gobal/global.store.ts";
import {UserInfoPanel} from "../../components/UserInfoPanel/UserInfoPanel.tsx";


const Main = () =>{


    const mode = useAppSelector(state => state.mode.mode);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const fetchTLE = async ()=>{
            const res = await fetch(BASE_API_URL + "/tle/latest");
            const data: TLEType = await res.json()
            dispatch(setTLEData([data]))
        }
        fetchTLE()
    }, [dispatch]);

    return <>
        <main className={"w-full"}>
            <Navbar/>
            <Map/>
            <TargetSidebar/>
            <ImageScenes/>
            <UserInfoPanel/>
        </main>
    </>

}

export default Main;