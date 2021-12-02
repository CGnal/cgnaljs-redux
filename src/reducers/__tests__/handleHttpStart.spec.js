import * as _ from "lamb";

import { httpState } from "./test-data";

import { handleHttpStart } from "../index";

describe("handleHttpStart", () => {
    const stateWithError = _.setIn(httpState, "error", {});
    const stateWithUsersError = _.setPathIn(httpState, "app.usersError", {});

    it("should build a function that allows to set a loading path to `true` and reset an error path to `null`", () => {
        const handleDataStart = handleHttpStart("app.usersError", "app.usersIsLoading");

        expect(handleDataStart(stateWithUsersError)).toStrictEqual({
            ...httpState,
            app: {
                ...httpState.app,
                usersIsLoading: true
            }
        });
    });

    it("should use `isLoading` and `error` as default keys", () => {
        const handleDataStart = handleHttpStart();

        expect(handleDataStart(stateWithError)).toStrictEqual({
            ...httpState,
            isLoading: true
        });
    });

    it("should ignore the loading or the error paths if they are empty strings", () => {
        const handleDataStart = handleHttpStart("", "");

        expect(handleDataStart(stateWithError)).toBe(stateWithError);
    });
});
