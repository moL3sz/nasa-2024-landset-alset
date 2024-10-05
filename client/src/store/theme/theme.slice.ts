


import {createSlice} from "@reduxjs/toolkit";


type ThemeState = {
    theme:string
}

const initialState:ThemeState = {
    theme: localStorage.getItem("theme") || "light"
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state){
            if (state.theme === "light") state.theme = "dark";
            else state.theme = "light";
        }
    },
})

export const { toggleTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer