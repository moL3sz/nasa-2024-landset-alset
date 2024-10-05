import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TLEType} from "../../pages/Main/components/Globe/@types/tle.type.ts";

type GlobalState = {
	TLEList: TLEType[]
}

const initialState: GlobalState = {
	TLEList: []
}

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setTLEData(state, {payload}: PayloadAction<TLEType[]>) {
			state.TLEList = payload;
		}


	},
})

export const {
	setTLEData
} = globalSlice.actions
export const globalReducer = globalSlice.reducer



