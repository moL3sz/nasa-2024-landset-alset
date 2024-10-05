import './App.css'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-teal/theme.css"
import {Map} from "./pages/Main/components/Map/Map.tsx";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import {useAppSelector} from "./store/hooks.ts";
import {Globe} from "./pages/Main/components/Globe/Globe.tsx";

function App() {


    const mode = useAppSelector(state => state.mode.mode);

    return (

        <main className={"w-full"}>
            <Navbar/>

            {
                mode ? <Map/> : <Globe/>
            }

        </main>
    )
}

export default App
