import {useAppDispatch, useAppSelector} from "../../../../../store/hooks.ts";
import {useCallback, useEffect, useRef} from "react";
import {BASE_API_URL} from "../../../../../config/globals.ts";
import {setTargets} from "../../../../../store/map/map.slice.ts";
import {OverlayPanel} from "primereact/overlaypanel";
import {Calendar} from "primereact/calendar";


export const useMap = () =>{

    const targets = useAppSelector(state=>state.map.targets);
    const dispatch = useAppDispatch();


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



    useEffect(()=>{
        getTargetList();
    },[]);

    return {
        targets,
		overlayPanel,
		calendar
    }
}