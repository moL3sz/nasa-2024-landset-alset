

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MAP_BASE_CENTER} from "../../config/globals.ts";

type MapState = {
    targets:any[],
    centerPosition:number[]
	pathDate: string,
    zoom:number
}

const initialState:MapState = {
    targets:[],
    centerPosition:MAP_BASE_CENTER,
	pathDate: "",
    zoom:6
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {

        setCenterPosition(state, {payload}:PayloadAction<number[]>){
            state.centerPosition = [...payload];
        },

        setTargets(state, {payload}:PayloadAction<any[]>){
            state.targets = [...payload];
        },

        addTarget(state, {payload}:PayloadAction<any>){
            state.targets = [...state.targets, payload];
        },

        addTargetTemporarly(state, {payload}:PayloadAction<any>){
            state.targets = [...state.targets, payload];

        },
        deleteTarget(state, {payload}:PayloadAction<string>){
            const filtered = state.targets.filter(x=>x._id !== payload);
            state.targets = [...filtered];
        },
        updateTarget(state, {payload}:PayloadAction<string>) {

		},
		setPathDate(state, {payload}:PayloadAction<string>){
			state.pathDate = payload;
		},
        setZoom(state, {payload}:PayloadAction<number>){
            state.zoom = payload;
        }


    },
})

export const {
    setTargets,
    addTargetTemporarly,
    addTarget,
    deleteTarget,
	setPathDate,
    updateTarget,
    setCenterPosition,
    setZoom
} = mapSlice.actions
export const mapReducer = mapSlice.reducer



