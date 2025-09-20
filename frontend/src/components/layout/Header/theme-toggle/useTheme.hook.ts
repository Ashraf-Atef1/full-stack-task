import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTheme } from "@/lib/store/theme/theme.slice";
import { useEffect } from "react";

export const useTheme = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme.mode);
	const isDarkMode = theme === "dark";

	useEffect(() => {
		document.body.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return {
		theme,
		toggleTheme: () => dispatch(setTheme(theme === "light" ? "dark" : "light")),
		isDarkMode,
	};
};
