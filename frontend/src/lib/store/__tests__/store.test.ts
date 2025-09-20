import { makeStore } from "../store";
import { setTheme } from "../theme/theme.slice";

describe("Redux Store", () => {
	let store: ReturnType<typeof makeStore>;

	beforeEach(() => {
		store = makeStore();
	});

	it("should create store with initial state", () => {
		const state = store.getState();

		expect(state).toHaveProperty("theme");
		expect(state.theme).toHaveProperty("mode");
		expect(["light", "dark"]).toContain(state.theme.mode);
	});

	it("should handle theme actions", () => {
		// Initial state
		const initialState = store.getState();
		expect(["light", "dark"]).toContain(initialState.theme.mode);

		// Dispatch setTheme action
		store.dispatch(setTheme("dark"));
		const darkState = store.getState();
		expect(darkState.theme.mode).toBe("dark");

		// Dispatch setTheme action with light
		store.dispatch(setTheme("light"));
		const lightState = store.getState();
		expect(lightState.theme.mode).toBe("light");
	});

	it("should maintain state consistency", () => {
		const state1 = store.getState();
		const state2 = store.getState();

		expect(state1).toEqual(state2);
	});
});
