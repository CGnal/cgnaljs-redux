import * as _ from "lamb";

/**
 * Accepts a list of function meant to act on the same portion
 * of a state, and combines them to produce a new state.
 * @example
 * const state = {
 *     counter: 0,
 *     values: [1, 2]
 * };
 * const incrementCounter = state => ({ ...state, counter: state.counter + 1 });
 * const addValue = (state, action) => ({ ...state, values: state.values.concat(action.payload) });
 * const action = { payload: 3, type: "ADD_VALUE" };
 * const combinedUpdate = combine([incrementCounter, addValue]);
 *
 * combinedUpdate(state, action) // => { counter: 1, values: [1, 2, 3] }
 *
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
