/**
 * Test helper to quickly build a fake response object.
 * @memberof module:@cgnal/redux/test-helpers
 * @since 0.0.18
 * @function
 * @param {*} body
 * @param {Object} [extras={}]
 * @returns {Object}
 */
const asResponse = (body, extras = {}) => ({ body, ...extras });

export default asResponse;
