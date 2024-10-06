import {useAppDispatch, useAppSelector} from "../../../../../store/hooks.ts";
import {useCallback, useEffect, useRef} from "react";
import {BASE_API_URL} from "../../../../../config/globals.ts";
import {setTargets} from "../../../../../store/map/map.slice.ts";
import {toggleVisible} from "../../../../../store/imageScenes/imageScenes.slice.ts";
import {OverlayPanel} from "primereact/overlaypanel";
import {Calendar} from "primereact/calendar";


export const useMap = () =>{

    const targets = useAppSelector(state=>state.map.targets);
    const centerPosition = useAppSelector(state=>state.map.centerPosition);
    const dispatch = useAppDispatch();
    const zoom = useAppSelector(state=>state.map.zoom);
    const view = useAppSelector(state=>state.map.view);


	/* Refs */
	const overlayPanel = useRef<OverlayPanel | null>(null)
	const calendar = useRef<Calendar | null>(null)

    const getTargetList = useCallback(async () =>{
        try{
            const response = await fetch(BASE_API_URL + "/targets");
            const data = await response.json();
            dispatch(setTargets(data));
        }
        catch (e){
            console.error(e);
        }
    },[]);

    const showScenes = () =>dispatch(toggleVisible());



    useEffect(()=>{
        getTargetList();
    },[]);

    return {
        targets,
        showScenes,
        centerPosition,
		overlayPanel,
		calendar,
        zoom,
        view
    }
}