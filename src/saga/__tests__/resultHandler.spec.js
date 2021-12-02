jest.mock("redux-saga/effects");

import { all, put } from "redux-saga/effects";

import { resultHandler } from "../index";

describe("resultHandler", () => {
    const startAction = { payload: {}, type: "START_ACTION" };
    const failureCreators = [
        jest.fn(() => "failure-0"),
        jest.fn(() => "failure-1")
    ];
    const successCreators = [
        jest.fn(() => "success-0"),
        jest.fn(() => "success-1"),
        jest.fn(() => "success-2")
    ];

    beforeEach(() => {
        put.mockImplementation(s => `put-${s}`);
        failureCreators.forEach(creator => creator.mockClear());
        successCreators.forEach(creator => creator.mockClear());
    });

    afterEach(() => {
        all.mockRestore();
        put.mockRestore();
    });

    afterAll(() => {
        jest.unmock("redux-saga/effects");
    });

    it("should build a generator that will yield all put effects from `successCreators` if the call effect is successful", () => {
        const fakeCallEffect = action => ({ success: action.payload });
        const handleResult = resultHandler(fakeCallEffect, successCreators, failureCreators);
        const generator = handleResult(startAction);

        let yielded = {};

        while (!yielded.done) {
            yielded = generator.next(yielded.value);
        }

        expect(put).toHaveBeenCalledTimes(successCreators.length);

        failureCreators.forEach(creator => {
            expect(creator).toHaveBeenCalledTimes(0);
        });

        successCreators.forEach(creator => {
            expect(creator).toHaveBeenCalledTimes(1);
            expect(creator).toHaveBeenCalledWith(startAction.payload, startAction);
        });

        put.mock.calls.forEach((putCall, idx) => {
            expect(putCall).toEqual([`success-${idx}`]);
        });

        expect(all).toHaveBeenCalledTimes(1);
        expect(all).toHaveBeenCalledWith(["put-success-0", "put-success-1", "put-success-2"]);
    });

    it("should build a generator that will yield all put effects from `failureCreators` if the call effect is not successful", () => {
        const fakeError = new Error("some error message");
        const fakeCallEffect = () => ({ error: fakeError });
        const handleResult = resultHandler(fakeCallEffect, successCreators, failureCreators);
        const generator = handleResult(startAction);

        let yielded = {};

        while (!yielded.done) {
            yielded = generator.next(yielded.value);
        }

        expect(put).toHaveBeenCalledTimes(failureCreators.length);

        successCreators.forEach(creator => {
            expect(creator).toHaveBeenCalledTimes(0);
        });

        failureCreators.forEach(creator => {
            expect(creator).toHaveBeenCalledTimes(1);
            expect(creator).toHaveBeenCalledWith(fakeError, startAction);
        });

        put.mock.calls.forEach((putCall, idx) => {
            expect(putCall).toEqual([`failure-${idx}`]);
        });

        expect(all).toHaveBeenCalledTimes(1);
        expect(all).toHaveBeenCalledWith(["put-failure-0", "put-failure-1"]);
    });
});
