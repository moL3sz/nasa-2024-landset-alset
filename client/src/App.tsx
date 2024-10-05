import './App.css'
import 'primeicons/primeicons.css';
import {Map} from "./pages/Main/components/Map/Map.tsx";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import {useAppSelector} from "./store/hooks.ts";
import {Globe} from "./pages/Main/components/Globe/Globe.tsx";
import {TargetSidebar} from "./pages/Main/components/TargetsSidebar/TargetsSidebar.tsx";
import {ImageScenes} from "./pages/Main/components/ImageScenes/ImageScenes.tsx";

function App() {


    const mode = useAppSelector(state => state.mode.mode);

    return (

        <main className={"w-full"}>
            <Navbar/>

            {
                mode ? <Map/> : <Globe/>
            }
            <TargetSidebar/>
            <ImageScenes/>
        </main>
    )
}

export default App
