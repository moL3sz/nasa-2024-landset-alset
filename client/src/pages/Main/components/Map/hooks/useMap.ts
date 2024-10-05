import {useAppDispatch, useAppSelector} from "../../../../../store/hooks.ts";
import {useCallback, useEffect} from "react";
import {BASE_API_URL} from "../../../../../config/globals.ts";
import {setTargets} from "../../../../../store/map/map.slice.ts";


export const useMap = () =>{

    const targets = useAppSelector(state=>state.map.targets);
    const dispatch = useAppDispatch();

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
        targets
    }
}