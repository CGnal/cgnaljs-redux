import * as _ from "lamb";
import { createAction } from "redux-actions";

/**
 * Builds an action creator to make [flux standard actions]{@link https://github.com/acdlite/flux-standard-action}
 * representing HTTP successes.<br/>
 * The action creator expects a successful HTTP Response and will put its body in the action payload.<br/>
 * The metadata will be an object with the complete Response in the <code>response</code> property,
 * and the original action in the <code>originalAction</code> one.
 * @example
 * const originalAction = { type: "ORIGINAL_ACTION" };
 * const response = {
 *     body: [1, 2, 3],
 *     status: 200
 * };
 * const createSuccessAction = createHttpSuccessAction("API_CALL_OK");
 *
 * createSuccessAction(response, originalAction) // =>
 * // {
 * //     meta: {
 * //         originalAction: { type: "ORIGINAL_ACTION" },
 * //         response: {
 * //             body: [1, 2, 3],
 * //             status: 200
 * //         }
 * //     },
 * //     payload: [1, 2, 3],
 * //     type: "API_CALL_OK"
 * // }
 *
 * @memberof module:@cgnal/redux/actions
 * @since 0.0.7
 * @function
 * @param {String} type The action type
 * @returns {Function} The action creator: <code>(Response, {@link Action}?) => {@link Action}</code>
 */
const createHttpSuccessAction = type => createAction(
    type,
    _.getKey("body"),
    (response, originalAction) => ({ originalAction, response })
);

export default createHttpSuccessAction;
