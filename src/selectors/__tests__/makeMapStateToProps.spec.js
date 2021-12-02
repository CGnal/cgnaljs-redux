import * as _ from "lamb";

import { makeMapStateToProps } from "../index";

import { fakeStore } from "./test-data";

describe("makeMapStateToProps", () => {
    const getInUsers = subpath => _.getPath(`users.${subpath}`);
    const getActiveUsers = getInUsers("active");
    const getInactiveUsers = getInUsers("inactive");

    it("should use the received property / selectors map to retrieve values for a React component", () => {
        const mapStateToProps = makeMapStateToProps({
            activeUsers: getActiveUsers,
            inactiveUsers: getInactiveUsers
        });

        expect(mapStateToProps(fakeStore)).toStrictEqual({
            activeUsers: fakeStore.users.active,
            inactiveUsers: fakeStore.users.inactive
        });
    });
});
