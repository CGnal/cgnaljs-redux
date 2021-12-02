import { asResultKO } from "../index";

describe("asResultKO", () => {
    it("should wrap the received value in a fake result representing a failure", () => {
        expect(asResultKO("foo")).toStrictEqual({ error: "foo" });
    });
});
