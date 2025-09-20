"use client";
import { NotistackProvider } from "./Notistack.provider";
import ReactQueryProvider from "./ReactQuery.provider";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";

export function RootProvider({ children }: { children: React.ReactNode }) {
	return (
		<StoreProvider>
			<ReactQueryProvider>
				<ThemeProvider>
					<NotistackProvider>{children}</NotistackProvider>
				</ThemeProvider>
			</ReactQueryProvider>
		</StoreProvider>
	);
}
