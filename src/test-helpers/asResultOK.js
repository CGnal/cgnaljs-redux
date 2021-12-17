import { putInKey } from "@cgnal/utils/object";

/**
 * Test helper to build a success result.
 * Any value passed to the function will be put in
 * the "success" property of an object.
 * @example
 * asResultOK([1, 2, 3]) // => { success: [1, 2, 3] }
 *
 * @memberof module:@cgnal/redux/test-helpers
 * @since 0.0.18
 * @function
 * @param {Any} value
 * @returns {Object}
 */
const asResultOK = putInKey("success");

export default asResultOK;
