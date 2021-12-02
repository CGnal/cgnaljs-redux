import * as _ from "lamb";

/**
 * Checks if the received action contains
 * an unauthorized HTTP error (401)
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
