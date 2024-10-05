




import {createSlice} from "@reduxjs/toolkit";


type ImageScenesState = {
    visible:boolean,
}

const initialState:ImageScenesState = {
    visible:false
}

const imageScenesSlice = createSlice({
    name: 'imageScenes',
    initialState,
    reducers: {
        toggleVisible(state){
            state.visible = !state.visible;
        }

    },
})

export const { toggleVisible } = imageScenesSlice.actions
export const imageScenesReducer = imageScenesSlice.reducer