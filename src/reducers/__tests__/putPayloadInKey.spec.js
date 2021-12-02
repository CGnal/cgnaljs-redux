import { putPayloadInKey } from "../index";

import { fakeAction, fakeStore } from "./test-data";

describe("putPayloadInKey", () => {
    it("should build a function that will put the action payload in the given key", () => {
        const newStoreA = putPayloadInKey("nonExistent")(fakeStore, fakeAction);
        const newStoreB = putPayloadInKey("users")(fakeStore, fakeAction);

        expect(newStoreA.nonExistent).toBe(fakeAction.payload);
        expect(newStoreB.users).toBe(fakeAction.payload);
    });
});
