import { putInKey } from "@cgnal/utils/object";

/**
 * Test helper to build a failure result.
 * Any value passed to the function will be put in
 * the "error" property of an object.
 * @example
 * asResultKO({ status: 500 }) // => { error: { status: 500 } }
 *
 * @memberof module:@cgnal/redux/test-helpers
 * @since 0.0.18
 * @function
 * @param {Any} value
 * @returns {Object}
 */
const asResultKO = putInKey("error");

export default asResultKO;
