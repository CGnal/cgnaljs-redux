import { createHttpSuccessAction } from "../index";

describe("createHttpSuccessAction", () => {
    it("should build an action creator to create an action containing the response body as payload and the full response in the metadata", () => {
        const fakeResponse = {
            body: { a: 1 },
            status: 200
        };
        const fakeOriginalAction = {};
        const successAction = {
            meta: { originalAction: fakeOriginalAction, response: fakeResponse },
            payload: fakeResponse.body,
            type: "SOME_SUCCESS_TYPE"
        };

        const creator = createHttpSuccessAction(successAction.type);

        expect(creator(fakeResponse, fakeOriginalAction)).toStrictEqual(successAction);
    });
});
