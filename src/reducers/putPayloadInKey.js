import * as _ from "lamb";

/**
 * Builds a function that will put a [flux standard action]{@link https://github.com/acdlite/flux-standard-action}
 * payload in the given key of the redux state.
 * @example
 * const state = {
 *     data: []
 * };
 * const action = { payload: [1, 2, 3], type: "SET_DATA" };
 * const handler = putPayloadInKey("data");
 *
 * handler(state, action) // => { data: [1, 2, 3] }
 *
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.6
 * @function
 * @param {String} key
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const putPayloadInKey = key => (state, action) => _.setIn(state, key, action.payload);

export default putPayloadInKey;
