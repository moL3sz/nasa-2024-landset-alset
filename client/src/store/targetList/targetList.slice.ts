
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type TargetListState = {
    opened:boolean
}

const initialState:TargetListState = {
    opened:false
}

const targetListSlice = createSlice({
    name: 'targetList',
    initialState,
    reducers: {
        toggle(state){
            state.opened = !state.opened;
        }
    },
})

export const { toggle } = targetListSlice.actions
export const targetListReducer = targetListSlice.reducer