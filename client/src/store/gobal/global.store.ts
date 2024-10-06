import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TLEType} from "../../pages/Main/components/Globe/@types/tle.type.ts";

type GlobalState = {
	TLEList: TLEType[],
	userInfoVisible:boolean,
}

const initialState: GlobalState = {
	TLEList: [],
	userInfoVisible:false
}

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setTLEData(state, {payload}: PayloadAction<TLEType[]>) {
			state.TLEList = payload;
		},
		toggleUserInfoVisible(state){
			state.userInfoVisible = !state.userInfoVisible;
		}

	},
})

export const {
	setTLEData,
	toggleUserInfoVisible
} = globalSlice.actions
export const globalReducer = globalSlice.reducer



