import * as _ from "lamb";

import combine from "./combine";

const safeSetPath = _.condition(
    _.compose(_.is(""), _.getArgAt(0)),
    _.always(_.identity),
    _.setPath
);

/**
 * Utility function to handle a common case of change
 * in the store when a HTTP requests starts.
 * Resets an error path and set a loading path to `true`.<br/>
 * Path strings are paths supplied to Lamb's {@link https://ascartabelli.github.io/lamb/module-lamb.html#setPathIn|setPathIn},
 * implying that a dot is used as a separator (e.g. `"view.isLoading"`).
 * @example
 * const state = {
 *     data: [],
 *     error: {
 *         message: "Error during the HTTP request.",
 *         originalAction: { type: "DATA_GET" },
 *         originalError: new Error("some message")
 *         title: "HTTP Error"
 *     },
 *     isLoading: false
 * };
 * const action = { type: "DATA_GET" };
 * const handler = handleHttpStart(); // using default values
 *
 * // handler(state, action) // =>
 * // {
 * //     data: [],
 * //     error: null,
 * //     isLoading: true
 * // }
 *
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.20
 * @function
 * @param {String} [errorPath="error"]
 * @param {String} [isLoadingPath="isLoading"]
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const handleHttpStart = (errorPath = "error", isLoadingPath = "isLoading") => combine([
    safeSetPath(errorPath, null),
    safeSetPath(isLoadingPath, true)
]);

export default handleHttpStart;
