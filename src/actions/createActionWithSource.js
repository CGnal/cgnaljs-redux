import * as _ from "lamb";
import { createAction } from "redux-actions";

import { putInKey } from "@cgnal/utils/object";

/**
 * Builds an action creator that accepts an {@link Action}
 * as the second optional parameter that will be
 * put in the `sourceAction` property of the metadata.
 * @memberof module:@cgnal/redux/actions
 * @since 0.0.19
 * @function
 * @param {String} type
 * @returns {Function}  The action creator: <code>(*, {@link Action}?) => {@link Action}</code>
 */
const createActionWithSource = type => createAction(
    type,
    _.identity,
    _.compose(
        _.unless(_.isUndefined, putInKey("sourceAction")),
        _.getArgAt(1)
    )
);

export default createActionWithSource;
