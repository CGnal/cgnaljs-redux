import * as _ from "lamb";

/**
 * Helper to build the [<code>mapStateToProps</code>]{@link https://react-redux.js.org/using-react-redux/connect-mapstate}
 * function for <code>react-redux</code> bindings.<br/>
 * The <code>propsMap</code> parameter is an object having as keys
 * the property names of a React component, and as values selectors accessing
 * the relevant portions of the redux store.
 * @memberof module:@cgnal/redux/selectors
 * @since 0.0.2
 * @function
 * @param {Object} propsMap
 * @returns {Function} (state: {@link Object}) => {@link Object}
 */
const makeMapStateToProps = propsMap => state => _.mapValues(propsMap, _.applyTo([state]));

export default makeMapStateToProps;
