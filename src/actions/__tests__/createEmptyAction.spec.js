import { createEmptyAction } from "../index";

describe("createEmptyAction", () => {
    it("should return an action creator that creates an action without any payload or metadata", () => {
        const expected = { type: "SOME_TYPE" };
        const actionCreator = createEmptyAction(expected.type, "baz", "qux");

        expect(actionCreator("foo", "bar")).toStrictEqual(expected);
    });
});
