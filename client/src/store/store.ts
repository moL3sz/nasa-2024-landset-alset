import {configureStore} from '@reduxjs/toolkit';
import {modeReducer} from "./mode/mode.slice.ts";
import {targetListReducer} from "./targetList/targetList.slice.ts";
import {mapReducer} from "./map/map.slice.ts";
import {globalReducer} from "./gobal/global.store.ts";
import {imageScenesReducer} from "./imageScenes/imageScenes.slice.ts";
import {themeReducer} from "./theme/theme.slice.ts";

export const store = configureStore({
	reducer: {
		theme:themeReducer,
		mode:modeReducer,
		targetList:targetListReducer,
		map:mapReducer,
		global: globalReducer,
		imageScenes: imageScenesReducer
	},
});
