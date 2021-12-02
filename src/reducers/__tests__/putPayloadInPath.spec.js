import { putPayloadInPath } from "../index";

import { fakeAction, fakeStore } from "./test-data";

describe("putPayloadInPath", () => {
    it("should build a function that will put the action payload in the given path, using the dot as default separator", () => {
        const newStoreA = putPayloadInPath("users.nonExistent")(fakeStore, fakeAction);
        const newStoreB = putPayloadInPath("users.active")(fakeStore, fakeAction);
        const newStoreC = putPayloadInPath("users.inactive.-1")(fakeStore, fakeAction);
        const newStoreD = putPayloadInPath("users.inactive.1")(fakeStore, fakeAction);

        expect(newStoreA.users.nonExistent).toBe(fakeAction.payload);
        expect(newStoreB.users.active).toBe(fakeAction.payload);
        expect(newStoreC.users.inactive[1]).toBe(fakeAction.payload);
        expect(newStoreD.users.inactive[1]).toBe(fakeAction.payload);
    });

    it("should accept a custom separator", () => {
        const newStore = putPayloadInPath("users.old/0/metadata", "/")(fakeStore, fakeAction);

        expect(newStore["users.old"][0].metadata).toBe(fakeAction.payload);
    });
});
