import { CANCEL } from "redux-saga";

import { putInKey } from "@cgnal/utils/object";

/**
 * A transformer function meant to be used in the options of services' helpers like
 * {@link https://cgnal.github.io/cgnaljs-net/module-@cgnal_net_http.HttpTransport.html|HttpTransport}.<br/>
 * In the case above, the function will transform the HTTP request in a redux-saga cancellable
 * Promise which is able to abort the request and will resolve to
 * <code>{ result: Response }</code> and reject to <code>{ error: Error }</code>.
 * @memberof module:@cgnal/redux/saga
 * @since 0.0.1
 * @function
 * @param {Request} request
 * @returns {Promise}
 */
const sagaPromiseTransformer = request => {
    const requestPromise = request.then(putInKey("success"), putInKey("error"));

    requestPromise[CANCEL] = function () { // eslint-disable-line jsdoc/require-jsdoc
        request.abort();
    };

    return requestPromise;
};

export default sagaPromiseTransformer;
