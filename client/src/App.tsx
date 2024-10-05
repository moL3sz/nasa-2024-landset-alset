import './App.css'
import 'primeicons/primeicons.css';
import {Map} from "./pages/Main/components/Map/Map.tsx";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {Globe} from "./pages/Main/components/Globe/Globe.tsx";
import {TargetSidebar} from "./pages/Main/components/TargetsSidebar/TargetsSidebar.tsx";
import {useEffect} from "react";
import {BASE_API_URL} from "./config/globals.ts";
import {TLEType} from "./pages/Main/components/Globe/@types/tle.type.ts";
import {setTLEData} from "./store/gobal/global.store.ts";
import {ImageScenes} from "./pages/Main/components/ImageScenes/ImageScenes.tsx";
import "flag-icon-css/css/flag-icons.css"

function App() {


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

    return (

        <main className={"w-full"}>
            <Navbar/>
            <Map/>
            <TargetSidebar/>
            <ImageScenes/>
        </main>
    )
}

export default App
