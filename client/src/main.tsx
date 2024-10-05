import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {PrimeReactProvider} from "primereact/api";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <PrimeReactProvider>
                <App/>

            </PrimeReactProvider>
        </Provider>
)
