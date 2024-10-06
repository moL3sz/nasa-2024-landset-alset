import './App.css'
import 'primeicons/primeicons.css';
import "flag-icon-css/css/flag-icons.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import {lazy, Suspense} from "react";

const Login = lazy(() => import("./pages/Login/Login.tsx"));
const Main = lazy(() => import("./pages/Main/Main.tsx"));
const Register = lazy(() => import("./pages/Register/Register.tsx"));

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Suspense>
                    <Routes>
                        <Route path={"/signin"} element={<Login/>}/>
                        <Route path={"/signup"} element={<Register/>}/>
                        <Route path={"/"} element={<Main/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </Provider>
    )
}

export default App
