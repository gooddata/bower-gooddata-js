/* Copyright (C) 2007-2015, GoodData(R) Corporation. All rights reserved. */
/* gooddata - v0.1.27 */
/* 2016-04-06 14:49:53 */
/* Latest git commit: "ab0f2ed" */


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

	var _project = __webpack_require__(120);

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

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports.getData = getData;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _xhr = __webpack_require__(1);

	var _md5 = __webpack_require__(45);

	var _md52 = _interopRequireDefault(_md5);

	var _lodashCollectionFilter = __webpack_require__(49);

	var _lodashCollectionFilter2 = _interopRequireDefault(_lodashCollectionFilter);

	var _lodashCollectionMap = __webpack_require__(73);

	var _lodashCollectionMap2 = _interopRequireDefault(_lodashCollectionMap);

	var _lodashCollectionEvery = __webpack_require__(76);

	var _lodashCollectionEvery2 = _interopRequireDefault(_lodashCollectionEvery);

	var _lodashObjectGet = __webpack_require__(40);

	var _lodashObjectGet2 = _interopRequireDefault(_lodashObjectGet);

	var _lodashLangIsEmpty = __webpack_require__(79);

	var _lodashLangIsEmpty2 = _interopRequireDefault(_lodashLangIsEmpty);

	var _lodashFunctionNegate = __webpack_require__(81);

	var _lodashFunctionNegate2 = _interopRequireDefault(_lodashFunctionNegate);

	var _lodashArrayLast = __webpack_require__(66);

	var _lodashArrayLast2 = _interopRequireDefault(_lodashArrayLast);

	var _lodashObjectAssign = __webpack_require__(82);

	var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

	var _lodashCollectionFind = __webpack_require__(85);

	var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

	var _lodashFunctionPartial = __webpack_require__(89);

	var _lodashFunctionPartial2 = _interopRequireDefault(_lodashFunctionPartial);

	var _lodashCollectionPluck = __webpack_require__(116);

	var _lodashCollectionPluck2 = _interopRequireDefault(_lodashCollectionPluck);

	var _lodashUtilityIdentity = __webpack_require__(34);

	var _lodashUtilityIdentity2 = _interopRequireDefault(_lodashUtilityIdentity);

	var _lodashArrayFlatten = __webpack_require__(117);

	var _lodashArrayFlatten2 = _interopRequireDefault(_lodashArrayFlatten);

	var notEmpty = (0, _lodashFunctionNegate2['default'])(_lodashLangIsEmpty2['default']);
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

	function getData(projectId, elements) {
	    var executionConfiguration = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var executedReport = {
	        isLoaded: false
	    };

	    // Create request and result structures
	    var request = {
	        execution: {
	            columns: elements
	        }
	    };
	    // enrich configuration with supported properties such as
	    // where clause with query-like filters or execution context filters
	    ['filters', 'where', 'orderBy', 'definitions'].forEach(function (property) {
	        if (executionConfiguration[property]) {
	            request.execution[property] = executionConfiguration[property];
	        }
	    });

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

	var getFilterExpression = function getFilterExpression(listAttributeFilter) {
	    var attributeUri = (0, _lodashObjectGet2['default'])(listAttributeFilter, 'listAttributeFilter.attribute');
	    var elements = (0, _lodashObjectGet2['default'])(listAttributeFilter, 'listAttributeFilter.default.attributeElements', []);
	    if ((0, _lodashLangIsEmpty2['default'])(elements)) {
	        return null;
	    }
	    var elementsForQuery = (0, _lodashCollectionMap2['default'])(elements, function (e) {
	        return '[' + e + ']';
	    });
	    var negative = (0, _lodashObjectGet2['default'])(listAttributeFilter, 'listAttributeFilter.default.negativeSelection') ? 'NOT ' : '';

	    return '[' + attributeUri + '] ' + negative + 'IN (' + elementsForQuery.join(',') + ')';
	};

	var getGeneratedMetricExpression = function getGeneratedMetricExpression(item) {
	    var aggregation = (0, _lodashObjectGet2['default'])(item, 'aggregation', '').toUpperCase();
	    var objectUri = (0, _lodashObjectGet2['default'])(item, 'objectUri');
	    var where = (0, _lodashCollectionFilter2['default'])((0, _lodashCollectionMap2['default'])((0, _lodashObjectGet2['default'])(item, 'metricAttributeFilters'), getFilterExpression), function (e) {
	        return !!e;
	    });

	    return 'SELECT ' + (aggregation ? aggregation + '([' + objectUri + '])' : '[' + objectUri + ']') + (notEmpty(where) ? ' WHERE ' + where.join(' AND ') : '');
	};

	var getPercentMetricExpression = function getPercentMetricExpression(attribute, metricId) {
	    var attributeUri = (0, _lodashObjectGet2['default'])(attribute, 'attribute');

	    return 'SELECT (SELECT ' + metricId + ') / (SELECT ' + metricId + ' BY ALL [' + attributeUri + '])';
	};

	var getGeneratedMetricHash = function getGeneratedMetricHash(title, format, expression) {
	    return (0, _md52['default'])(expression + '#' + title + '#' + format);
	};

	var getGeneratedMetricIdentifier = function getGeneratedMetricIdentifier(item, useBasicAggregation, expressionCreator, hasher) {
	    if (useBasicAggregation === undefined) useBasicAggregation = true;

	    var aggregation = (0, _lodashObjectGet2['default'])(item, 'aggregation', 'base').toLowerCase();
	    if ((0, _lodashObjectGet2['default'])(item, 'showInPercent') && !useBasicAggregation) {
	        aggregation = 'percent';
	    }

	    var _get$split = (0, _lodashObjectGet2['default'])(item, 'objectUri').split('/');

	    var _get$split2 = _slicedToArray(_get$split, 6);

	    var prjId = _get$split2[3];
	    var id = _get$split2[5];

	    var identifier = prjId + '_' + id;
	    var hash = hasher(expressionCreator(item));
	    var hasNoFilters = (0, _lodashLangIsEmpty2['default'])((0, _lodashObjectGet2['default'])(item, 'metricAttributeFilters', []));
	    var allFiltersEmpty = (0, _lodashCollectionEvery2['default'])((0, _lodashCollectionMap2['default'])((0, _lodashObjectGet2['default'])(item, 'metricAttributeFilters', []), function (f) {
	        return (0, _lodashLangIsEmpty2['default'])((0, _lodashObjectGet2['default'])(f, 'listAttributeFilter.default.attributeElements', []));
	    }));
	    var type = (0, _lodashObjectGet2['default'])(item, 'type');

	    var prefix = hasNoFilters || allFiltersEmpty ? '' : 'filtered_';

	    return type + '_' + identifier + '.generated.' + prefix + aggregation + '.' + hash;
	};

	var generatedMetricDefinition = function generatedMetricDefinition(item) {
	    var hasher = (0, _lodashFunctionPartial2['default'])(getGeneratedMetricHash, (0, _lodashObjectGet2['default'])(item, 'title'), (0, _lodashObjectGet2['default'])(item, 'format'));
	    var element = getGeneratedMetricIdentifier(item, true, getGeneratedMetricExpression, hasher);
	    var definition = {
	        metricDefinition: {
	            identifier: getGeneratedMetricIdentifier(item, true, getGeneratedMetricExpression, hasher),
	            expression: getGeneratedMetricExpression(item),
	            title: (0, _lodashObjectGet2['default'])(item, 'title'),
	            format: (0, _lodashObjectGet2['default'])(item, 'format')
	        }
	    };

	    return { element: element, definition: definition };
	};

	var contributionMetricDefinition = function contributionMetricDefinition(attribute, item) {
	    var type = (0, _lodashObjectGet2['default'])(item, 'type');
	    var generated = undefined;
	    var getMetricExpression = (0, _lodashFunctionPartial2['default'])(getPercentMetricExpression, attribute, '[' + (0, _lodashObjectGet2['default'])(item, 'objectUri') + ']');
	    if (type === 'fact' || type === 'attribute') {
	        generated = generatedMetricDefinition(item);
	        getMetricExpression = (0, _lodashFunctionPartial2['default'])(getPercentMetricExpression, attribute, '{' + (0, _lodashObjectGet2['default'])(generated, 'definition.metricDefinition.identifier') + '}');
	    }
	    var title = ('% ' + (0, _lodashObjectGet2['default'])(item, 'title')).replace(/^(% )+/, '% ');
	    var format = '#,##0.00%';
	    var hasher = (0, _lodashFunctionPartial2['default'])(getGeneratedMetricHash, title, format);
	    var result = [{
	        element: getGeneratedMetricIdentifier(item, false, getMetricExpression, hasher),
	        definition: {
	            metricDefinition: {
	                identifier: getGeneratedMetricIdentifier(item, false, getMetricExpression, hasher),
	                expression: getMetricExpression(item),
	                title: title,
	                format: format
	            }
	        }
	    }];

	    if (generated) {
	        result.unshift({ definition: generated.definition });
	    }

	    return result;
	};

	var categoryToElement = function categoryToElement(c) {
	    return { element: (0, _lodashObjectGet2['default'])(c, 'displayForm') };
	};

	var attributeFilterToWhere = function attributeFilterToWhere(f) {
	    var dfUri = (0, _lodashObjectGet2['default'])(f, 'listAttributeFilter.displayForm');
	    var elements = (0, _lodashObjectGet2['default'])(f, 'listAttributeFilter.default.attributeElements', []);
	    var elementsForQuery = (0, _lodashCollectionMap2['default'])(elements, function (e) {
	        return {
	            id: (0, _lodashArrayLast2['default'])(e.split('='))
	        };
	    });
	    var negative = (0, _lodashObjectGet2['default'])(f, 'listAttributeFilter.default.negativeSelection') ? 'NOT ' : '';

	    return negative ? _defineProperty({}, dfUri, { '$not': { '$in': elementsForQuery } }) : _defineProperty({}, dfUri, { '$in': elementsForQuery });
	};

	var dateFilterToWhere = function dateFilterToWhere(f) {
	    var dimensionUri = (0, _lodashObjectGet2['default'])(f, 'dateFilterSettings.dimension');
	    var granularity = (0, _lodashObjectGet2['default'])(f, 'dateFilterSettings.granularity');
	    var between = [(0, _lodashObjectGet2['default'])(f, 'dateFilterSettings.from'), (0, _lodashObjectGet2['default'])(f, 'dateFilterSettings.to')];
	    return _defineProperty({}, dimensionUri, { '$between': between, '$granularity': granularity });
	};

	var metricToDefinition = function metricToDefinition(metric) {
	    return { element: (0, _lodashObjectGet2['default'])(metric, 'objectUri') };
	};

	var mdToExecutionConfiguration = function mdToExecutionConfiguration(mdObj) {
	    var measures = mdObj.measures;
	    var categories = mdObj.categories;
	    var filters = mdObj.filters;

	    var attributes = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(categories, function (c) {
	        return c.collection === 'attribute';
	    }), categoryToElement);
	    var contributionMetrics = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(measures, function (m) {
	        return m.showInPercent;
	    }), (0, _lodashFunctionPartial2['default'])(contributionMetricDefinition, (0, _lodashCollectionFind2['default'])(categories, function (c) {
	        return c.collection === 'attribute';
	    })));
	    var factMetrics = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(measures, function (m) {
	        return m.type === 'fact' && !m.showInPercent;
	    }), generatedMetricDefinition);
	    var metrics = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(measures, function (m) {
	        return m.type === 'metric' && !m.showInPercent;
	    }), function (metric) {
	        if ((0, _lodashLangIsEmpty2['default'])(metric.metricAttributeFilters)) {
	            return metricToDefinition(metric);
	        }

	        return generatedMetricDefinition(metric);
	    });
	    var attributeMetrics = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(measures, function (m) {
	        return m.type === 'attribute' && !m.showInPercent;
	    }), generatedMetricDefinition);
	    var attributeFilters = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(filters, function (_ref4) {
	        var listAttributeFilter = _ref4.listAttributeFilter;
	        return listAttributeFilter !== undefined;
	    }), attributeFilterToWhere);
	    var dateFilters = (0, _lodashCollectionMap2['default'])((0, _lodashCollectionFilter2['default'])(filters, function (_ref5) {
	        var dateFilterSettings = _ref5.dateFilterSettings;
	        return dateFilterSettings !== undefined;
	    }), dateFilterToWhere);

	    var allMetrics = [].concat(attributes, factMetrics, attributeMetrics, metrics, (0, _lodashArrayFlatten2['default'])(contributionMetrics));

	    var where = [].concat(attributeFilters, dateFilters).reduce(function (acc, f) {
	        return (0, _lodashObjectAssign2['default'])(acc, f);
	    }, {});

	    return { 'execution': {
	            columns: (0, _lodashCollectionFilter2['default'])((0, _lodashCollectionPluck2['default'])(allMetrics, 'element'), _lodashUtilityIdentity2['default']),
	            where: where,
	            definitions: (0, _lodashCollectionFilter2['default'])((0, _lodashCollectionPluck2['default'])(allMetrics, 'definition'), _lodashUtilityIdentity2['default'])
	        } };
	};

	exports.mdToExecutionConfiguration = mdToExecutionConfiguration;
	var getDataForVis = function getDataForVis(projectId, mdObj) {
	    var _mdToExecutionConfiguration = mdToExecutionConfiguration((0, _lodashObjectGet2['default'])(mdObj, 'buckets'));

	    var execution = _mdToExecutionConfiguration.execution;
	    var columns = execution.columns;

	    var executionConfiguration = _objectWithoutProperties(execution, ['columns']);

	    return getData(projectId, columns, executionConfiguration);
	};
	exports.getDataForVis = getDataForVis;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(46),
	      utf8 = __webpack_require__(47).utf8,
	      isBuffer = __webpack_require__(48),
	      bin = __webpack_require__(47).bin,

	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already

	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;

	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }

	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;

	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;

	    for (var i = 0; i < m.length; i += 16) {

	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;

	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }

	    return crypt.endian([a, b, c, d]);
	  };

	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;

	  module.exports = function (message, options) {
	    if(typeof message == 'undefined')
	      return;

	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };

	})();


