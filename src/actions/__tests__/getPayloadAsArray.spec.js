import { getPayloadAsArray } from "../index";

describe("getPayloadAsArray", () => {
    it("should return an action's payload wrapped in an array", () => {
        const payload = {};

        expect(getPayloadAsArray({ payload, type: "FOO_TYPE" })).toStrictEqual([payload]);
    });
});
