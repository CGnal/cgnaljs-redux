import { asHttpSuccess } from "../index";

describe("asHttpSuccess", () => {
    it("should build a fake HTTP success result containing a response having as body the given value", () => {
        expect(asHttpSuccess(99)).toStrictEqual({
            success: { body: 99 }
        });
    });

    it("shoud accept extra properties and add them to the built response", () => {
        const extras = { headers: { "Content-Type": "application/json" }, status: 200 };
        const body = { foo: "bar", baz: true };

        expect(asHttpSuccess(body, extras)).toStrictEqual({
            success: {
                body,
                ...extras
            }
        });
    });
});
