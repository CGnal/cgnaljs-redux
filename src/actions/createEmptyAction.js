import { createAction } from "redux-actions";

import { nullary } from "@cgnal/utils/function";

/**
 * Builds an action creator to make a [flux standard action]{@link https://github.com/acdlite/flux-standard-action}
 * without any payload or metadata.
 * @memberof module:@cgnal/redux/actions
 * @since 0.0.12
 * @function
 * @param {String} type The action type
 * @returns {Function} The action creator: <code>() => {@link Action}</code>
 */
const createEmptyAction = type => nullary(createAction(type));

export default createEmptyAction;
