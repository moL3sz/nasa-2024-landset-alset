import {configureStore} from '@reduxjs/toolkit';
import {modeReducer} from "./mode/mode.slice.ts";

export const store = configureStore({
	reducer: {
		mode:modeReducer
	},
});
