import * as _ from "lamb";

import asResultKO from "./asResultKO";

/**
 * Test helper to build a HTTP failure result.
 * The function will return an object with a single
 * "error" property containing an Error with the given
 * message and augmented with the optional "extras" properties.
 * @example
 * const extras = { status: 401 };
 *
 * asHttpFailure("some error message", extras) // =>
 * // {
 * //     error: Error {
 * //         // ...
 * //         message: "some error message",
 * //         status: 401
 * //     }
 * // }
 *
 * @memberof module:@cgnal/redux/test-helpers
 * @since 0.0.18
 * @function
 * @param {String} message
 * @param {Object} [extras={}]
 * @returns {Object}
 */
const asHttpFailure = _.compose(asResultKO, (message, extras = {}) => {
    const error = new Error(message);

    for (const prop in extras) {
        error[prop] = extras[prop];
    }

    return error;
});

export default asHttpFailure;
