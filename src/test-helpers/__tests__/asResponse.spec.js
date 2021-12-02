import { asResponse } from "../index";

describe("asResponse", () => {
    it("should wrap the received value in a fake HTTP response object", () => {
        expect(asResponse(2)).toStrictEqual({ body: 2 });
    });

    it("shoud accept extra properties and add them to the built response", () => {
        const extras = { headers: { "Content-Type": "application/json" }, status: 200 };
        const body = { foo: "bar", baz: true };

        expect(asResponse(body, extras)).toStrictEqual({
            body,
            ...extras
        });
    });
});
