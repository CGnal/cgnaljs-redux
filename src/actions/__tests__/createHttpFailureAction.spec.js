import { createHttpFailureAction } from "../index";

describe("createHttpFailureAction", () => {
    it("should build an action creator that uses its second argument to set the `originalAction` key of its metadata", () => {
        const fakeMeta = { b: 2 };
        const fakePayload = { a: 1 };
        const errorAction = {
            meta: { originalAction: fakeMeta },
            payload: fakePayload,
            type: "SOME_TYPE"
        };
        const creator = createHttpFailureAction(errorAction.type);

        expect(creator(fakePayload, fakeMeta)).toStrictEqual(errorAction);
    });
});
