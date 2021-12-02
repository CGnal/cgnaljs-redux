import { asResultOK } from "../index";

describe("asResultOK", () => {
    it("should wrap the received value in a fake result representing a success", () => {
        expect(asResultOK("foo")).toStrictEqual({ success: "foo" });
    });
});
