import {configureStore} from '@reduxjs/toolkit';
import {modeReducer} from "./mode/mode.slice.ts";
import {targetListReducer} from "./targetList/targetList.slice.ts";
import {mapReducer} from "./map/map.slice.ts";
import {globalReducer} from "./gobal/global.store.ts";

export const store = configureStore({
	reducer: {
		mode:modeReducer,
		targetList:targetListReducer,
		map:mapReducer,
		global: globalReducer
	},
});
