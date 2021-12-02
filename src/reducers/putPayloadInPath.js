import * as _ from "lamb";

/**
 * Builds a function that will put a [flux standard action]{@link https://github.com/acdlite/flux-standard-action}
 * payload in the given path of the redux state.
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
