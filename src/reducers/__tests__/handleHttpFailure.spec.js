import * as _ from "lamb";

import { httpState } from "./test-data";

import { handleHttpFailure } from "../index";

describe("handleHttpFailure", () => {
    const errorAction = {
        error: true,
        payload: new Error("some error"),
        meta: {
            originalAction: { type: "DATA_GET" }
        },
        type: "DATA_GET_KO"
    };
    const loadingState = _.setIn(httpState, "isLoading", true);
    const usersLoadingState = _.setPathIn(httpState, "app.usersIsLoading", true);
    const title = "Some title";
    const message = "Some message";
    const expectedError = {
        message,
        originalAction: errorAction.meta.originalAction,
        originalError: errorAction.payload,
        title
    };

    it("should set the loading status and the received error in the proper state paths", () => {
        const handleDataFailure = handleHttpFailure(title, message, "app.usersError", "app.usersIsLoading");

        expect(handleDataFailure(usersLoadingState, errorAction)).toStrictEqual({
            ...httpState,
            app: {
                ...httpState.app,
                usersError: expectedError
            }
        });
    });

    it("should use `error` and `isLoading` as default keys", () => {
        const handleDataFailure = handleHttpFailure(title, message);

        expect(handleDataFailure(loadingState, errorAction)).toStrictEqual({
            ...httpState,
            error: expectedError
        });
    });

    it("should have default values for the user friendly title and message", () => {
        const handleDataFailure = handleHttpFailure();

        expect(handleDataFailure(loadingState, errorAction)).toStrictEqual({
            ...httpState,
            error: {
                message: expect.any(String),
                originalAction: errorAction.meta.originalAction,
                originalError: errorAction.payload,
                title: expect.any(String)
            }
        });
    });

    it("should ignore the `error` and `isLoading` paths if they are empty strings", () => {
        const stateWithUsersError = _.setPathIn(usersLoadingState, "app.usersError", {});
        const handleDataFailure = handleHttpFailure(title, message, "", "");

        expect(handleDataFailure(stateWithUsersError, errorAction)).toBe(stateWithUsersError);
    });
});
