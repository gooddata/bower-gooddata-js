/* Copyright (C) 2007-2015, GoodData(R) Corporation. All rights reserved. */
/* gooddata - v0.1.22 */
/* 2016-03-18 12:10:56 */
/* Latest git commit: "ee6d6d4" */


(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["gooddata"] = factory(require("jquery"));
	else
		root["gooddata"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _xhr = __webpack_require__(1);

	var xhr = _interopRequireWildcard(_xhr);

	var _user = __webpack_require__(37);

	var user = _interopRequireWildcard(_user);

	var _metadata = __webpack_require__(38);

	var md = _interopRequireWildcard(_metadata);

	var _execution = __webpack_require__(44);

	var execution = _interopRequireWildcard(_execution);

	var _project = __webpack_require__(45);

	var project = _interopRequireWildcard(_project);

	var _config = __webpack_require__(3);

	var config = _interopRequireWildcard(_config);

	/**
	 * # JS SDK
	 * Here is a set of functions that mostly are a thin wraper over the [GoodData API](https://developer.gooddata.com/api).
	 * Before calling any of those functions, you need to authenticate with a valid GoodData
	 * user credentials. After that, every subsequent call in the current session is authenticated.
	 * You can find more about the GD authentication mechanism here.
	 *
	 * ## Conventions and Dependencies
	 * * Depends on [jQuery JavaScript library](http://jquery.com/) javascript library
	 * * Each SDK function returns [jQuery Deferred promise](http://api.jquery.com/deferred.promise/)
	 *
	 * ## GD Authentication Mechansim
	 * In this JS SDK library we provide you with a simple `login(username, passwd)` function
	 * that does the magic for you.
	 * To fully understand the authentication mechansim, please read
	 * [Authentication via API article](http://developer.gooddata.com/article/authentication-via-api)
	 * on [GoodData Developer Portal](http://developer.gooddata.com/)
	 *
	 * @module sdk
	 * @class sdk
	 */
	exports['default'] = { config: config, xhr: xhr, user: user, md: md, execution: execution, project: project };
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2013, GoodData(R) Corporation. All rights reserved.
	/*eslint no-use-before-define: [2, "nofunc"]*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.ajaxSetup = ajaxSetup;
	exports.ajax = ajax;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _config = __webpack_require__(3);

	var config = _interopRequireWildcard(_config);

	var _lodashLangIsPlainObject = __webpack_require__(4);

	var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

	var _lodashLangIsFunction = __webpack_require__(20);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var _lodashLangIsArray = __webpack_require__(17);

	var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

	var _lodashObjectMerge = __webpack_require__(22);

	var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);

	/**
	 * Ajax wrapper around GDC authentication mechanisms, SST and TT token handling and polling.
	 * Inteface is same as original jQuery.ajax.

	 * If token is expired, current request is "paused", token is refreshed and request is retried and result.
	 * is transparently returned to original call.

	 * Additionally polling is handled. Only final result of polling returned.
	 * @module xhr
	 * @class xhr
	 */
	var tokenRequest = undefined;
	var xhrSettings = undefined; // TODO rename xhrSettings - "defaultXhrSettings?"

	function enrichSettingWithCustomDomain(settings, domain) {
	    if (domain) {
	        // protect url to be prepended with domain on retry
	        if (settings.url.indexOf(domain) === -1) {
	            settings.url = domain + settings.url;
	        }
	        settings.xhrFields = settings.xhrFields || {};
	        settings.xhrFields.withCredentials = true;
	    }

	    return settings;
	}

	function retryAjaxRequest(req, deferred) {
	    // still use our extended ajax, because is still possible to fail recoverably in again
	    // e.g. request -> 401 -> token renewal -> retry request -> 202 (polling) -> retry again after delay
	    /*eslint-disable block-scoped-var*/ // we don't want to declare all functions inside ajax's fn scope
	    ajax(req).done(function ajaxDone(data, textStatus, xhrObj) {
	        deferred.resolve(data, textStatus, xhrObj);
	    }).fail(function ajaxFail(xhrObj, textStatus, err) {
	        deferred.reject(xhrObj, textStatus, err);
	    });
	    /*eslint-enable block-scoped-var*/
	}

	function continueAfterTokenRequest(req, deferred) {
	    tokenRequest.done(function tokenRequestDone() {
	        retryAjaxRequest(req, deferred);
	    }).fail(function tokenRequestFail(xhrObj, textStatus, err) {
	        if (xhrObj.status !== 401) {
	            deferred.reject(xhrObj, textStatus, err);
	        }
	    });
	}

	function handleUnauthorized(req, deferred) {
	    if (!tokenRequest) {
	        // Create only single token request for any number of waiting request.
	        // If token request exist, just listen for it's end.
	        tokenRequest = _jquery2['default'].ajax(enrichSettingWithCustomDomain({ url: '/gdc/account/token/' }, config.domain)).always(function alwayCb() {
	            tokenRequest = null;
	        }).fail(function failTokenRequest(xhrObj, textStatus, err) {
	            // unauthorized when retrieving token -> not logged
	            if (xhrObj.status === 401 && (0, _lodashLangIsFunction2['default'])(req.unauthorized)) {
	                req.unauthorized(xhrObj, textStatus, err, deferred);
	                return;
	            }
	            // unauthorized handler is not defined or not http 401
	            deferred.reject(xhrObj, textStatus, err);
	        });
	    }
	    continueAfterTokenRequest(req, deferred);
	}

	function handlePolling(req, deferred) {
	    setTimeout(function poller() {
	        retryAjaxRequest(req, deferred);
	    }, req.pollDelay);
	}

	// helper to coverts traditional ajax callbacks to deferred
	function reattachCallbackOnDeferred(settings, property, defferAttach) {
	    var callback = settings[property];
	    delete settings[property];
	    if ((0, _lodashLangIsFunction2['default'])(callback)) {
	        defferAttach(callback);
	    }
	    if ((0, _lodashLangIsArray2['default'])(callback)) {
	        callback.forEach(function loopCallbacks(fn) {
	            if ((0, _lodashLangIsFunction2['default'])(callback)) {
	                defferAttach(fn);
	            }
	        });
	    }
	}

	/**
	 * additional ajax configuration specific for xhr module, keys
	 *   unauthorized: function(xhr) - called when user is unathorized and token renewal failed
	 *   pollDelay: int - polling interval in milisecodns, default 1000

	 * method also accepts any option from original $.ajaxSetup. Options will be applied to all call of xhr.ajax().

	 * xhrSetup behave similar tp $.ajaxSetup, each call replaces settings completely.
	 * Options can be also passed to particular xhr.ajax calls (same as optios for $.ajax and $.ajaxSetup)
	 * @method ajaxSetup
	 */

	function ajaxSetup(settings) {
	    xhrSettings = (0, _lodashObjectMerge2['default'])({
	        contentType: 'application/json',
	        dataType: 'json',
	        pollDelay: 1000,
	        headers: {
	            'Accept': 'application/json; charset=utf-8'
	        }
	    }, settings);
	}

	/**
	 * Same api as jQuery.ajax - arguments (url, settings) or (settings) with url inside
	 * Additionally content type is automatically json, and object in settings.data is converted to string
	 * to be consumed by GDC backend.

	 * settings additionally accepts keys: unathorized, pollDelay  (see xhrSetup for more details)
	 * @method ajax
	 * @param url request url
	 * @param settings settings object
	 */

	function ajax(url, settings) {
	    var finalSettings = undefined;
	    var finalUrl = undefined;
	    if ((0, _lodashLangIsPlainObject2['default'])(url)) {
	        finalSettings = url;
	        finalUrl = undefined;
	    } else {
	        finalUrl = url;
	        finalSettings = settings;
	    }
	    // copy settings to not modify passed object
	    // settings can be undefined, doesn't matter, $.extend handle it
	    finalSettings = (0, _lodashObjectMerge2['default'])({}, xhrSettings, finalSettings);
	    if (finalUrl) {
	        finalSettings.url = finalUrl;
	    }

	    if ((0, _lodashLangIsPlainObject2['default'])(finalSettings.data)) {
	        finalSettings.data = JSON.stringify(finalSettings.data);
	    }

	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/
	    reattachCallbackOnDeferred(finalSettings, 'success', d.done);
	    reattachCallbackOnDeferred(finalSettings, 'error', d.fail);
	    reattachCallbackOnDeferred(finalSettings, 'complete', d.always);

	    if (tokenRequest) {
	        continueAfterTokenRequest(finalSettings, d);
	        return d;
	    }

	    _jquery2['default'].ajax(enrichSettingWithCustomDomain(finalSettings, config.domain)).fail(function jqAjaxFail(xhrObj, textStatus, err) {
	        if (xhrObj.status === 401) {
	            handleUnauthorized(finalSettings, d);
	        } else {
	            d.reject(xhrObj, textStatus, err);
	        }
	    }).done(function jqAjaxDone(data, textStatus, xhrObj) {
	        if (xhrObj.status === 202 && !finalSettings.dontPollOnResult) {
	            // if the response is 202 and Location header is not empty, let's poll on the new Location
	            var _location = xhrObj.getResponseHeader('Location');
	            if (_location) {
	                finalSettings.url = _location;
	            }
	            finalSettings.method = 'GET';
	            delete finalSettings.data;
	            handlePolling(finalSettings, d);
	        } else {
	            d.resolve(data, textStatus, xhrObj);
	        }
	    });
	    return d;
	}

	function xhrMethod(method) {
	    return function methodFn(url, settings) {
	        var opts = (0, _lodashObjectMerge2['default'])({ method: method }, settings);

	        return ajax(url, opts);
	    };
	}

	/**
	 * Wrapper for xhr.ajax method GET
	 * @method get
	 */
	var get = xhrMethod('GET');

	exports.get = get;
	/**
	 * Wrapper for xhr.ajax method POST
	 * @method post
	 */
	var post = xhrMethod('POST');

	exports.post = post;
	/**
	 * Wrapper for xhr.ajax method PUT
	 * @method put
	 */
	var put = xhrMethod('PUT');

	exports.put = put;
	// setup default settings
	ajaxSetup({});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	/**
	 * Config module holds SDK configuration variables
	 *
	 * Currently its only custom domain - which enabled using
	 * sdk from different domain (using CORS)
	 *
	 * Never set properties directly - always use setter methods
	 *
	 * @module config
	 * @class config
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.setCustomDomain = setCustomDomain;
	var URL_REGEXP = '(?:(https)://+|(www\\.)?)\\w[:;,\\.?\\[\\]\\w/~%&=+#-@!]*';

	var domain = undefined;

	exports.domain = domain;
	/**
	 * Sets custom domain. Parameter is url which has always to be https://
	 * (if you don't provide it, we will do it for you).
	 *
	 * RegExp inspired taken from
	 * https://github.com/jarib/google-closure-library/blob/master/closure/goog/string/linkify.js
	 *
	 * @method setCustomDomain
	 */

	function setCustomDomain(d) {
	  var sanitizedDomain = d || '';
	  var link = sanitizedDomain.match(URL_REGEXP);

	  if (!link) {
	    throw new Error(d + ' is not a valid url');
	  }

	  // ensure https:// prefix
	  // and strip possible trailing /
	  exports.domain = domain = 'https://' + link[0].replace(/^https:\/\//, '').replace(/\/$/, '');
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(5),
	    isArguments = __webpack_require__(11),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(6),
	    keysIn = __webpack_require__(10);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(7);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(8);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(17),
	    isIndex = __webpack_require__(21),
	    isLength = __webpack_require__(15),
	    isObject = __webpack_require__(9);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(12),
	    isObjectLike = __webpack_require__(16);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(13),
	    isLength = __webpack_require__(15);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(14);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(18),
	    isLength = __webpack_require__(15),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(19);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(20),
	    isObjectLike = __webpack_require__(16);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(23),
	    createAssigner = __webpack_require__(32);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(24),
	    baseMergeDeep = __webpack_require__(25),
	    isArray = __webpack_require__(17),
	    isArrayLike = __webpack_require__(12),
	    isObject = __webpack_require__(9),
	    isObjectLike = __webpack_require__(16),
	    isTypedArray = __webpack_require__(27),
	    keys = __webpack_require__(30);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(26),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(17),
	    isArrayLike = __webpack_require__(12),
	    isPlainObject = __webpack_require__(4),
	    isTypedArray = __webpack_require__(27),
	    toPlainObject = __webpack_require__(28);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(15),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(29),
	    keysIn = __webpack_require__(10);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(18),
	    isArrayLike = __webpack_require__(12),
	    isObject = __webpack_require__(9),
	    shimKeys = __webpack_require__(31);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(17),
	    isIndex = __webpack_require__(21),
	    isLength = __webpack_require__(15),
	    keysIn = __webpack_require__(10);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(33),
	    isIterateeCall = __webpack_require__(35),
	    restParam = __webpack_require__(36);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(34);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(12),
	    isIndex = __webpack_require__(21),
	    isObject = __webpack_require__(9);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.isLoggedIn = isLoggedIn;
	exports.login = login;
	exports.logout = logout;
	exports.getAccountInfo = getAccountInfo;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _xhr = __webpack_require__(1);

	/**
	 * @module user
	 * @class user
	 */

	/**
	 * Find out whether a user is logged in
	 *
	 * Returns a promise which either:
	 * **resolves** - which means user is logged in or
	 * **rejects** - meaning is not logged in
	 * @method isLoggedIn
	 */

	function isLoggedIn() {
	    return _jquery2['default'].getJSON('/gdc/account/token');
	}

	/**
	 * This function provides an authentication entry point to the GD API. It is needed to authenticate
	 * by calling this function prior any other API calls. After providing valid credentials
	 * every subsequent API call in a current session will be authenticated.
	 *
	 * @method login
	 * @param {String} username
	 * @param {String} password
	 */

	function login(username, password) {
	    return (0, _xhr.post)('/gdc/account/login', {
	        data: JSON.stringify({
	            postUserLogin: {
	                login: username,
	                password: password,
	                remember: 1,
	                captcha: '',
	                verifyCaptcha: ''
	            }
	        })
	    });
	}

	/**
	 * Logs out current user
	 * @method logout
	 */

	function logout() {
	    /* eslint new-cap: 0 */
	    var d = _jquery2['default'].Deferred();

	    isLoggedIn().then(function resolve() {
	        return (0, _xhr.get)('/gdc/app/account/bootstrap').then(function resolveGet(result) {
	            var userUri = result.bootstrapResource.accountSetting.links.self;
	            var userId = userUri.match(/([^\/]+)\/?$/)[1];

	            return userId;
	        }, d.reject);
	    }, d.resolve).then(function resolveAll(userId) {
	        return (0, _xhr.ajax)('/gdc/account/login/' + userId, {
	            method: 'delete'
	        });
	    }).then(d.resolve, d.reject);

	    return d.promise();
	}

	/**
	 * Returns info about currently logged in user from bootstrap resource
	 * @method getAccountInfo
	 */

	function getAccountInfo() {
	    /* eslint new-cap: 0 */
	    var d = _jquery2['default'].Deferred();

	    (0, _xhr.get)('/gdc/app/account/bootstrap').then(function resolveBootstrap(result) {
	        var br = result.bootstrapResource;
	        var accountInfo = {
	            login: br.accountSetting.login,
	            loginMD5: br.current.loginMD5,
	            firstName: br.accountSetting.firstName,
	            lastName: br.accountSetting.lastName,
	            organizationName: br.settings.organizationName,
	            profileUri: br.accountSetting.links.self
	        };

	        d.resolve(accountInfo);
	    }, d.reject);

	    return d.promise();
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getElementDetails = getElementDetails;
	exports.getAttributes = getAttributes;
	exports.getDimensions = getDimensions;
	exports.getFolders = getFolders;
	exports.getFoldersWithItems = getFoldersWithItems;
	exports.getFacts = getFacts;
	exports.getMetrics = getMetrics;
	exports.getAvailableMetrics = getAvailableMetrics;
	exports.getAvailableAttributes = getAvailableAttributes;
	exports.getAvailableFacts = getAvailableFacts;
	exports.getObjectDetails = getObjectDetails;
	exports.getObjectIdentifier = getObjectIdentifier;
	exports.getObjectUri = getObjectUri;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _xhr = __webpack_require__(1);

	var _util = __webpack_require__(39);

	/**
	 * Functions for working with metadata objects
	 *
	 * @class metadata
	 * @module metadata
	 */

	/**
	 * Get additional information about elements specified by their uris
	 * `elementUris` is the array of uris of elements to be look-up
	 * Currently makes a request for each object, should be encapsulated
	 * to one call
	 *
	 * @method getElementDetails
	 * @param {Array} array of element uri strings
	 * @private
	 */

	function getElementDetails(elementUris) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    var fns = elementUris.map(function mapUrisToRequests(uri) {
	        return (0, _xhr.ajax)(uri);
	    });

	    _jquery2['default'].when.apply(this, fns).done(function requestsDone() {
	        // arguments is the array of resolved
	        var args = Array.prototype.slice.call(arguments);

	        var enriched = args.map(function mapArgumentsToObjects(element) {
	            var root = element[0];
	            if (root.attributeDisplayForm) {
	                return {
	                    type: 'attribute',
	                    uri: root.attributeDisplayForm.meta.uri,
	                    formOf: root.attributeDisplayForm.content.formOf,
	                    name: root.attributeDisplayForm.meta.title
	                };
	            } else if (root.metric) {
	                return {
	                    type: 'metric',
	                    uri: root.metric.meta.uri,
	                    name: root.metric.meta.title
	                };
	            }
	        });

	        // override titles with related attribute title
	        var ids = {};
	        var indi = [];
	        var i = 0;
	        var formOfFns = [];

	        enriched.forEach(function loopEnrichedObjects(el, idx) {
	            if (el.formOf) {
	                formOfFns.push((0, _xhr.ajax)(el.formOf));
	                ids[el.uri] = idx;
	                indi[i++] = idx;
	            }
	        });

	        // all formOf are executed
	        _jquery2['default'].when.apply(this, formOfFns).done(function formOfRequestsDone() {
	            var formOfArgs = Array.prototype.slice.call(arguments);

	            formOfArgs.forEach(function loopFormOfRequests(arg, idx) {
	                // get element to owerwrite
	                var which = indi[idx];
	                var update = enriched[which];

	                update.name = arg[0].attribute.meta.title;
	            });

	            d.resolve(enriched);
	        });
	    });

	    return d.promise();
	}

	/**
	* Reutrns all attributes in a project specified by projectId param
	*
	* @method getAttributes
	* @param projectId Project identifier
	* @return {Array} An array of attribute objects
	*/

	function getAttributes(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/attributes').then((0, _util.getIn)('query.entries'));
	}

	/**
	 * Returns all dimensions in a project specified by projectId param
	 *
	 * @method getDimensions
	 * @param projectId Project identifier
	 * @return {Array} An array of dimension objects
	 * @see getFolders
	 */

	function getDimensions(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/dimensions').then((0, _util.getIn)('query.entries'));
	}

	/**
	 * Returns project folders. Folders can be of specific types and you can specify
	 * the type you need by passing and optional `type` parameter
	 *
	 * @method getFolders
	 * @param {String} projectId - Project identifier
	 * @param {String} type - Optional, possible values are `metric`, `fact`, `attribute`
	 * @return {Array} An array of dimension objects
	 */

	function getFolders(projectId, type) {
	    function _getFolders(pId, t) {
	        var typeURL = t ? '?type=' + t : '';

	        return (0, _xhr.get)('/gdc/md/' + pId + '/query/folders' + typeURL).then((0, _util.getIn)('query.entries'));
	    }

	    switch (type) {
	        case 'fact':
	        case 'metric':
	            return _getFolders(projectId, type);
	        case 'attribute':
	            return getDimensions(projectId);
	        default:
	            /*eslint-disable new-cap*/
	            var d = _jquery2['default'].Deferred();
	            /*eslint-enable new-cap*/
	            _jquery2['default'].when(_getFolders(projectId, 'fact'), _getFolders(projectId, 'metric'), getDimensions(projectId)).done(function requestsDone(facts, metrics, attributes) {
	                d.resolve({ fact: facts, metric: metrics, attribute: attributes });
	            });
	            return d.promise();
	    }
	}

	/**
	 * Get folders with items.
	 * Returns array of folders, each having a title and items property which is an array of
	 * corresponding items. Each item is either a metric or attribute, keeping its original
	 * verbose structure.
	 *
	 * @method getFoldersWithItems
	 * @param {String} type type of folders to return
	 * @return {Array} Array of folder object, each containing title and
	 * corresponding items.
	 */
	/*eslint-disable*/

	function getFoldersWithItems(projectId, type) {
	    /*eslint-disable new-cap*/
	    var result = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    // fetch all folders of given type and process them
	    getFolders(projectId, type).then(function resolveGetForlders(folders) {
	        // Helper function to get details for each metric in the given
	        // array of links to the metadata objects representing the metrics.
	        // @return the array of promises
	        function getMetricItemsDetails(array) {
	            /*eslint-disable new-cap*/
	            var d = _jquery2['default'].Deferred();
	            /*eslint-enable new-cap*/
	            _jquery2['default'].when.apply(this, array.map(getObjectDetails)).then(function getObjectDetailsDone() {
	                var metrics = Array.prototype.slice.call(arguments).map(function mapObjectsToMetricNames(item) {
	                    return item.metric;
	                });
	                d.resolve(metrics);
	            }, d.reject);
	            return d.promise();
	        }

	        // helper mapBy function
	        function mapBy(array, key) {
	            return array.map(function mapKeyToItem(item) {
	                return item[key];
	            });
	        }

	        // helper for sorting folder tree structure
	        // sadly @returns void (sorting == mutating array in js)
	        /*eslint-disable func-names*/
	        var sortFolderTree = function sortFolderTree(structure) {
	            structure.forEach(function (folder) {
	                folder.items.sort(function (a, b) {
	                    if (a.meta.title < b.meta.title) {
	                        return -1;
	                    } else if (a.meta.title > b.meta.title) {
	                        return 1;
	                    }

	                    return 0;
	                });
	            });
	            structure.sort(function (a, b) {
	                if (a.title < b.title) {
	                    return -1;
	                } else if (a.title > b.title) {
	                    return 1;
	                }

	                return 0;
	            });
	        };
	        /*eslint-enable func-names*/

	        var foldersLinks = mapBy(folders, 'link');
	        var foldersTitles = mapBy(folders, 'title');

	        // fetch details for each folder
	        _jquery2['default'].when.apply(this, foldersLinks.map(getObjectDetails)).then(function () {
	            var folderDetails = Array.prototype.slice.call(arguments);

	            // if attribute, just parse everything from what we've received
	            // and resolve. For metrics, lookup again each metric to get its
	            // identifier. If passing unsupported type, reject immediately.
	            if (type === 'attribute') {
	                // get all attributes, subtract what we have and add rest in unsorted folder
	                getAttributes(projectId).then(function (attributes) {
	                    // get uris of attributes which are in some dimension folders
	                    var attributesInFolders = [];
	                    folderDetails.forEach(function (fd) {
	                        fd.dimension.content.attributes.forEach(function (attr) {
	                            attributesInFolders.push(attr.meta.uri);
	                        });
	                    });
	                    // unsortedUris now contains uris of all attributes which aren't in a folder
	                    var unsortedUris = attributes.filter(function (item) {
	                        return attributesInFolders.indexOf(item.link) === -1;
	                    }).map(function (item) {
	                        return item.link;
	                    });
	                    // now get details of attributes in no folders
	                    _jquery2['default'].when.apply(this, unsortedUris.map(getObjectDetails)).then(function () {
	                        // get unsorted attribute objects
	                        var unsortedAttributes = Array.prototype.slice.call(arguments).map(function (attr) {
	                            return attr.attribute;
	                        });
	                        // create structure of folders with attributes
	                        var structure = folderDetails.map(function (folderDetail) {
	                            return {
	                                title: folderDetail.dimension.meta.title,
	                                items: folderDetail.dimension.content.attributes
	                            };
	                        });
	                        // and append "Unsorted" folder with attributes to the structure
	                        structure.push({
	                            title: "Unsorted",
	                            items: unsortedAttributes
	                        });
	                        sortFolderTree(structure);
	                        result.resolve(structure);
	                    });
	                });
	            } else if (type === 'metric') {
	                var entriesLinks = folderDetails.map(function (entry) {
	                    return mapBy(entry.folder.content.entries, 'link');
	                });
	                // get all metrics, subtract what we have and add rest in unsorted folder
	                getMetrics(projectId).then(function (metrics) {
	                    // get uris of metrics which are in some dimension folders
	                    var metricsInFolders = [];
	                    folderDetails.forEach(function (fd) {
	                        fd.folder.content.entries.forEach(function (metric) {
	                            metricsInFolders.push(metric.link);
	                        });
	                    });
	                    // unsortedUris now contains uris of all metrics which aren't in a folder
	                    var unsortedUris = metrics.filter(function (item) {
	                        return metricsInFolders.indexOf(item.link) === -1;
	                    }).map(function (item) {
	                        return item.link;
	                    });

	                    // sadly order of parameters of concat matters! (we want unsorted last)
	                    entriesLinks.push(unsortedUris);

	                    // now get details of all metrics
	                    _jquery2['default'].when.apply(this, entriesLinks.map(function (linkArray, idx) {
	                        return getMetricItemsDetails(linkArray);
	                    })).then(function () {
	                        // all promises resolved, i.e. details for each metric are available
	                        var tree = Array.prototype.slice.call(arguments);
	                        var structure = tree.map(function (treeItems, idx) {
	                            // if idx is not in foldes list than metric is in "Unsorted" folder
	                            return {
	                                title: foldersTitles[idx] || "Unsorted",
	                                items: treeItems
	                            };
	                        });
	                        sortFolderTree(structure);
	                        result.resolve(structure);
	                    }, result.reject);
	                });
	            } else {
	                result.reject();
	            }
	        });
	    }, result.reject);

	    return result.promise();
	}

	/*eslint-enable*/

	/**
	 * Returns all facts in a project specified by the given projectId
	 *
	 * @method getFacts
	 * @param projectId Project identifier
	 * @return {Array} An array of fact objects
	 */

	function getFacts(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/facts').then((0, _util.getIn)('query.entries'));
	}

	/**
	 * Returns all metrics in a project specified by the given projectId
	 *
	 * @method getMetrics
	 * @param projectId Project identifier
	 * @return {Array} An array of metric objects
	 */

	function getMetrics(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/metrics').then((0, _util.getIn)('query.entries'));
	}

	/**
	 * Returns all metrics that are reachable (with respect to ldm of the project
	 * specified by the given projectId) for given attributes
	 *
	 * @method getAvailableMetrics
	 * @param {String} projectId - Project identifier
	 * @param {Array} attrs - An array of attribute uris for which we want to get
	 * availabale metrics
	 * @return {Array} An array of reachable metrics for the given attrs
	 * @see getAvailableAttributes
	 * @see getAvailableFacts
	 */

	function getAvailableMetrics(projectId, attrs) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    (0, _xhr.post)('/gdc/md/' + projectId + '/availablemetrics', {
	        data: JSON.stringify(attrs)
	    }).then(function resolveAvailableMetrics(result) {
	        d.resolve(result.entries);
	    }, d.reject);

	    return d.promise();
	}

	/**
	 * Returns all attributes that are reachable (with respect to ldm of the project
	 * specified by the given projectId) for given metrics (also called as drillCrossPath)
	 *
	 * @method getAvailableAttributes
	 * @param {String} projectId - Project identifier
	 * @param {Array} metrics - An array of metric uris for which we want to get
	 * availabale attributes
	 * @return {Array} An array of reachable attributes for the given metrics
	 * @see getAvailableMetrics
	 * @see getAvailableFacts
	 */

	function getAvailableAttributes(projectId, metrics) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    (0, _xhr.post)('/gdc/md/' + projectId + '/drillcrosspaths', {
	        data: JSON.stringify(metrics)
	    }).then(function resolveAvailableAttributes(result) {
	        d.resolve(result.drillcrosspath.links);
	    }, d.reject);

	    return d.promise();
	}

	/**
	 * Returns all attributes that are reachable (with respect to ldm of the project
	 * specified by the given projectId) for given metrics (also called as drillCrossPath)
	 *
	 * @method getAvailableFacts
	 * @param {String} projectId - Project identifier
	 * @param {Array} items - An array of metric or attribute uris for which we want to get
	 * availabale facts
	 * @return {Array} An array of reachable facts for the given items
	 * @see getAvailableAttributes
	 * @see getAvailableMetrics
	 */

	function getAvailableFacts(projectId, items) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    (0, _xhr.post)('/gdc/md/' + projectId + '/availablefacts', {
	        data: JSON.stringify(items)
	    }).then(function resolveAvailableFacts(result) {
	        d.resolve(result.entries);
	    }, d.reject);

	    return d.promise();
	}

	/**
	 * Get details of a metadata object specified by its uri
	 *
	 * @method getObjectDetails
	 * @param uri uri of the metadata object for which details are to be retrieved
	 * @return {Object} object details
	 */

	function getObjectDetails(uri) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    (0, _xhr.get)(uri, {
	        headers: { Accept: 'application/json' },
	        dataType: 'json',
	        contentType: 'application/json'
	    }).then(function resolveGetObject(res) {
	        d.resolve(res);
	    }, d.reject);

	    return d.promise();
	}

	/**
	 * Get identifier of a metadata object identified by its uri
	 *
	 * @method getObjectIdentifier
	 * @param uri uri of the metadata object for which the identifier is to be retrieved
	 * @return {String} object identifier
	 */

	function getObjectIdentifier(uri) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/
	    function idFinder(obj) {
	        if (obj.attribute) {
	            return obj.attribute.content.displayForms[0].meta.identifier;
	        } else if (obj.dimension) {
	            return obj.dimension.content.attributes.content.displayForms[0].meta.identifier;
	        } else if (obj.metric) {
	            return obj.metric.meta.identifier;
	        }

	        throw Error('Unknown object!');
	    }

	    if (!_jquery2['default'].isPlainObject(uri)) {
	        getObjectDetails(uri).then(function resolveGetObjectDetails(data) {
	            d.resolve(idFinder(data));
	        }, d.reject);
	    } else {
	        d.resolve(idFinder(uri));
	    }

	    return d.promise();
	}

	/**
	 * Get uri of an metadata object, specified by its identifier and project id it belongs to
	 *
	 * @method getObjectUri
	 * @param projectId id of the project
	 * @param identifier identifier of the metadata object
	 * @return {String} uri of the metadata object
	 */

	function getObjectUri(projectId, identifier) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/
	    function uriFinder(obj) {
	        var data = obj.attribute ? obj.attribute : obj.metric;
	        return data.meta.uri;
	    }

	    (0, _xhr.ajax)('/gdc/md/' + projectId + '/identifiers', {
	        type: 'POST',
	        headers: { Accept: 'application/json' },
	        data: {
	            identifierToUri: [identifier]
	        }
	    }).then(function resolveIdentifiers(data) {
	        var found = data.identifiers.filter(function findObjectByIdentifier(i) {
	            return i.identifier === identifier;
	        });

	        if (found[0]) {
	            return getObjectDetails(found[0].uri);
	        }

	        /*eslint-disable new-cap*/
	        return _jquery2['default'].Deferred().reject('identifier not found');
	        /*eslint-enable new-cap*/
	    }, d.reject).then(function resolveObjectDetails(objData) {
	        if (!objData.attributeDisplayForm) {
	            return d.resolve(uriFinder(objData));
	        }
	        return getObjectDetails(objData.attributeDisplayForm.content.formOf).then(function resolve(objectData) {
	            d.resolve(uriFinder(objectData));
	        }, d.reject);
	    }, d.reject);

	    return d.promise();
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectGet = __webpack_require__(40);

	var _lodashObjectGet2 = _interopRequireDefault(_lodashObjectGet);

	/**
	 * Utility methods. Mostly private
	 *
	 * @module util
	 * @class util
	 *
	 */

	/**
	 * Create getter function for accessing nested objects
	 *
	 * @param {String} path Target path to nested object
	 * @method getIn
	 * @private
	 */
	var getIn = function getIn(path) {
	  return function (object) {
	    return (0, _lodashObjectGet2['default'])(object, path);
	  };
	};
	exports.getIn = getIn;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(41),
	    toPath = __webpack_require__(42);

	/**
	 * Gets the property value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, toPath(path), (path + ''));
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(8);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(43),
	    isArray = __webpack_require__(17);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getData = getData;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _xhr = __webpack_require__(1);

	/**
	 * Module for execution on experimental execution resource
	 *
	 * @class execution
	 * @module execution
	 */

	/**
	 * For the given projectId it returns table structure with the given
	 * elements in column headers.
	 *
	 * @method getData
	 * @param {String} projectId - GD project identifier
	 * @param {Array} elements - An array of attribute or metric identifiers.
	 * @param {Object} executionConfiguration - Execution configuration - can contain for example
	 *                 property "filters" containing execution context filters
	 *                 property "where" containing query-like filters
	 *                 property "orderBy" contains array of sorted properties to order in form
	 *                      [{column: 'identifier', direction: 'asc|desc'}]
	 *
	 * @return {Object} Structure with `headers` and `rawData` keys filled with values from execution.
	 */

	function getData(projectId, elements, executionConfiguration) {
	    // Create request and result structures
	    var request = {
	        execution: {
	            columns: elements
	        }
	    };
	    var executedReport = {
	        isLoaded: false
	    };

	    // enrich configuration with supported properties such as
	    // where clause with query-like filters or execution context filters
	    var config = executionConfiguration || {};
	    ['filters', 'where', 'orderBy', 'definitions'].forEach(function assignProperties(property) {
	        if (config[property]) {
	            request.execution[property] = config[property];
	        }
	    });
	    // create empty promise-like Ember.Object
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    // Execute request
	    (0, _xhr.post)('/gdc/internal/projects/' + projectId + '/experimental/executions', {
	        data: JSON.stringify(request)
	    }, d.reject).then(function resolveSimpleExecution(result) {
	        // TODO: when executionResult.headers will be globaly available columns map code should be removed
	        if (result.executionResult.headers) {
	            executedReport.headers = result.executionResult.headers;
	        } else {
	            // Populate result's header section if is not available
	            executedReport.headers = result.executionResult.columns.map(function mapColsToHeaders(col) {
	                if (col.attributeDisplayForm) {
	                    return {
	                        type: 'attrLabel',
	                        id: col.attributeDisplayForm.meta.identifier,
	                        uri: col.attributeDisplayForm.meta.uri,
	                        title: col.attributeDisplayForm.meta.title
	                    };
	                }
	                return {
	                    type: 'metric',
	                    id: col.metric.meta.identifier,
	                    uri: col.metric.meta.uri,
	                    title: col.metric.meta.title,
	                    format: col.metric.content.format
	                };
	            });
	        }
	        // Start polling on url returned in the executionResult for tabularData
	        return (0, _xhr.ajax)(result.executionResult.tabularDataResult);
	    }, d.reject).then(function resolveDataResultPolling(result, message, response) {
	        // After the retrieving computed tabularData, resolve the promise
	        executedReport.rawData = result && result.tabularDataResult ? result.tabularDataResult.values : [];
	        executedReport.isLoaded = true;
	        executedReport.isEmpty = response.status === 204;
	        d.resolve(executedReport);
	    }, d.reject);

	    return d.promise();
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.getCurrentProjectId = getCurrentProjectId;
	exports.getProjects = getProjects;
	exports.getDatasets = getDatasets;
	exports.getColorPalette = getColorPalette;
	exports.setColorPalette = setColorPalette;
	exports.getTimezone = getTimezone;
	exports.setTimezone = setTimezone;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _xhr = __webpack_require__(1);

	var _util = __webpack_require__(39);

	/**
	 * Functions for working with projects
	 *
	 * @class project
	 * @module project
	 */

	/**
	 * Get current project id
	 *
	 * @method getCurrentProjectId
	 * @return {String} current project identifier
	 */

	function getCurrentProjectId() {
	    return (0, _xhr.get)('/gdc/app/account/bootstrap').then(function resolveBootstrap(result) {
	        var currentProject = result.bootstrapResource.current.project;
	        // handle situation in which current project is missing (e.g. new user)
	        if (!currentProject) {
	            return null;
	        }

	        return result.bootstrapResource.current.project.links.self.split('/').pop();
	    });
	}

	/**
	 * Fetches projects available for the user represented by the given profileId
	 *
	 * @method getProjects
	 * @param {String} profileId - User profile identifier
	 * @return {Array} An Array of projects
	 */

	function getProjects(profileId) {
	    return (0, _xhr.get)('/gdc/account/profile/' + profileId + '/projects').then(function resolveProjects(result) {
	        return result.projects.map(function getProject(p) {
	            return p.project;
	        });
	    });
	}

	/**
	 * Fetches all datasets for the given project
	 *
	 * @method getDatasets
	 * @param {String} projectId - GD project identifier
	 * @return {Array} An array of objects containing datasets metadata
	 */

	function getDatasets(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/datasets').then((0, _util.getIn)('query.entries'));
	}

	var DEFAULT_PALETTE = [{ r: 0x2b, g: 0x6b, b: 0xae }, { r: 0x69, g: 0xaa, b: 0x51 }, { r: 0xee, g: 0xb1, b: 0x4c }, { r: 0xd5, g: 0x3c, b: 0x38 }, { r: 0x89, g: 0x4d, b: 0x94 }, { r: 0x73, g: 0x73, b: 0x73 }, { r: 0x44, g: 0xa9, b: 0xbe }, { r: 0x96, g: 0xbd, b: 0x5f }, { r: 0xfd, g: 0x93, b: 0x69 }, { r: 0xe1, g: 0x5d, b: 0x86 }, { r: 0x7c, g: 0x6f, b: 0xad }, { r: 0xa5, g: 0xa5, b: 0xa5 }, { r: 0x7a, g: 0xa6, b: 0xd5 }, { r: 0x82, g: 0xd0, b: 0x8d }, { r: 0xff, g: 0xd2, b: 0x89 }, { r: 0xf1, g: 0x84, b: 0x80 }, { r: 0xbf, g: 0x90, b: 0xc6 }, { r: 0xbf, g: 0xbf, b: 0xbf }];

	/**
	 * Fetches a chart color palette for a project represented by the given
	 * projectId parameter.
	 *
	 * @method getColorPalette
	 * @param {String} projectId - A project identifier
	 * @return {Array} An array of objects with r, g, b fields representing a project's
	 * color palette
	 */

	function getColorPalette(projectId) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    (0, _xhr.get)('/gdc/projects/' + projectId + '/styleSettings').then(function resolveStyleSetting(result) {
	        d.resolve(result.styleSettings.chartPalette.map(function mapColorToObject(c) {
	            return {
	                r: c.fill.r,
	                g: c.fill.g,
	                b: c.fill.b
	            };
	        }));
	    }, function rejectStyleSetting(err) {
	        if (err.status === 200) {
	            d.resolve(DEFAULT_PALETTE);
	        }
	        d.reject(err);
	    });

	    return d.promise();
	}

	/**
	 * Sets given colors as a color palette for a given project.
	 *
	 * @method setColorPalette
	 * @param {String} projectId - GD project identifier
	 * @param {Array} colors - An array of colors that we want to use within the project.
	 * Each color should be an object with r, g, b fields.
	 */

	function setColorPalette(projectId, colors) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/

	    (0, _xhr.put)('/gdc/projects/' + projectId + '/styleSettings', {
	        data: {
	            styleSettings: {
	                chartPalette: colors.map(function mapColorToObject(c, idx) {
	                    return {
	                        guid: 'guid' + idx,
	                        fill: c
	                    };
	                })
	            }
	        }
	    }).then(d.resolve, d.reject);

	    return d.promise();
	}

	/**
	 * Gets current timezone and its offset. Example output:
	 *
	 *     {
	 *         id: 'Europe/Prague',
	 *         displayName: 'Central European Time',
	 *         currentOffsetMs: 3600000
	 *     }
	 *
	 * @method getTimezone
	 * @param {String} projectId - GD project identifier
	 */

	function getTimezone(projectId) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/
	    var bootstrapUrl = '/gdc/app/account/bootstrap?projectId=' + projectId;

	    (0, _xhr.get)(bootstrapUrl).then(function resolveGetTimezone(result) {
	        var timezone = result.bootstrapResource.current.timezone;
	        d.resolve(timezone);
	    }, d.reject);

	    return d.promise();
	}

	function setTimezone(projectId, timezone) {
	    /*eslint-disable new-cap*/
	    var d = _jquery2['default'].Deferred();
	    /*eslint-enable new-cap*/
	    var timezoneServiceUrl = '/gdc/md/' + projectId + '/service/timezone';
	    var data = {
	        service: { timezone: timezone }
	    };

	    (0, _xhr.ajax)(timezoneServiceUrl, {
	        type: 'POST',
	        headers: { Accept: 'application/json' },
	        data: data
	    }).then(d.resolve, d.reject);

	    return d.promise();
	}

/***/ }
/******/ ])
});
;