/***/ },
/* 46 */
/***/ function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();


/***/ },
/* 47 */
/***/ function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	module.exports = charenc;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Determine if an object is Buffer
	 *
	 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * License:  MIT
	 *
	 * `npm install is-buffer`
	 */

	module.exports = function (obj) {
	  return !!(obj != null &&
	    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
	      (obj.constructor &&
	      typeof obj.constructor.isBuffer === 'function' &&
	      obj.constructor.isBuffer(obj))
	    ))
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(50),
	    baseCallback = __webpack_require__(51),
	    baseFilter = __webpack_require__(69),
	    isArray = __webpack_require__(17);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias select
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Array} Returns the new filtered array.
	 * @example
	 *
	 * _.filter([4, 5, 6], function(n) {
	 *   return n % 2 == 0;
	 * });
	 * // => [4, 6]
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	 * // => ['barney']
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.pluck(_.filter(users, 'active', false), 'user');
	 * // => ['fred']
	 *
	 * // using the `_.property` callback shorthand
	 * _.pluck(_.filter(users, 'active'), 'user');
	 * // => ['barney']
	 */
	function filter(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  predicate = baseCallback(predicate, thisArg, 3);
	  return func(collection, predicate);
	}

	module.exports = filter;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(52),
	    baseMatchesProperty = __webpack_require__(63),
	    bindCallback = __webpack_require__(33),
	    identity = __webpack_require__(34),
	    property = __webpack_require__(67);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(53),
	    getMatchData = __webpack_require__(60),
	    toObject = __webpack_require__(8);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(54),
	    toObject = __webpack_require__(8);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(55),
	    isObject = __webpack_require__(9),
	    isObjectLike = __webpack_require__(16);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(56),
	    equalByTag = __webpack_require__(58),
	    equalObjects = __webpack_require__(59),
	    isArray = __webpack_require__(17),
	    isTypedArray = __webpack_require__(27);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

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
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(57);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(30);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(61),
	    pairs = __webpack_require__(62);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(30),
	    toObject = __webpack_require__(8);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(41),
	    baseIsEqual = __webpack_require__(54),
	    baseSlice = __webpack_require__(64),
	    isArray = __webpack_require__(17),
	    isKey = __webpack_require__(65),
	    isStrictComparable = __webpack_require__(61),
	    last = __webpack_require__(66),
	    toObject = __webpack_require__(8),
	    toPath = __webpack_require__(42);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(17),
	    toObject = __webpack_require__(8);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(14),
	    basePropertyDeep = __webpack_require__(68),
	    isKey = __webpack_require__(65);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(41),
	    toPath = __webpack_require__(42);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(70);

	/**
	 * The base implementation of `_.filter` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(71),
	    createBaseEach = __webpack_require__(72);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(6),
	    keys = __webpack_require__(30);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(13),
	    isLength = __webpack_require__(15),
	    toObject = __webpack_require__(8);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(74),
	    baseCallback = __webpack_require__(51),
	    baseMap = __webpack_require__(75),
	    isArray = __webpack_require__(17);

	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `iteratee` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `iteratee` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	 * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	 * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	 * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	 * `sum`, `uniq`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @alias collect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function timesThree(n) {
	 *   return n * 3;
	 * }
	 *
	 * _.map([1, 2], timesThree);
	 * // => [3, 6]
	 *
	 * _.map({ 'a': 1, 'b': 2 }, timesThree);
	 * // => [3, 6] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // using the `_.property` callback shorthand
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee, thisArg) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  iteratee = baseCallback(iteratee, thisArg, 3);
	  return func(collection, iteratee);
	}

	module.exports = map;


/***/ },
/* 74 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(70),
	    isArrayLike = __webpack_require__(12);

	/**
	 * The base implementation of `_.map` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEvery = __webpack_require__(77),
	    baseCallback = __webpack_require__(51),
	    baseEvery = __webpack_require__(78),
	    isArray = __webpack_require__(17),
	    isIterateeCall = __webpack_require__(35);

	/**
	 * Checks if `predicate` returns truthy for **all** elements of `collection`.
	 * The predicate is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias all
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.every([true, 1, null, 'yes'], Boolean);
	 * // => false
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': false },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.every(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.every(users, 'active', false);
	 * // => true
	 *
	 * // using the `_.property` callback shorthand
	 * _.every(users, 'active');
	 * // => false
	 */
	function every(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arrayEvery : baseEvery;
	  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	    predicate = undefined;
	  }
	  if (typeof predicate != 'function' || thisArg !== undefined) {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = every;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(70);

	/**
	 * The base implementation of `_.every` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`
	 */
	function baseEvery(collection, predicate) {
	  var result = true;
	  baseEach(collection, function(value, index, collection) {
	    result = !!predicate(value, index, collection);
	    return result;
	  });
	  return result;
	}

	module.exports = baseEvery;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(17),
	    isArrayLike = __webpack_require__(12),
	    isFunction = __webpack_require__(20),
	    isObjectLike = __webpack_require__(16),
	    isString = __webpack_require__(80),
	    keys = __webpack_require__(30);

	/**
	 * Checks if `value` is empty. A value is considered empty unless it's an
	 * `arguments` object, array, string, or jQuery-like collection with a length
	 * greater than `0` or an object with own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {Array|Object|string} value The value to inspect.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
	      (isObjectLike(value) && isFunction(value.splice)))) {
	    return !value.length;
	  }
	  return !keys(value).length;
	}

	module.exports = isEmpty;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that negates the result of the predicate `func`. The
	 * `func` predicate is invoked with the `this` binding and arguments of the
	 * created function.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} predicate The predicate to negate.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * function isEven(n) {
	 *   return n % 2 == 0;
	 * }
	 *
	 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	 * // => [1, 3, 5]
	 */
	function negate(predicate) {
	  if (typeof predicate != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  return function() {
	    return !predicate.apply(this, arguments);
	  };
	}

	module.exports = negate;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var assignWith = __webpack_require__(83),
	    baseAssign = __webpack_require__(84),
	    createAssigner = __webpack_require__(32);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it's invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});

	module.exports = assign;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(30);

	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	module.exports = assignWith;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(29),
	    keys = __webpack_require__(30);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(70),
	    createFind = __webpack_require__(86);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) {
	 *   return chr.age < 40;
	 * }), 'user');
	 * // => 'barney'
	 *
	 * // using the `_.matches` callback shorthand
	 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.result(_.find(users, 'active', false), 'user');
	 * // => 'fred'
	 *
	 * // using the `_.property` callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'barney'
	 */
	var find = createFind(baseEach);

	module.exports = find;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(51),
	    baseFind = __webpack_require__(87),
	    baseFindIndex = __webpack_require__(88),
	    isArray = __webpack_require__(17);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(eachFunc, fromRight) {
	  return function(collection, predicate, thisArg) {
	    predicate = baseCallback(predicate, thisArg, 3);
	    if (isArray(collection)) {
	      var index = baseFindIndex(collection, predicate, fromRight);
	      return index > -1 ? collection[index] : undefined;
	    }
	    return baseFind(collection, predicate, eachFunc);
	  };
	}

	module.exports = createFind;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var createPartial = __webpack_require__(90);

	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_FLAG = 32;

	/**
	 * Creates a function that invokes `func` with `partial` arguments prepended
	 * to those provided to the new function. This method is like `_.bind` except
	 * it does **not** alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method does not set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * var greet = function(greeting, name) {
	 *   return greeting + ' ' + name;
	 * };
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // using placeholders
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = createPartial(PARTIAL_FLAG);

	// Assign default placeholders.
	partial.placeholder = {};

	module.exports = partial;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(91),
	    replaceHolders = __webpack_require__(111),
	    restParam = __webpack_require__(36);

	/**
	 * Creates a `_.partial` or `_.partialRight` function.
	 *
	 * @private
	 * @param {boolean} flag The partial bit flag.
	 * @returns {Function} Returns the new partial function.
	 */
	function createPartial(flag) {
	  var partialFunc = restParam(function(func, partials) {
	    var holders = replaceHolders(partials, partialFunc.placeholder);
	    return createWrapper(func, flag, undefined, partials, holders);
	  });
	  return partialFunc;
	}

	module.exports = createPartial;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(92),
	    createBindWrapper = __webpack_require__(94),
	    createHybridWrapper = __webpack_require__(97),
	    createPartialWrapper = __webpack_require__(114),
	    getData = __webpack_require__(103),
	    mergeData = __webpack_require__(115),
	    setData = __webpack_require__(112);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to reference.
	 * @param {number} bitmask The bitmask of flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  length -= (holders ? holders.length : 0);
	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func),
	      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

	  if (data) {
	    mergeData(newData, data);
	    bitmask = newData[1];
	    arity = newData[9];
	  }
	  newData[9] = arity == null
	    ? (isBindKey ? 0 : func.length)
	    : (nativeMax(arity - length, 0) || 0);

	  if (bitmask == BIND_FLAG) {
	    var result = createBindWrapper(newData[0], newData[2]);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
	    result = createPartialWrapper.apply(undefined, newData);
	  } else {
	    result = createHybridWrapper.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setter(result, newData);
	}

	module.exports = createWrapper;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(34),
	    metaMap = __webpack_require__(93);

	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};

	module.exports = baseSetData;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var getNative = __webpack_require__(18);

	/** Native method references. */
	var WeakMap = getNative(global, 'WeakMap');

	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;

	module.exports = metaMap;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var createCtorWrapper = __webpack_require__(95);

	/**
	 * Creates a function that wraps `func` and invokes it with the `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new bound function.
	 */
	function createBindWrapper(func, thisArg) {
	  var Ctor = createCtorWrapper(func);

	  function wrapper() {
	    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(thisArg, arguments);
	  }
	  return wrapper;
	}

	module.exports = createBindWrapper;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(96),
	    isObject = __webpack_require__(9);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtorWrapper(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors.
	    // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	module.exports = createCtorWrapper;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      object.prototype = prototype;
	      var result = new object;
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var arrayCopy = __webpack_require__(26),
	    composeArgs = __webpack_require__(98),
	    composeArgsRight = __webpack_require__(99),
	    createCtorWrapper = __webpack_require__(95),
	    isLaziable = __webpack_require__(100),
	    reorder = __webpack_require__(110),
	    replaceHolders = __webpack_require__(111),
	    setData = __webpack_require__(112);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64,
	    ARY_FLAG = 128;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that wraps `func` and invokes it with optional `this`
	 * binding of, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to reference.
	 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurry = bitmask & CURRY_FLAG,
	      isCurryBound = bitmask & CURRY_BOUND_FLAG,
	      isCurryRight = bitmask & CURRY_RIGHT_FLAG,
	      Ctor = isBindKey ? undefined : createCtorWrapper(func);

	  function wrapper() {
	    // Avoid `arguments` object use disqualifying optimizations by
	    // converting it to an array before providing it to other functions.
	    var length = arguments.length,
	        index = length,
	        args = Array(length);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight);
	    }
	    if (isCurry || isCurryRight) {
	      var placeholder = wrapper.placeholder,
	          argsHolders = replaceHolders(args, placeholder);

	      length -= argsHolders.length;
	      if (length < arity) {
	        var newArgPos = argPos ? arrayCopy(argPos) : undefined,
	            newArity = nativeMax(arity - length, 0),
	            newsHolders = isCurry ? argsHolders : undefined,
	            newHoldersRight = isCurry ? undefined : argsHolders,
	            newPartials = isCurry ? args : undefined,
	            newPartialsRight = isCurry ? undefined : args;

	        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	        if (!isCurryBound) {
	          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	        }
	        var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
	            result = createHybridWrapper.apply(undefined, newData);

	        if (isLaziable(func)) {
	          setData(result, newData);
	        }
	        result.placeholder = placeholder;
	        return result;
	      }
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    if (argPos) {
	      args = reorder(args, argPos);
	    }
	    if (isAry && ary < args.length) {
	      args.length = ary;
	    }
	    if (this && this !== global && this instanceof wrapper) {
	      fn = Ctor || createCtorWrapper(func);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	module.exports = createHybridWrapper;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 98 */
/***/ function(module, exports) {

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders) {
	  var holdersLength = holders.length,
	      argsIndex = -1,
	      argsLength = nativeMax(args.length - holdersLength, 0),
	      leftIndex = -1,
	      leftLength = partials.length,
	      result = Array(leftLength + argsLength);

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    result[holders[argsIndex]] = args[argsIndex];
	  }
	  while (argsLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgs;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders) {
	  var holdersIndex = -1,
	      holdersLength = holders.length,
	      argsIndex = -1,
	      argsLength = nativeMax(args.length - holdersLength, 0),
	      rightIndex = -1,
	      rightLength = partials.length,
	      result = Array(argsLength + rightLength);

	  while (++argsIndex < argsLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    result[offset + holders[holdersIndex]] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgsRight;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(101),
	    getData = __webpack_require__(103),
	    getFuncName = __webpack_require__(105),
	    lodash = __webpack_require__(107);

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];

	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}

	module.exports = isLaziable;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(96),
	    baseLodash = __webpack_require__(102);

	/** Used as references for `-Infinity` and `Infinity`. */
	var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = POSITIVE_INFINITY;
	  this.__views__ = [];
	}

	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	module.exports = LazyWrapper;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype all chaining wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	module.exports = baseLodash;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(93),
	    noop = __webpack_require__(104);

	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};

	module.exports = getData;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(106);

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = array ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	module.exports = getFuncName;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};

	module.exports = realNames;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(101),
	    LodashWrapper = __webpack_require__(108),
	    baseLodash = __webpack_require__(102),
	    isArray = __webpack_require__(17),
	    isObjectLike = __webpack_require__(16),
	    wrapperClone = __webpack_require__(109);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	 * Methods that operate on and return arrays, collections, and functions can
	 * be chained together. Methods that retrieve a single value or may return a
	 * primitive value will automatically end the chain returning the unwrapped
	 * value. Explicit chaining may be enabled using `_.chain`. The execution of
	 * chained methods is lazy, that is, execution is deferred until `_#value`
	 * is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	 * fusion is an optimization strategy which merge iteratee calls; this can help
	 * to avoid the creation of intermediate data structures and greatly reduce the
	 * number of iteratee executions.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	 * `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	 * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	 * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	 * and `where`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	 * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	 * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
	 * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
	 * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
	 * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	 * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	 * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
	 * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
	 * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	 * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	 * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
	 * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
	 * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
	 * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
	 * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
	 * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
	 * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	 * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
	 * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
	 * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	 * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
	 * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
	 * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
	 * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
	 * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
	 * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
	 * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
	 * `unescape`, `uniqueId`, `value`, and `words`
	 *
	 * The wrapper method `sample` will return a wrapped value when `n` is provided,
	 * otherwise an unwrapped value is returned.
	 *
	 * @name _
	 * @constructor
	 * @category Chain
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // returns an unwrapped value
	 * wrapped.reduce(function(total, n) {
	 *   return total + n;
	 * });
	 * // => 6
	 *
	 * // returns a wrapped value
	 * var squares = wrapped.map(function(n) {
	 *   return n * n;
	 * });
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;

	module.exports = lodash;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(96),
	    baseLodash = __webpack_require__(102);

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	 * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	 */
	function LodashWrapper(value, chainAll, actions) {
	  this.__wrapped__ = value;
	  this.__actions__ = actions || [];
	  this.__chain__ = !!chainAll;
	}

	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	module.exports = LodashWrapper;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(101),
	    LodashWrapper = __webpack_require__(108),
	    arrayCopy = __webpack_require__(26);

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  return wrapper instanceof LazyWrapper
	    ? wrapper.clone()
	    : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
	}

	module.exports = wrapperClone;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(26),
	    isIndex = __webpack_require__(21);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = arrayCopy(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	module.exports = reorder;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    if (array[index] === placeholder) {
	      array[index] = PLACEHOLDER;
	      result[++resIndex] = index;
	    }
	  }
	  return result;
	}

	module.exports = replaceHolders;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(92),
	    now = __webpack_require__(113);

	/** Used to detect when a function becomes hot. */
	var HOT_COUNT = 150,
	    HOT_SPAN = 16;

	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity function
	 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = (function() {
	  var count = 0,
	      lastCalled = 0;

	  return function(key, value) {
	    var stamp = now(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return key;
	      }
	    } else {
	      count = 0;
	    }
	    return baseSetData(key, value);
	  };
	}());

	module.exports = setData;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(18);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeNow = getNative(Date, 'now');

	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function() {
	  return new Date().getTime();
	};

	module.exports = now;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var createCtorWrapper = __webpack_require__(95);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` and invokes it with the optional `this`
	 * binding of `thisArg` and the `partials` prepended to those provided to
	 * the wrapper.
	 *
	 * @private
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to the new function.
	 * @returns {Function} Returns the new bound function.
	 */
	function createPartialWrapper(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);

	  function wrapper() {
	    // Avoid `arguments` object use disqualifying optimizations by
	    // converting it to an array before providing it `func`.
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength);

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartialWrapper;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(26),
	    composeArgs = __webpack_require__(98),
	    composeArgsRight = __webpack_require__(99),
	    replaceHolders = __webpack_require__(111);

	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers required to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	 * augment function arguments, making the order in which they are executed important,
	 * preventing the merging of metadata. However, we make an exception for a safe
	 * common case where curried functions have `_.ary` and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < ARY_FLAG;

	  var isCombo =
	    (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
	    (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
	    (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);

	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = arrayCopy(value);
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;

	  return data;
	}

	module.exports = mergeData;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var map = __webpack_require__(73),
	    property = __webpack_require__(67);

	/**
	 * Gets the property value of `path` from all elements in `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Array|string} path The path of the property to pluck.
	 * @returns {Array} Returns the property values.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36 },
	 *   { 'user': 'fred',   'age': 40 }
	 * ];
	 *
	 * _.pluck(users, 'user');
	 * // => ['barney', 'fred']
	 *
	 * var userIndex = _.indexBy(users, 'user');
	 * _.pluck(userIndex, 'age');
	 * // => [36, 40] (iteration order is not guaranteed)
	 */
	function pluck(collection, path) {
	  return map(collection, property(path));
	}

	module.exports = pluck;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(118),
	    isIterateeCall = __webpack_require__(35);

	/**
	 * Flattens a nested array. If `isDeep` is `true` the array is recursively
	 * flattened, otherwise it's only flattened a single level.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, 3, [4]]]);
	 * // => [1, 2, 3, [4]]
	 *
	 * // using `isDeep`
	 * _.flatten([1, [2, 3, [4]]], true);
	 * // => [1, 2, 3, 4]
	 */
	function flatten(array, isDeep, guard) {
	  var length = array ? array.length : 0;
	  if (guard && isIterateeCall(array, isDeep, guard)) {
	    isDeep = false;
	  }
	  return length ? baseFlatten(array, isDeep) : [];
	}

	module.exports = flatten;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(119),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(17),
	    isArrayLike = __webpack_require__(12),
	    isObjectLike = __webpack_require__(16);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 120 */
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