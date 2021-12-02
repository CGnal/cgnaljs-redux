import { createActionWithSource } from "../index";

describe("createActionWithSource", () => {
    it("should build an action optionally accepting a `sourceAction` in its meta data", () => {
        const payload = {};
        const sourceAction = { type: "FOO_SOURCE_ACTION" };

        expect(createActionWithSource("FOO_TYPE")(payload)).toStrictEqual({
            meta: void 0,
            payload,
            type: "FOO_TYPE"
        });
        expect(createActionWithSource("FOO_TYPE")(payload, sourceAction)).toStrictEqual({
            meta: { sourceAction },
            payload,
            type: "FOO_TYPE"
        });
        expect(createActionWithSource("FOO_TYPE")(void 0, sourceAction)).toStrictEqual({
            meta: { sourceAction },
            type: "FOO_TYPE"
        });
    });
});
