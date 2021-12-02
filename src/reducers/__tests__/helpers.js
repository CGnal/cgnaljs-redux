import * as _ from "lamb";

/**
 * Makes an object immutable by recursively calling <code>Object.freeze</code>
 * on its members.
 * @private
 * @param {Object} obj
 * @param {Array} seen
 * @returns {Object} The obj parameter itself, not a copy.
 */
function _immutable (obj, seen) {
    if (seen.indexOf(obj) === -1) {
        seen.push(Object.freeze(obj));

        _.forEach(Object.getOwnPropertyNames(obj), key => {
            const value = obj[key];

            if (typeof value === "object" && !_.isNull(value)) {
                _immutable(value, seen);
            }
        });
    }

    return obj;
}

/**
 * Makes an object immutable by recursively calling [Object.freeze]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}
 * on its members.<br/>
 * Any attempt to extend or modify the object can throw a <code>TypeError</code> or fail silently,
 * depending on the environment and the [strict mode]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode} directive.
 * @example
 * const user = _.immutable({
 *     name: "John",
 *     surname: "Doe",
 *     login: {
 *         username: "jdoe",
 *         password: "abc123"
 *     },
 *     luckyNumbers: [13, 17]
 * });
 *
 * // All of these statements will fail and possibly
 * // throw a TypeError (see the function description)
 * user.name = "Joe";
 * delete user.name;
 * user.newProperty = [];
 * user.login.password = "foo";
 * user.luckyNumbers.push(-13);
 *
 * @param {Object} obj
 * @returns {Object}
 */
export function immutable (obj) {
    return _immutable(obj, []);
}
