

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type MapState = {
    targets:any[],
	pathDate: string,
}

const initialState:MapState = {
    targets:[],
	pathDate: "",
}

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
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
		}


    },
})

export const {
    setTargets,
    addTargetTemporarly,
    addTarget,
    deleteTarget,
    updateTarget,
	setPathDate
} = mapSlice.actions
export const mapReducer = mapSlice.reducer



