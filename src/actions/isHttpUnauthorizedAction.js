import * as _ from "lamb";

/**
 * Checks if the received action contains
 * an unauthorized HTTP error (401)
 * @example
 * const fake401Error = { status: 401 };
 * const fake500Error = { status: 500 };
 * const action1 = {
 *     error: true,
 *     payload: fake401Error,
 *     type: "API_CALL_KO"
 * };
 * const action2 = {
 *     payload: fake401Error,
 *     type: "API_CALL_KO"
 * };
 * const action3 = {
 *     error: true,
 *     payload: fake500Error,
 *     type: "API_CALL_KO"
 * };
 *
 * isHttpUnauthorizedAction(action1) // => true
 * isHttpUnauthorizedAction(action2) // => false
 * isHttpUnauthorizedAction(action3) // => false
 *
 * @memberof module:@cgnal/redux/actions
 * @since 0.0.19
 * @function
 * @param {Action} action
 * @returns {Boolean}
 */
const isHttpUnauthorizedAction = _.allOf([
    _.hasKeyValue("error", true),
    _.hasPathValue("payload.status", 401)
]);

export default isHttpUnauthorizedAction;
