import * as _ from "lamb";

/**
 * Builds a function that will put a [flux standard action]{@link https://github.com/acdlite/flux-standard-action}
 * payload in the given key of the redux state.
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.6
 * @function
 * @param {String} key
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const putPayloadInKey = key => (state, action) => _.setIn(state, key, action.payload);

export default putPayloadInKey;
