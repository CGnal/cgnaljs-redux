import * as _ from "lamb";
import { createAction } from "redux-actions";

import { putInKey } from "@cgnal/utils/object";

/**
 * Builds an action creator to make [flux standard actions]{@link https://github.com/acdlite/flux-standard-action}
 * representing HTTP failures.<br/>
 * The action creator expects an <code>Error</code> as first parameter, that
 * will be the action payload, and the action that led to the HTTP failure as the
 * second parameter.<br/>
 * The resulting action will have an additional <code>meta</code> property, which
 * will be an object with a single key <code>originalAction</code>.
 * @memberof module:@cgnal/redux/actions
 * @since 0.0.1
 * @function
 * @param {String} type The action type
 * @returns {Function} The action creator:
 * <code>(payload: Error, originalAction: {@link Action}) => {@link Action}</code>
 */
const createHttpFailureAction = type => createAction(
    type,
    _.identity,
    _.compose(putInKey("originalAction"), _.getArgAt(1))
);

export default createHttpFailureAction;
