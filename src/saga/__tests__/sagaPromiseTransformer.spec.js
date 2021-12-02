import { CANCEL } from "redux-saga";

import { sagaPromiseTransformer } from "../index";

describe("sagaPromiseTransformer", () => {
    let requestOK;
    let requestKO;

    beforeEach(() => {
        requestOK = {
            abort: jest.fn(),
            then: jest.fn((resolve, reject) => Promise.resolve("OK").then(resolve, reject))
        };

        requestKO = {
            abort: jest.fn(),
            then: jest.fn((resolve, reject) => Promise.reject("KO").then(resolve, reject))
        };
    });

    afterEach(() => {
        requestOK.abort.mockRestore();
        requestOK.then.mockRestore();
        requestKO.abort.mockRestore();
        requestKO.then.mockRestore();
    });

    it("should transform a request into a Promise that resolves with `{ success: value }`", () => {
        const reqPromise = sagaPromiseTransformer(requestOK);

        expect.assertions(3);
        expect(requestOK.then).toHaveBeenCalledTimes(1);
        expect(requestOK.then.mock.calls[0].length).toBe(2);

        return reqPromise.then(v => expect(v).toStrictEqual({ success: "OK" }));
    });

    it("should transform a request into a Promise that rejects with `{ error: value }`", () => {
        const reqPromise = sagaPromiseTransformer(requestKO);

        expect.assertions(3);
        expect(requestKO.then).toHaveBeenCalledTimes(1);
        expect(requestKO.then.mock.calls[0].length).toBe(2);

        return reqPromise.then(v => expect(v).toStrictEqual({ error: "KO" }));
    });

    it("should make the promises cancellable by redux-saga and abort the underlying request", () => {
        const reqPromiseOK = sagaPromiseTransformer(requestOK);
        const reqPromiseKO = sagaPromiseTransformer(requestKO);

        expect(reqPromiseOK[CANCEL]).toBeInstanceOf(Function);
        reqPromiseOK[CANCEL]();
        expect(requestOK.abort).toHaveBeenCalledTimes(1);

        expect(reqPromiseKO[CANCEL]).toBeInstanceOf(Function);
        reqPromiseKO[CANCEL]();
        expect(requestKO.abort).toHaveBeenCalledTimes(1);
    });
});
