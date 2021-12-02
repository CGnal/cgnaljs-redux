import * as _ from "lamb";

/**
 * Accepts a list of function meant to act on the same portion
 * of a state, and combines them to produce a new state.
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.20
 * @function
 * @param {Function[]} functions
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const combine = functions => (state, action) => _.reduce(
    functions,
    (newState, fn) => fn(newState, action),
    state
);

export default combine;
