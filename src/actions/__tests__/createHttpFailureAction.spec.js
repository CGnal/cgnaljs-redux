import { createHttpFailureAction } from "../index";

describe("createHttpFailureAction", () => {
    it("should build an action creator that uses its second argument to set the `originalAction` key of its metadata", () => {
        const originalAction = { type: "ORIGINAL_ACTION" };
        const error = new Error("some message");
        const createErrorAction = createHttpFailureAction("API_CALL_KO");

        expect(createErrorAction(error, originalAction)).toStrictEqual({
            error: true,
            meta: { originalAction },
            payload: error,
            type: "API_CALL_KO"
        });
    });

    it("should set an `undefined` original action property if the creator doesn't receive one", () => {
        const error = new Error("some message");
        const createErrorAction = createHttpFailureAction("API_CALL_KO");

        expect(createErrorAction(error)).toStrictEqual({
            error: true,
            meta: { originalAction: void 0 },
            payload: error,
            type: "API_CALL_KO"
        });
    });
});
