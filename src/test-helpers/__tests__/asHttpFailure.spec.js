import { asHttpFailure } from "../index";

describe("asHttpFailure", () => {
    it("should build an error with the received string and wrap it in a fake HTTP failure result", () => {
        const failure = asHttpFailure("some message");

        expect(failure).toStrictEqual({
            error: expect.any(Error)
        });
        expect(failure.error.message).toBe("some message");
    });

    it("should accept extra properties and add them to the resulting error", () => {
        const extras = { status: 401, foo: "bar", baz: true };
        const failure = asHttpFailure("some message", extras);

        expect(failure.error).toBeInstanceOf(Error);
        expect(failure).toStrictEqual({
            error: expect.objectContaining({
                message: "some message",
                ...extras
            })
        });
    });
});
