"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeMode } from "./theme.types";

// Get initial theme from localStorage or system preference
const getInitialTheme = (): ThemeMode => {
	if (typeof window === "undefined") return "light";
	const savedTheme = localStorage.getItem("theme") as ThemeMode;
	if (savedTheme) return savedTheme;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

interface ThemeState {
	mode: ThemeMode;
}

const initialState: ThemeState = {
	mode: getInitialTheme(),
};

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ThemeMode>) => {
			state.mode = action.payload;
			localStorage.setItem("theme", action.payload);
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
