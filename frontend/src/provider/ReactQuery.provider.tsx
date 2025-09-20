"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "../utils/get-query-client";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default ReactQueryProvider;
