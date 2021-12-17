/**
 * Test helper to quickly build a fake response object.
 * @memberof module:@cgnal/redux/test-helpers
 * @example
 * const extras = {
 *     headers: { "Content-Type": "application/json" },
 *     status: 200
 * };
 * const body = [1, 2, 3];
 *
 * asResponse(body, extras) // =>
 * // {
 * //     "Content-Type": "application/json"
 * //     "body": [1, 2, 3],
 * //     "status": 200
 * // }
 *
 * @since 0.0.18
 * @function
 * @param {Any} body
 * @param {Object} [extras={}]
 * @returns {Object}
 */
const asResponse = (body, extras = {}) => ({ body, ...extras });

export default asResponse;
