import * as _ from "lamb";

import { immutable } from "./helpers";
import { combine } from "../index";

describe("combine", () => {
    const initialState = immutable({
        data: [
            { value: 1 },
            { value: 5 }
        ],
        error: null,
        isLoading: false
    });
    const action = {
        payload: { value: 7 },
        type: "FOO_TYPE"
    };

    it("should accept multiple helper functions acting on the same part of a state in order to produce a new state with the combined results", () => {
        const result = {
            data: [
                { value: 3 },
                { value: 5 },
                { value: 7 }
            ],
            error: expect.any(Error),
            isLoading: true
        };
        const functions = [
            _.updatePath("data.0.value", _.add(1)),
            (state, { payload }) => _.updateIn(state, "data", _.append(payload)),
            _.updatePath("data.0.value", _.add(1)),
            _.setKey("error", new Error("some message")),
            _.setKey("isLoading", true)
        ];

        expect(combine(functions)(initialState, action)).toStrictEqual(result);
    });

    it("should do nothing if the functions array is empty", () => {
        expect(combine([])(initialState, action)).toBe(initialState);
    });
});
