"use client";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

export function NotistackProvider({ children }: { children: ReactNode }) {
	return (
		<SnackbarProvider
			maxSnack={3} // Maximum number of toasts displayed at a time
			anchorOrigin={{
				vertical: "top", // Position: top or bottom
				horizontal: "right", // Position: left, center, or right
			}}
			autoHideDuration={3000} // Time in milliseconds before the toast disappears
			dense
		>
			{children}
		</SnackbarProvider>
	);
}
