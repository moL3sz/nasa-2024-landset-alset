import {createSlice} from "@reduxjs/toolkit";


type ModeState = {
    mode:boolean
}

const initialState:ModeState = {
    mode:true
}

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        setMode(state){
            state.mode = !state.mode;
        }
    },
})

export const { setMode } = modeSlice.actions
export const modeReducer = modeSlice.reducer