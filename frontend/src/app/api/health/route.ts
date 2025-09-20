import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Check if the backend API is reachable
		const backendUrl =
			process.env.API_BASE_URL ||
			process.env.NEXT_PUBLIC_API_BASE_URL ||
			"http://localhost:3000";

		let backendHealth = "unknown";
		let backendResponseTime = 0;

		try {
			const startTime = Date.now();
			const response = await fetch(`${backendUrl}/health`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				// Set a timeout for the health check
				signal: AbortSignal.timeout(5000),
			});

			backendResponseTime = Date.now() - startTime;
			backendHealth = response.ok ? "healthy" : "unhealthy";
		} catch (error) {
			backendHealth = "unhealthy";
			console.error("Backend health check failed:", error);
		}

		const healthData = {
			status: "healthy",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			environment: process.env.NODE_ENV || "development",
			version: process.env.npm_package_version || "1.0.0",
			services: {
				frontend: {
					status: "healthy",
					details: {
						nodeVersion: process.version,
						platform: process.platform,
						arch: process.arch,
					},
				},
				backend: {
					status: backendHealth,
					responseTime: `${backendResponseTime}ms`,
					url: backendUrl,
				},
			},
			checks: {
				memory: {
					used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
					total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
					unit: "MB",
				},
			},
		};

		return NextResponse.json(healthData, {
			status: 200,
			headers: {
				"Cache-Control": "no-cache, no-store, must-revalidate",
				Pragma: "no-cache",
				Expires: "0",
			},
		});
	} catch (error) {
		console.error("Health check error:", error);

		return NextResponse.json(
			{
				status: "unhealthy",
				timestamp: new Date().toISOString(),
				error: "Internal server error during health check",
				services: {
					frontend: {
						status: "unhealthy",
						error: error instanceof Error ? error.message : "Unknown error",
					},
				},
			},
			{
				status: 503,
				headers: {
					"Cache-Control": "no-cache, no-store, must-revalidate",
					Pragma: "no-cache",
					Expires: "0",
				},
			}
		);
	}
}

// Also support HEAD requests for simple health checks
export async function HEAD() {
	try {
		return new NextResponse(null, {
			status: 200,
			headers: {
				"Cache-Control": "no-cache, no-store, must-revalidate",
				Pragma: "no-cache",
				Expires: "0",
			},
		});
	} catch {
		return new NextResponse(null, { status: 503 });
	}
}
