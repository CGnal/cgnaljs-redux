import { putInKey } from "@cgnal/utils/object";

/**
 * Test helper to build a success result.
 * Any value passed to the function will be put in
 * the "success" property of an object.
 * @memberof module:@cgnal/redux/test-helpers
 * @since 0.0.18
 * @function
 * @param {*} value
 * @returns {Object}
 */
const asResultOK = putInKey("success");

export default asResultOK;
