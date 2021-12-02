import { isHttpUnauthorizedAction } from "../index";

describe("isHttpUnauthorizedAction", () => {
    it("should check if an action represents a 401 Unauthorized HTTP error", () => {
        const actionA = { type: "FOO_TYPE" };
        const actionB = { ...actionA, payload: {} };
        const actionC = { ...actionB, error: true };
        const actionD = { ...actionC, payload: { status: 500 } };
        const actionE = { ...actionC, payload: { status: 401 } };

        expect(isHttpUnauthorizedAction(actionA)).toBe(false);
        expect(isHttpUnauthorizedAction(actionB)).toBe(false);
        expect(isHttpUnauthorizedAction(actionC)).toBe(false);
        expect(isHttpUnauthorizedAction(actionD)).toBe(false);
        expect(isHttpUnauthorizedAction(actionE)).toBe(true);
    });
});
