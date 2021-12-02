import { call } from "redux-saga/effects";

/**
 * Helper to build a [redux-saga call effect]{@link https://redux-saga.js.org/docs/api/#callcontext-fn-args}.<br/>
 * Expects the function to call, and a second function, that will receive the involved action as argument,
 * that should return the array of parameters for the first one.
 * @memberof module:@cgnal/redux/saga
 * @since 0.0.12
 * @function
 * @param {Function} fn
 * @param {Function} [getArgsFromAction=() => []]
 * @returns {Function} <code>{@link Action} => callEffect:{@link Object}</code>
 */
const toCallEffect = (fn, getArgsFromAction = () => []) => action => call(fn, ...getArgsFromAction(action));

export default toCallEffect;
