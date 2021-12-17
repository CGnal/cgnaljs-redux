import * as _ from "lamb";

/**
 * Utility function to handle a common case of change
 * in the store when a HTTP requests completes successfully.
 * Resets loading path to `false` and sets a data path with
 * the HTTP result, optionally using a transformer function.<br/>
 * Path strings are paths supplied to Lamb's {@link https://ascartabelli.github.io/lamb/module-lamb.html#setPathIn|setPathIn},
 * implying that a dot is used as a separator (e.g. `"view.isLoading"`).
 * @example
 * const state = {
 *     data: [],
 *     error: null,
 *     isLoading: true
 * };
 * const action = {
 *     error: true,
 *     payload: new Error("some error"),
 *     meta: {
 *         originalAction: { type: "DATA_GET" }
 *     },
 *     type: "DATA_GET_KO"
 * };
 * const handler = handleHttpFailure(); // using default values
 *
 * handler(state, action) // =>
 * // {
 * //     data: [],
 * //     error: {
 * //         message: "Error during the HTTP request.",
 * //         originalAction: { type: "DATA_GET" },
 * //         originalError: Error, // the above action's payload
 * //         title: "HTTP Error"
 * //     },
 * //     isLoading: false
 * // }
 *
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.20
 * @function
 * @param {String} [title="HTTP Error"] User friendly title.
 * @param {String} [message="Error during the HTTP request."] User friendly message.
 * @param {String} [errorPath="error"]
 * @param {String} [isLoadingPath="isLoading"]
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const handleHttpFailure = (
    title = "HTTP Error",
    message = "Error during the HTTP request.",
    errorPath = "error",
    isLoadingPath = "isLoading"
) => (state, { payload: originalError, meta }) => {
    const newState = errorPath ? _.setPathIn(state, errorPath, {
        message,
        originalAction: meta.originalAction,
        originalError,
        title
    }) : state;

    return isLoadingPath ? _.setPathIn(newState, isLoadingPath, false) : newState;
};

export default handleHttpFailure;
