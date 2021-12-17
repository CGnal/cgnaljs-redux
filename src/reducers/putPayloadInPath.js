import * as _ from "lamb";

/**
 * Builds a function that will put a [flux standard action]{@link https://github.com/acdlite/flux-standard-action}
 * payload in the given path of the redux state.<br/>
 * Path strings are paths supplied to Lamb's {@link https://ascartabelli.github.io/lamb/module-lamb.html#setPathIn|setPathIn}.
 * @example
 * const state = {
 *     view: {
 *         data: []
 *     }
 * };
 * const action = { payload: [1, 2, 3], type: "SET_DATA" };
 * const handler = putPayloadInPath("view.data");
 *
 * handler(state, action) // => { view: { data: [1, 2, 3] } }
 *
 * @memberof module:@cgnal/redux/reducers
 * @since 0.0.6
 * @function
 * @param {String} path
 * @param {String} [separator="."]
 * @returns {Function} <code>(state:{@link Object}, action:{@link Action}) => newState:{@link Object}</code>
 */
const putPayloadInPath = (path, separator = ".") =>
    (state, action) => _.setPathIn(state, path, action.payload, separator);

export default putPayloadInPath;
