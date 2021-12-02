jest.mock("redux-saga/effects");

import { call } from "redux-saga/effects";

import { toCallEffect } from "../index";

describe("toCallEffect", () => {
    const fakeAction = { payload: {} };
    const serviceFn = () => {};

    afterEach(() => {
        call.mockRestore();
    });

    afterAll(() => {
        jest.unmock("redux-saga/effects");
    });

    it("should build a call effect with the given function and argument creator", () => {
        const callEffect = toCallEffect(serviceFn, ({ payload }) => ["a", "b", payload]);

        callEffect(fakeAction);

        expect(call).toHaveBeenCalledTimes(1);
        expect(call).toHaveBeenCalledWith(serviceFn, "a", "b", fakeAction.payload);
    });

    it("should pass an empty array of arguments to the function if the argument creator is missing", () => {
        const callEffect = toCallEffect(serviceFn);

        callEffect(fakeAction);

        expect(call).toHaveBeenCalledTimes(1);
        expect(call).toHaveBeenCalledWith(serviceFn);
    });
});
