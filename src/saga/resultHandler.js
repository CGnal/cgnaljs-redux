import * as _ from "lamb";
import { all, put } from "redux-saga/effects";

/**
 * @private
 * @function
 * @param {Object} result
 * @param {*} [result.success]
 * @param {Error} [result.error]
 * @param {Function[]} successCreators
 * @param {Function[]} failureCreators
 * @returns {Array<Function[], Error>|Array<Function[], Object>}
 */
const getResult = ({ success, error }, successCreators, failureCreators) => [
    _.isUndefined(success) ? failureCreators : successCreators,
    error || success
];

/**
 * @private
 * @function
 * @param {*} result
 * @param {Action} action
 * @returns {Function} <code>actionCreator:{@link Function} => putEffect:{@link Object}</code>
 */
const toPutEffect = (result, action) => actionCreator => put(actionCreator(result, action));

/**
 * Builds a generator function that will perform the given call effect maker and will yield
 * all the put effects created from <code>successCreators</code> if the call effect
 * is successful or from <code>failureCreators</code> otherwise.
 * @memberof module:@cgnal/redux/saga
 * @since 0.0.12
 * @see {@link module:@cgnal/redux/saga.toCallEffect|toCallEffect}
 * @param {Function} makeCallEffect <code>{@link Action} => callEffect:{@link Object}</code>
 * @param {Function[]} successCreators
 * @param {Function[]} failureCreators
 * @returns {GeneratorFunction} <code>{@link Action} => {@link Generator}</code>
 */
function resultHandler (makeCallEffect, successCreators, failureCreators) {
    return function* handleResult (action) {
        const [creators, result] = getResult(yield makeCallEffect(action), successCreators, failureCreators);
        const effects = _.map(creators, toPutEffect(result, action));

        yield all(effects);
    };
}

export default resultHandler;
