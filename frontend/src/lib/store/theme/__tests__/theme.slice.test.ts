import themeReducer, { setTheme } from "../theme.slice";
import { ThemeMode } from "../theme.types";

// Mock localStorage
const mockLocalStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
	value: mockLocalStorage,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

describe("Theme Slice", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Initial State", () => {
		it("should use light theme as default fallback", () => {
			mockLocalStorage.getItem.mockReturnValue(null);
			(window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

			const initialState = { mode: "light" as ThemeMode };
			const state = themeReducer(initialState, { type: "@@INIT" });
			expect(state.mode).toBe("light");
		});

		it("should handle theme switching correctly", () => {
			const initialState = { mode: "light" as ThemeMode };
			const darkState = themeReducer(initialState, setTheme("dark"));
			expect(darkState.mode).toBe("dark");
		});
	});

	describe("Actions", () => {
		it("should handle setTheme action", () => {
			const initialState = { mode: "light" as ThemeMode };

			const action = setTheme("dark");
			const newState = themeReducer(initialState, action);

			expect(newState.mode).toBe("dark");
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "dark");
		});

		it("should handle switching between themes", () => {
			let state = { mode: "light" as ThemeMode };

			// Switch to dark
			state = themeReducer(state, setTheme("dark"));
			expect(state.mode).toBe("dark");

			// Switch back to light
			state = themeReducer(state, setTheme("light"));
			expect(state.mode).toBe("light");
		});
	});

	describe("LocalStorage Integration", () => {
		it("should save theme to localStorage when setTheme is dispatched", () => {
			const initialState = { mode: "light" as ThemeMode };

			themeReducer(initialState, setTheme("dark"));

			expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", "dark");
		});
	});
});
