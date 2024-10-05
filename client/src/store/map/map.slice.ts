

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type MapState = {
    targets:any[],
}

const initialState:MapState = {
    targets:[]
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
        updateTarget(state, {payload}:PayloadAction<string>){

        }


    },
})

export const {
    setTargets,
    addTargetTemporarly,
    addTarget,
    deleteTarget,
    updateTarget
} = mapSlice.actions
export const mapReducer = mapSlice.reducer



