import { combineReducers } from "@reduxjs/toolkit";
import ThemeReducer from "./theme/theme.slice";

export const rootReducer = combineReducers({
	theme: ThemeReducer,
});
