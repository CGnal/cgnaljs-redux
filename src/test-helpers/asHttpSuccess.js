import * as _ from "lamb";

import asResponse from "./asResponse";
import asResultOK from "./asResultOK";

/**
 * Test helper to build a HTTP success result.
 * The function will return an object with a single
 * "success" property containing the received body property
 * and augmented with the optional "extras" properties.
 * @memberof module:@cgnal/redux/test-helpers
 * @since 0.0.18
 * @function
 * @param {*} body
 * @param {Object} [extras={}]
 * @returns {Object}
 */
const asHttpSuccess = _.compose(asResultOK, asResponse);

export default asHttpSuccess;
