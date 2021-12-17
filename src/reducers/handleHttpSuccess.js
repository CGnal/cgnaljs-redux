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
 *     payload: [1, 2, 3],
 *     type: "DATA_GET_OK"
 * };
 * const handler = handleHttpSuccess();  // using default values
 *
 * handler(state, action) // =>
 * // {
 * //     data: [1, 2, 3],
 * //     error: null,
 * //     isLoading: false
 * // }
 *
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.20
 * @function
 * @param {String} [dataPath="data"]
 * @param {String} [isLoadingPath="isLoading"]
 * @param {Function} [transformer=v => v] <code>(v:Any, prevValue:Any) => newValue:Any</code>
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const handleHttpSuccess = (
    dataPath = "data",
    isLoadingPath = "isLoading",
    transformer = _.identity
) => (state, { payload }) => {
    const newState = dataPath ? _.setPathIn(
        state,
        dataPath,
        transformer(payload, _.getPathIn(state, dataPath))
    ) : state;

    return isLoadingPath ? _.setPathIn(newState, isLoadingPath, false) : newState;
};

export default handleHttpSuccess;
