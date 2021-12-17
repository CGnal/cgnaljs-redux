/**
 * Returns the payload of the received Action wrapped
 * in a one element array.
 * @example
 * const action = {
 *     payload: { value: 1 },
 *     type: "SOME_TYPE"
 * };
 *
 * getPayloadAsArray(action) => // [{ value : 1 }]
 *
 * @memberof module:@cgnal/redux/actions
 * @since 0.0.19
 * @param {Action} action
 * @returns {Array} A one element array containing the payload.
 */
const getPayloadAsArray = ({ payload }) => [payload];

export default getPayloadAsArray;
