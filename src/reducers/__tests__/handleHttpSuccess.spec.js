import * as _ from "lamb";

import { httpState } from "./test-data";

import { handleHttpSuccess } from "../index";

describe("handleHttpSuccess", () => {
    const successAction = {
        payload: [1, 2, 3],
        type: "HTTP_SUCCESS"
    };
    const transformer = jest.fn(_.mapWith(_.multiplyBy(2)));
    const loadingState = _.setIn(httpState, "isLoading", true);
    const usersLoadingState = _.setPathIn(httpState, "app.usersIsLoading", true);

    afterEach(() => {
        transformer.mockClear();
    });

    it("should reset the loading status and apply the given transformer to the action payload, setting the result in the desired state path", () => {
        const handleDataSuccess = handleHttpSuccess(
            "app.users",
            "app.usersIsLoading",
            transformer
        );

        expect(handleDataSuccess(usersLoadingState, successAction)).toStrictEqual({
            ...httpState,
            app: {
                ...httpState.app,
                users: [2, 4, 6],
                usersIsLoading: false
            }
        });
        expect(transformer).toHaveBeenCalledTimes(1);
        expect(transformer).toHaveBeenCalledWith(successAction.payload, httpState.app.users);
    });

    it("should use `data` and `isLoading` as default keys", () => {
        const handleDataSuccess = handleHttpSuccess(void 0, void 0, transformer);

        expect(handleDataSuccess(loadingState, successAction)).toStrictEqual({
            ...httpState,
            data: [2, 4, 6]
        });
        expect(transformer).toHaveBeenCalledTimes(1);
        expect(transformer).toHaveBeenCalledWith(successAction.payload, httpState.data);
    });

    it("should use the identity function as the default transformer", () => {
        const handleDataSuccess = handleHttpSuccess("app.users", "app.usersIsLoading");

        expect(handleDataSuccess(usersLoadingState, successAction)).toStrictEqual({
            ...httpState,
            app: {
                ...httpState.app,
                users: successAction.payload,
                usersIsLoading: false
            }
        });
    });

    it("should ignore the `data` or the `isLoading` paths if they are empty strings", () => {
        const handleDataSuccess = handleHttpSuccess("", "", transformer);

        expect(handleDataSuccess(usersLoadingState, successAction)).toBe(usersLoadingState);
        expect(transformer).not.toHaveBeenCalled();
    });
});
