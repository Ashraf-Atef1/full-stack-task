import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// domains: ["nawy.com"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: "**", // allows all https domains
			},
			{
				protocol: "https",
				hostname: "**", // allows all https domains
			},
		],
	},
	outputFileTracingRoot: ".",
	output: "standalone",
};

export default withNextIntl(nextConfig);
