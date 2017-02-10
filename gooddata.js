/* Copyright (C) 2007-2015, GoodData(R) Corporation. All rights reserved. */
/* gooddata - v1.0.8 */
/* 2017-02-10 10:38:01 */
/* Latest git commit: "0c23f4d" */


(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["isomorphic-fetch"], factory);
	else if(typeof exports === 'object')
		exports["gooddata"] = factory(require("isomorphic-fetch"));
	else
		root["gooddata"] = factory(root["isomorphic-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_66__) {
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _xhr = __webpack_require__(1);

	var xhr = _interopRequireWildcard(_xhr);

	var _user = __webpack_require__(68);

	var user = _interopRequireWildcard(_user);

	var _metadata = __webpack_require__(69);

	var md = _interopRequireWildcard(_metadata);

	var _execution = __webpack_require__(81);

	var execution = _interopRequireWildcard(_execution);

	var _project = __webpack_require__(127);

	var project = _interopRequireWildcard(_project);

	var _config = __webpack_require__(67);

	var config = _interopRequireWildcard(_config);

	var _catalogue = __webpack_require__(128);

	var catalogue = _interopRequireWildcard(_catalogue);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * # JS SDK
	 * Here is a set of functions that mostly are a thin wraper over the [GoodData API](https://developer.gooddata.com/api).
	 * Before calling any of those functions, you need to authenticate with a valid GoodData
	 * user credentials. After that, every subsequent call in the current session is authenticated.
	 * You can find more about the GD authentication mechanism here.
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
	var gooddata = { config: config, xhr: xhr, user: user, md: md, execution: execution, project: project, catalogue: catalogue }; // Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	exports.default = gooddata;

	module.exports = gooddata;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.put = exports.post = exports.get = exports.parseJSON = undefined;

	var _merge2 = __webpack_require__(2);

	var _merge3 = _interopRequireDefault(_merge2);

	var _has2 = __webpack_require__(65);

	var _has3 = _interopRequireDefault(_has2);

	var _isFunction2 = __webpack_require__(51);

	var _isFunction3 = _interopRequireDefault(_isFunction2);

	var _isPlainObject2 = __webpack_require__(54);

	var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

	exports.ajaxSetup = ajaxSetup;
	exports.ajax = ajax;

	__webpack_require__(66);

	var _config = __webpack_require__(67);

	var config = _interopRequireWildcard(_config);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Ajax wrapper around GDC authentication mechanisms, SST and TT token handling and polling.
	 * Inteface is same as original jQuery.ajax.

	 * If token is expired, current request is "paused", token is refreshed and request is retried and result.
	 * is transparently returned to original call.

	 * Additionally polling is handled. Only final result of polling returned.
	 * @module xhr
	 * @class xhr
	 */

	// Copyright (C) 2007-2013, GoodData(R) Corporation. All rights reserved.
	var DEFAULT_POLL_DELAY = 1000;

	var tokenRequest = void 0;
	var commonXhrSettings = {};

	/**
	 * Back compatible method for setting common XHR settings
	 *
	 * Usually in our apps we used beforeSend ajax callback to set the X-GDC-REQUEST header with unique ID.
	 *
	 * @param settings object XHR settings as
	 */
	function ajaxSetup(settings) {
	    commonXhrSettings = Object.assign({}, commonXhrSettings, settings);
	}

	function simulateBeforeSend(settings) {
	    var xhr = {
	        setRequestHeader: function setRequestHeader(key, value) {
	            settings.headers.set(key, value);
	        }
	    };

	    if ((0, _isFunction3.default)(settings.beforeSend)) {
	        settings.beforeSend(xhr);
	    }
	}

	function enrichSettingWithCustomDomain(originalUrl, originalSettings, domain) {
	    var url = originalUrl;
	    var settings = originalSettings;
	    if (domain) {
	        // protect url to be prepended with domain on retry
	        if (originalUrl.indexOf(domain) === -1) {
	            url = domain + originalUrl;
	        }
	        settings.mode = 'cors';
	        settings.credentials = 'include';
	    }

	    return { url: url, settings: settings };
	}

	function continueAfterTokenRequest(url, settings) {
	    return tokenRequest.then(function (response) {
	        if (!response.ok) {
	            var err = new Error('Unauthorized');
	            err.response = response;
	            throw err;
	        }
	        tokenRequest = null;

	        return ajax(url, settings); // eslint-disable-line no-use-before-define
	    }, function (reason) {
	        tokenRequest = null;
	        return reason;
	    });
	}

	function createSettings(customSettings) {
	    var headers = new Headers({
	        Accept: 'application/json; charset=utf-8',
	        'Content-Type': 'application/json'
	    });

	    var settings = Object.assign({}, commonXhrSettings, customSettings);

	    settings.pollDelay = settings.pollDelay !== undefined ? settings.pollDelay : DEFAULT_POLL_DELAY;

	    settings.headers = headers;

	    // TODO jquery compat - add to warnings
	    settings.body = settings.data ? settings.data : settings.body;
	    settings.mode = 'same-origin';
	    settings.credentials = 'same-origin';

	    if ((0, _isPlainObject3.default)(settings.body)) {
	        settings.body = JSON.stringify(settings.body);
	    }

	    return settings;
	}

	function handleUnauthorized(originalUrl, originalSettings) {
	    if (!tokenRequest) {
	        // Create only single token request for any number of waiting request.
	        // If token request exist, just listen for it's end.
	        var _enrichSettingWithCus = enrichSettingWithCustomDomain('/gdc/account/token', createSettings({}), config.domain),
	            url = _enrichSettingWithCus.url,
	            settings = _enrichSettingWithCus.settings;

	        tokenRequest = fetch(url, settings).then(function (response) {
	            // tokenRequest = null;
	            // TODO jquery compat - allow to attach unauthorized callback and call it if attached
	            // if ((xhrObj.status === 401) && (isFunction(req.unauthorized))) {
	            //     req.unauthorized(xhrObj, textStatus, err, deferred);
	            //     return;
	            // }
	            // unauthorized handler is not defined or not http 401
	            // unauthorized when retrieving token -> not logged
	            if (response.status === 401) {
	                var err = new Error('Unauthorized');
	                err.response = response;
	                throw err;
	            }

	            return response;
	        });
	    }
	    return continueAfterTokenRequest(originalUrl, originalSettings);
	}

	function isLoginRequest(url) {
	    return url.indexOf('/gdc/account/login') !== -1;
	}

	/**
	 * @param {Response} response
	 * @return {Promise} promise which resolves to result JSON ()
	 */
	var parseJSON = exports.parseJSON = function parseJSON(response) {
	    return response.json();
	};

	/**
	 * @param {Response} response see https://developer.mozilla.org/en-US/docs/Web/API/Response
	 * @return {Response} or {Error}
	 */
	var checkStatus = function checkStatus(response) {
	    if (response.status >= 200 && response.status < 399) {
	        return response;
	    }

	    if (response instanceof Error && (0, _has3.default)(response, 'response')) {
	        throw response;
	    }

	    var error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	};

	function handlePolling(url, settings) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            ajax(url, settings).then(resolve, reject); // eslint-disable-line no-use-before-define
	        }, settings.pollDelay);
	    });
	}

	function ajax(originalUrl) {
	    var tempSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var firstSettings = createSettings(tempSettings);

	    var _enrichSettingWithCus2 = enrichSettingWithCustomDomain(originalUrl, firstSettings, config.domain),
	        url = _enrichSettingWithCus2.url,
	        settings = _enrichSettingWithCus2.settings;

	    simulateBeforeSend(settings);

	    if (tokenRequest) {
	        return continueAfterTokenRequest(url, settings);
	    }

	    return fetch(url, settings).then(function (response) {
	        // If response.status id 401 and it was a login request there is no need
	        // to cycle back for token - login does not need token and this meand you
	        // are not authorized
	        if (response.status === 401) {
	            if (isLoginRequest(url)) {
	                var err = new Error('Unauthorized');
	                err.response = response;
	                throw err;
	            }

	            return handleUnauthorized(url, settings);
	        }

	        if (response.status === 202 && !settings.dontPollOnResult) {
	            // if the response is 202 and Location header is not empty, let's poll on the new Location
	            var finalUrl = url;
	            var finalSettings = settings;
	            if (response.headers.has('Location')) {
	                finalUrl = response.headers.get('Location');
	            }
	            finalSettings.method = 'GET';
	            delete finalSettings.data;
	            delete finalSettings.body;
	            return handlePolling(finalUrl, finalSettings);
	        }
	        return response;
	    }).then(checkStatus);
	}

	function xhrMethod(method) {
	    return function methodFn(url, settings) {
	        var opts = (0, _merge3.default)({ method: method }, settings);

	        return ajax(url, opts);
	    };
	}

	/**
	 * Wrapper for xhr.ajax method GET
	 * @method get
	 */
	var get = exports.get = function get(url, settings) {
	    var opts = (0, _merge3.default)({ method: 'GET' }, settings);

	    return ajax(url, opts).then(parseJSON);
	};

	/**
	 * Wrapper for xhr.ajax method POST
	 * @method post
	 */
	var post = exports.post = xhrMethod('POST');

	/**
	 * Wrapper for xhr.ajax method PUT
	 * @method put
	 */
	var put = exports.put = xhrMethod('PUT');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(3),
	    createAssigner = __webpack_require__(58);

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(4),
	    arrayEach = __webpack_require__(12),
	    assignMergeValue = __webpack_require__(13),
	    baseKeysIn = __webpack_require__(15),
	    baseMergeDeep = __webpack_require__(16),
	    isArray = __webpack_require__(46),
	    isObject = __webpack_require__(43),
	    isTypedArray = __webpack_require__(55);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  if (!(isArray(source) || isTypedArray(source))) {
	    var props = baseKeysIn(source);
	  }
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}

	module.exports = baseMerge;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(5),
	    listCacheDelete = __webpack_require__(6),
	    listCacheGet = __webpack_require__(9),
	    listCacheHas = __webpack_require__(10),
	    listCacheSet = __webpack_require__(11);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(8);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(14),
	    eq = __webpack_require__(8);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (typeof key == 'number' && value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var defineProperty = Object.defineProperty;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(13),
	    baseClone = __webpack_require__(17),
	    copyArray = __webpack_require__(24),
	    isArguments = __webpack_require__(48),
	    isArray = __webpack_require__(46),
	    isArrayLikeObject = __webpack_require__(49),
	    isFunction = __webpack_require__(51),
	    isObject = __webpack_require__(43),
	    isPlainObject = __webpack_require__(54),
	    isTypedArray = __webpack_require__(55),
	    toPlainObject = __webpack_require__(56);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue, true);
	      }
	      else {
	        newValue = objValue;
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(4),
	    arrayEach = __webpack_require__(12),
	    assignValue = __webpack_require__(18),
	    baseAssign = __webpack_require__(19),
	    cloneBuffer = __webpack_require__(23),
	    copyArray = __webpack_require__(24),
	    copySymbols = __webpack_require__(25),
	    getAllKeys = __webpack_require__(27),
	    getTag = __webpack_require__(28),
	    initCloneArray = __webpack_require__(39),
	    initCloneByTag = __webpack_require__(40),
	    initCloneObject = __webpack_require__(41),
	    isArray = __webpack_require__(46),
	    isBuffer = __webpack_require__(47),
	    isObject = __webpack_require__(43),
	    keys = __webpack_require__(21);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (!isArr) {
	    var props = isFull ? getAllKeys(value) : keys(value);
	  }
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(14),
	    eq = __webpack_require__(8);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(20),
	    keys = __webpack_require__(21);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(18),
	    baseAssignValue = __webpack_require__(14);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(22);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(20),
	    getSymbols = __webpack_require__(26);

	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(22);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(29),
	    Map = __webpack_require__(33),
	    Promise = __webpack_require__(34),
	    Set = __webpack_require__(35),
	    WeakMap = __webpack_require__(36),
	    baseGetTag = __webpack_require__(37),
	    toSource = __webpack_require__(38);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(32);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(30),
	    root = __webpack_require__(31);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(42),
	    getPrototype = __webpack_require__(44),
	    isPrototype = __webpack_require__(45);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(43);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}

	module.exports = baseCreate;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(22);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(50),
	    isObjectLike = __webpack_require__(53);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(51),
	    isLength = __webpack_require__(52);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(43);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
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
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(44),
	    isObjectLike = __webpack_require__(53);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
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
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(20),
	    keysIn = __webpack_require__(57);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
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
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(59),
	    isIterateeCall = __webpack_require__(64);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(60),
	    overRest = __webpack_require__(61),
	    setToString = __webpack_require__(63);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(62);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  return object != null && hasOwnProperty.call(object, key);
	}

	module.exports = baseHas;


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_66__;

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.setCustomDomain = setCustomDomain;
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

	var URL_REGEXP = '(?:(https)://+|(www\\.)?)\\w[:;,\\.?\\[\\]\\w/~%&=+#-@!]*';

	// TODO - fix this
	var domain = exports.domain = void 0; // eslint-disable-line import/no-mutable-exports

	/**
	 * Sets custom domain. Parameter is url which has always to be https://
	 * (if you don't provide it, we will do it for you).
	 *
	 * RegExp inspired taken from
	 * https://github.com/jarib/google-closure-library/blob/master/closure/goog/string/linkify.js
	 * @param {String|null} d valid domain starting with https:// or null for removing
	 * @method setCustomDomain
	 */
	function setCustomDomain(d) {
	    var sanitizedDomain = d || '';
	    var link = sanitizedDomain.match(URL_REGEXP);

	    if (d === null) {
	        exports.domain = domain = undefined;
	        return;
	    }

	    if (!link) {
	        throw new Error(d + ' is not a valid url');
	    }

	    // ensure https:// prefix
	    // and strip possible trailing /
	    exports.domain = domain = 'https://' + link[0].replace(/^https:\/\//, '').replace(/\/$/, '');
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isLoggedIn = isLoggedIn;
	exports.login = login;
	exports.logout = logout;
	exports.updateProfileSettings = updateProfileSettings;
	exports.getAccountInfo = getAccountInfo;

	var _xhr = __webpack_require__(1);

	/**
	 * @module user
	 * @class user
	 */

	/**
	 * Find out whether a user is logged in
	 *
	 * @return {Promise} resolves with true if user logged in, false otherwise
	 * @method isLoggedIn
	 */
	function isLoggedIn() {
	    return new Promise(function (resolve, reject) {
	        // cannot use get here directly - we need to access to response
	        // not to responses JSON get returns
	        (0, _xhr.ajax)('/gdc/account/token', { method: 'GET' }).then(function (r) {
	            if (r.ok) {
	                resolve(true);
	            }

	            resolve(false);
	        }, function (err) {
	            if (err.response.status === 401) {
	                resolve(false);
	            } else {
	                reject(err);
	            }
	        });
	    });
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
	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	function login(username, password) {
	    return (0, _xhr.post)('/gdc/account/login', {
	        body: JSON.stringify({
	            postUserLogin: {
	                login: username,
	                password: password,
	                remember: 1,
	                captcha: '',
	                verifyCaptcha: ''
	            }
	        })
	    }).then(_xhr.parseJSON);
	}

	/**
	 * Logs out current user
	 * @method logout
	 */
	function logout() {
	    return isLoggedIn().then(function (loggedIn) {
	        if (loggedIn) {
	            return (0, _xhr.get)('/gdc/app/account/bootstrap').then(function (result) {
	                var userUri = result.bootstrapResource.accountSetting.links.self;
	                var userId = userUri.match(/([^\/]+)\/?$/)[1]; // eslint-disable-line no-useless-escape

	                return (0, _xhr.ajax)('/gdc/account/login/' + userId, {
	                    method: 'delete'
	                });
	            });
	        }

	        return Promise.resolve();
	    });
	}

	/**
	 * Updates user's profile settings
	 * @method updateProfileSettings
	 * @param {String} profileId - User profile identifier
	 * @param {Object} profileSetting
	*/
	function updateProfileSettings(profileId, profileSetting) {
	    return (0, _xhr.put)('/gdc/account/profile/' + profileId + '/settings', {
	        data: profileSetting
	    });
	}

	/**
	 * Returns info about currently logged in user from bootstrap resource
	 * @method getAccountInfo
	 */
	function getAccountInfo() {
	    return (0, _xhr.get)('/gdc/app/account/bootstrap').then(function (result) {
	        var br = result.bootstrapResource;
	        var accountInfo = {
	            login: br.accountSetting.login,
	            loginMD5: br.current.loginMD5,
	            firstName: br.accountSetting.firstName,
	            lastName: br.accountSetting.lastName,
	            organizationName: br.settings.organizationName,
	            profileUri: br.accountSetting.links.self
	        };

	        return accountInfo;
	    });
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _flatten2 = __webpack_require__(70);

	var _flatten3 = _interopRequireDefault(_flatten2);

	var _chunk2 = __webpack_require__(75);

	var _chunk3 = _interopRequireDefault(_chunk2);

	var _get3 = __webpack_require__(78);

	var _get4 = _interopRequireDefault(_get3);

	var _isPlainObject2 = __webpack_require__(54);

	var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.


	exports.getObjects = getObjects;
	exports.getObjectUsing = getObjectUsing;
	exports.getObjectUsingMany = getObjectUsingMany;
	exports.getElementDetails = getElementDetails;
	exports.getAttributes = getAttributes;
	exports.getDimensions = getDimensions;
	exports.getFolders = getFolders;
	exports.getFacts = getFacts;
	exports.getMetrics = getMetrics;
	exports.getAvailableMetrics = getAvailableMetrics;
	exports.getAvailableAttributes = getAvailableAttributes;
	exports.getAvailableFacts = getAvailableFacts;
	exports.getObjectDetails = getObjectDetails;
	exports.getFoldersWithItems = getFoldersWithItems;
	exports.getObjectIdentifier = getObjectIdentifier;
	exports.getObjectUri = getObjectUri;

	var _xhr = __webpack_require__(1);

	var _util = __webpack_require__(80);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Functions for working with metadata objects
	 *
	 * @class metadata
	 * @module metadata
	 */

	/**
	 * Load all objects with given uris
	 * (use bulk loading instead of getting objects one by one)
	 *
	 * @method getObjects
	 * @param {String} projectId id of the project
	 * @param {Array} objectUris array of uris for objects to be loaded
	 * @return {Array} array of loaded elements
	 */
	function getObjects(projectId, objectUris) {
	    var LIMIT = 50;
	    var uri = '/gdc/md/' + projectId + '/objects/get';

	    var objectsUrisChunks = (0, _chunk3.default)(objectUris, LIMIT);

	    var promises = objectsUrisChunks.map(function (objectUrisChunk) {
	        var data = {
	            get: {
	                items: objectUrisChunk
	            }
	        };

	        return (0, _xhr.post)(uri, {
	            data: JSON.stringify(data)
	        }).then(function (r) {
	            if (!r.ok) {
	                var err = new Error(r.statusText);
	                err.response = r;
	                throw err;
	            }

	            return r.json();
	        }).then(function (result) {
	            return (0, _get4.default)(result, ['objects', 'items']);
	        });
	    });

	    return Promise.all(promises).then(_flatten3.default);
	}

	/**
	 * Get MD objects from using2 resource. Include only objects of given types
	 * and take care about fetching only nearest objects if requested.
	 *
	 * @method getObjectUsing
	 * @param {String} projectId id of the project
	 * @param {String} uri uri of the object for which dependencies are to be found
	 * @param {Object} options objects with options:
	 *        - types {Array} array of strings with object types to be included
	 *        - nearest {Boolean} whether to include only nearest dependencies
	 * @return {jQuery promise} promise promise once resolved returns an array of
	 *         entries returned by using2 resource
	 */
	function getObjectUsing(projectId, uri) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var _options$types = options.types,
	        types = _options$types === undefined ? [] : _options$types,
	        _options$nearest = options.nearest,
	        nearest = _options$nearest === undefined ? false : _options$nearest;

	    var resourceUri = '/gdc/md/' + projectId + '/using2';

	    var data = {
	        inUse: {
	            uri: uri,
	            types: types,
	            nearest: nearest ? 1 : 0
	        }
	    };

	    return (0, _xhr.post)(resourceUri, {
	        data: JSON.stringify(data)
	    }).then(function (r) {
	        if (!r.ok) {
	            var err = new Error(r.statusText);
	            err.response = r;
	            throw err;
	        }

	        return r.json();
	    }).then(function (result) {
	        return result.entries;
	    });
	}

	/**
	 * Get MD objects from using2 resource. Include only objects of given types
	 * and take care about fetching only nearest objects if requested.
	 *
	 * @method getObjectUsingMany
	 * @param {String} projectId id of the project
	 * @param {Array} uris uris of objects for which dependencies are to be found
	 * @param {Object} options objects with options:
	 *        - types {Array} array of strings with object types to be included
	 *        - nearest {Boolean} whether to include only nearest dependencies
	 * @return {jQuery promise} promise promise once resolved returns an array of
	 *         entries returned by using2 resource
	 */
	function getObjectUsingMany(projectId, uris) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var _options$types2 = options.types,
	        types = _options$types2 === undefined ? [] : _options$types2,
	        _options$nearest2 = options.nearest,
	        nearest = _options$nearest2 === undefined ? false : _options$nearest2;

	    var resourceUri = '/gdc/md/' + projectId + '/using2';

	    var data = {
	        inUseMany: {
	            uris: uris,
	            types: types,
	            nearest: nearest ? 1 : 0
	        }
	    };

	    return (0, _xhr.post)(resourceUri, {
	        data: JSON.stringify(data)
	    }).then(function (r) {
	        if (!r.ok) {
	            var err = new Error(r.statusText);
	            err.response = r;
	            throw err;
	        }

	        return r.json();
	    }).then(function (result) {
	        return result.useMany;
	    });
	}

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
	    var fns = elementUris.map(function (uri) {
	        return (0, _xhr.get)(uri);
	    });

	    return Promise.all(fns).then(function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var enriched = args.map(function (element) {
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

	            return undefined;
	        });

	        // override titles with related attribute title
	        var ids = {};
	        var indi = [];
	        var i = 0;
	        var formOfFns = [];

	        enriched.forEach(function (el, idx) {
	            if (el.formOf) {
	                formOfFns.push((0, _xhr.get)(el.formOf));
	                ids[el.uri] = idx;
	                indi[i] = idx;
	                i += 1;
	            }
	        });

	        // all formOf are executed
	        return Promise.all(formOfFns).then(function () {
	            for (var _len2 = arguments.length, formOfArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                formOfArgs[_key2] = arguments[_key2];
	            }

	            formOfArgs.forEach(function (arg, idx) {
	                // get element to owerwrite
	                var which = indi[idx];
	                var update = enriched[which];

	                update.name = arg[0].attribute.meta.title;
	            });

	            return enriched;
	        });
	    });
	}

	/**
	* Reutrns all attributes in a project specified by projectId param
	*
	* @method getAttributes
	* @param projectId Project identifier
	* @return {Array} An array of attribute objects
	*/
	function getAttributes(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/attributes').then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then((0, _util.getIn)('query.entries'));
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
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/dimensions').then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then((0, _util.getIn)('query.entries'));
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
	    function getFolderEntries(pId, t) {
	        var typeURL = t ? '?type=' + t : '';

	        return (0, _xhr.get)('/gdc/md/' + pId + '/query/folders' + typeURL).then((0, _util.getIn)('query.entries'));
	    }

	    switch (type) {
	        case 'fact':
	        case 'metric':
	            return getFolderEntries(projectId, type);
	        case 'attribute':
	            return getDimensions(projectId);
	        default:
	            return Promise.all([getFolderEntries(projectId, 'fact'), getFolderEntries(projectId, 'metric'), getDimensions(projectId)]).then(function (facts, metrics, attributes) {
	                return { fact: facts, metric: metrics, attribute: attributes };
	            });
	    }
	}

	/**
	 * Returns all facts in a project specified by the given projectId
	 *
	 * @method getFacts
	 * @param projectId Project identifier
	 * @return {Array} An array of fact objects
	 */
	function getFacts(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/facts').then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then((0, _util.getIn)('query.entries'));
	}

	/**
	 * Returns all metrics in a project specified by the given projectId
	 *
	 * @method getMetrics
	 * @param projectId Project identifier
	 * @return {Array} An array of metric objects
	 */
	function getMetrics(projectId) {
	    return (0, _xhr.get)('/gdc/md/' + projectId + '/query/metrics').then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then((0, _util.getIn)('query.entries'));
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
	    return (0, _xhr.post)('/gdc/md/' + projectId + '/availablemetrics', {
	        data: JSON.stringify(attrs)
	    }).then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then(function (r) {
	        return r.entries;
	    });
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
	    return (0, _xhr.post)('/gdc/md/' + projectId + '/drillcrosspaths', {
	        body: JSON.stringify(metrics)
	    }).then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then(function (r) {
	        return r.drillcrosspath.links;
	    });
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
	    return (0, _xhr.post)('/gdc/md/' + projectId + '/availablefacts', {
	        data: JSON.stringify(items)
	    }).then(function (r) {
	        return r.ok ? r.json() : r;
	    }).then(function (r) {
	        return r.entries;
	    });
	}

	/**
	 * Get details of a metadata object specified by its uri
	 *
	 * @method getObjectDetails
	 * @param uri uri of the metadata object for which details are to be retrieved
	 * @return {Object} object details
	 */
	function getObjectDetails(uri) {
	    return (0, _xhr.get)(uri);
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

	function getFoldersWithItems(projectId, type) {
	    // fetch all folders of given type and process them
	    return getFolders(projectId, type).then(function (folders) {
	        // Helper function to get details for each metric in the given
	        // array of links to the metadata objects representing the metrics.
	        // @return the array of promises
	        function getMetricItemsDetails(array) {
	            return Promise.all(array.map(getObjectDetails)).then(function () {
	                for (var _len3 = arguments.length, metricArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                    metricArgs[_key3] = arguments[_key3];
	                }

	                return metricArgs.map(function (item) {
	                    return item.metric;
	                });
	            });
	        }

	        // helper mapBy function
	        function mapBy(array, key) {
	            return array.map(function (item) {
	                return item[key];
	            });
	        }

	        // helper for sorting folder tree structure
	        // sadly @returns void (sorting == mutating array in js)
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

	        var foldersLinks = mapBy(folders, 'link');
	        var foldersTitles = mapBy(folders, 'title');

	        // fetch details for each folder
	        return Promise.all(foldersLinks.map(getObjectDetails)).then(function () {
	            for (var _len4 = arguments.length, folderDetails = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                folderDetails[_key4] = arguments[_key4];
	            }

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
	                    return Promise.all(unsortedUris.map(getObjectDetails)).then(function () {
	                        for (var _len5 = arguments.length, unsortedAttributeArgs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	                            unsortedAttributeArgs[_key5] = arguments[_key5];
	                        }

	                        // TODO add map to r.json
	                        // get unsorted attribute objects
	                        var unsortedAttributes = unsortedAttributeArgs.map(function (attr) {
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
	                            title: 'Unsorted',
	                            items: unsortedAttributes
	                        });
	                        sortFolderTree(structure);

	                        return structure;
	                    });
	                });
	            } else if (type === 'metric') {
	                var _ret = function () {
	                    var entriesLinks = folderDetails.map(function (entry) {
	                        return mapBy(entry.folder.content.entries, 'link');
	                    });
	                    // get all metrics, subtract what we have and add rest in unsorted folder
	                    return {
	                        v: getMetrics(projectId).then(function (metrics) {
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
	                            return Promise.all(entriesLinks.map(function (linkArray) {
	                                return getMetricItemsDetails(linkArray);
	                            })).then(function () {
	                                for (var _len6 = arguments.length, tree = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	                                    tree[_key6] = arguments[_key6];
	                                }

	                                // TODO add map to r.json
	                                // all promises resolved, i.e. details for each metric are available
	                                var structure = tree.map(function (treeItems, idx) {
	                                    // if idx is not in foldes list than metric is in "Unsorted" folder
	                                    return {
	                                        title: foldersTitles[idx] || 'Unsorted',
	                                        items: treeItems
	                                    };
	                                });
	                                sortFolderTree(structure);
	                                return structure;
	                            });
	                        })
	                    };
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            } else {
	                return Promise.reject();
	            }

	            return undefined;
	        });
	    });
	}

	/**
	 * Get identifier of a metadata object identified by its uri
	 *
	 * @method getObjectIdentifier
	 * @param uri uri of the metadata object for which the identifier is to be retrieved
	 * @return {String} object identifier
	 */
	function getObjectIdentifier(uri) {
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

	    if (!(0, _isPlainObject3.default)(uri)) {
	        return getObjectDetails(uri).then(function (data) {
	            return idFinder(data);
	        });
	    }
	    return Promise.resolve(idFinder(uri));
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
	    function uriFinder(obj) {
	        var data = obj.attribute ? obj.attribute : obj.metric;
	        return data.meta.uri;
	    }

	    return (0, _xhr.ajax)('/gdc/md/' + projectId + '/identifiers', {
	        method: 'POST',
	        body: {
	            identifierToUri: [identifier]
	        }
	    }).then(_xhr.parseJSON).then(function (data) {
	        var found = data.identifiers.filter(function (i) {
	            return i.identifier === identifier;
	        });

	        if (found[0]) {
	            return getObjectDetails(found[0].uri);
	        }
	        throw new Error('Object with identifier ' + identifier + ' not found in project ' + projectId);
	    }).then(function (objData) {
	        if (!objData.attributeDisplayForm) {
	            return uriFinder(objData);
	        }
	        return getObjectDetails(objData.attributeDisplayForm.content.formOf).then(function (objectData) {
	            return uriFinder(objectData);
	        });
	    });
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(71);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(72),
	    isFlattenable = __webpack_require__(73);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(74),
	    isArguments = __webpack_require__(48),
	    isArray = __webpack_require__(46);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(31);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(76),
	    isIterateeCall = __webpack_require__(64),
	    toInteger = __webpack_require__(77);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;

	/**
	 * Creates an array of elements split into groups the length of `size`.
	 * If `array` can't be split evenly, the final chunk will be the remaining
	 * elements.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to process.
	 * @param {number} [size=1] The length of each chunk
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the new array of chunks.
	 * @example
	 *
	 * _.chunk(['a', 'b', 'c', 'd'], 2);
	 * // => [['a', 'b'], ['c', 'd']]
	 *
	 * _.chunk(['a', 'b', 'c', 'd'], 3);
	 * // => [['a', 'b', 'c'], ['d']]
	 */
	function chunk(array, size, guard) {
	  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
	    size = 1;
	  } else {
	    size = nativeMax(toInteger(size), 0);
	  }
	  var length = array ? array.length : 0;
	  if (!length || size < 1) {
	    return [];
	  }
	  var index = 0,
	      resIndex = 0,
	      result = Array(nativeCeil(length / size));

	  while (index < length) {
	    result[resIndex++] = baseSlice(array, index, (index += size));
	  }
	  return result;
	}

	module.exports = chunk;


/***/ },
/* 76 */
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

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
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
/* 77 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(79);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
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
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getIn = undefined;

	var _get2 = __webpack_require__(78);

	var _get3 = _interopRequireDefault(_get2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.

	var getIn = exports.getIn = function getIn(path) {
	  return function (object) {
	    return (0, _get3.default)(object, path);
	  };
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDataForVis = exports.mdToExecutionConfiguration = undefined;

	var _omit2 = __webpack_require__(82);

	var _omit3 = _interopRequireDefault(_omit2);

	var _flatten2 = __webpack_require__(70);

	var _flatten3 = _interopRequireDefault(_flatten2);

	var _partial2 = __webpack_require__(96);

	var _partial3 = _interopRequireDefault(_partial2);

	var _assign2 = __webpack_require__(101);

	var _assign3 = _interopRequireDefault(_assign2);

	var _last2 = __webpack_require__(102);

	var _last3 = _interopRequireDefault(_last2);

	var _negate2 = __webpack_require__(103);

	var _negate3 = _interopRequireDefault(_negate2);

	var _isString2 = __webpack_require__(104);

	var _isString3 = _interopRequireDefault(_isString2);

	var _isEmpty2 = __webpack_require__(105);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _get2 = __webpack_require__(78);

	var _get3 = _interopRequireDefault(_get2);

	var _every2 = __webpack_require__(107);

	var _every3 = _interopRequireDefault(_every2);

	var _map2 = __webpack_require__(108);

	var _map3 = _interopRequireDefault(_map2);

	var _find2 = __webpack_require__(109);

	var _find3 = _interopRequireDefault(_find2);

	var _first2 = __webpack_require__(114);

	var _first3 = _interopRequireDefault(_first2);

	var _filter2 = __webpack_require__(116);

	var _filter3 = _interopRequireDefault(_filter2);

	var _compact2 = __webpack_require__(117);

	var _compact3 = _interopRequireDefault(_compact2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.


	exports.getData = getData;

	var _md = __webpack_require__(118);

	var _md2 = _interopRequireDefault(_md);

	var _invariant = __webpack_require__(122);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _xhr = __webpack_require__(1);

	var _rules = __webpack_require__(124);

	var _rules2 = _interopRequireDefault(_rules);

	var _definitions = __webpack_require__(125);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var notEmpty = (0, _negate3.default)(_isEmpty3.default);

	var findHeaderForMappingFn = function findHeaderForMappingFn(mapping, header) {
	    return (mapping.element === header.id || mapping.element === header.uri) && header.measureIndex === undefined;
	};

	var wrapMeasureIndexesFromMappings = function wrapMeasureIndexesFromMappings(metricMappings, headers) {
	    if (metricMappings) {
	        metricMappings.forEach(function (mapping) {
	            var header = (0, _find3.default)(headers, (0, _partial3.default)(findHeaderForMappingFn, mapping));
	            if (header) {
	                header.measureIndex = mapping.measureIndex;
	                header.isPoP = mapping.isPoP;
	            }
	        });
	    }
	    return headers;
	};

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
	 * @param {Array} columns - An array of attribute or metric identifiers.
	 * @param {Object} executionConfiguration - Execution configuration - can contain for example
	 *                 property "filters" containing execution context filters
	 *                 property "where" containing query-like filters
	 *                 property "orderBy" contains array of sorted properties to order in form
	 *                      [{column: 'identifier', direction: 'asc|desc'}]
	 * @param {Object} settings - Set "extended" to true to retrieve the result
	 *                            including internal attribute IDs (useful to construct filters
	 *                            for subsequent report execution requests).
	 *                             Supports additional settings accepted by the underlying
	 *                             xhr.ajax() calls
	 *
	 * @return {Object} Structure with `headers` and `rawData` keys filled with values from execution.
	 */
	function getData(projectId, columns) {
	    var executionConfiguration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var settings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	    var executedReport = {
	        isLoaded: false
	    };

	    // Extended result exposes internal attribute element IDs which can
	    // be used when constructing executionConfiguration filters for
	    // subsequent report execution requests
	    var resultKey = settings.extended ? 'extendedTabularDataResult' : 'tabularDataResult';
	    // Create request and result structures
	    var request = {
	        execution: { columns: columns }
	    };
	    // enrich configuration with supported properties such as
	    // where clause with query-like filters or execution context filters
	    ['filters', 'where', 'orderBy', 'definitions'].forEach(function (property) {
	        if (executionConfiguration[property]) {
	            request.execution[property] = executionConfiguration[property];
	        }
	    });

	    // Execute request
	    return (0, _xhr.post)('/gdc/internal/projects/' + projectId + '/experimental/executions', {
	        body: JSON.stringify(request)
	    }).then(_xhr.parseJSON).then(function (result) {
	        executedReport.headers = wrapMeasureIndexesFromMappings((0, _get3.default)(executionConfiguration, 'metricMappings'), result.executionResult.headers);

	        // Start polling on url returned in the executionResult for tabularData
	        return (0, _xhr.ajax)(result.executionResult[resultKey], settings);
	    }).then(function (r) {
	        if (r.status === 204) {
	            return {
	                status: r.status,
	                result: ''
	            };
	        }

	        return r.json().then(function (result) {
	            return {
	                status: r.status,
	                result: result
	            };
	        });
	    }).then(function (r) {
	        var result = r.result,
	            status = r.status;


	        return Object.assign({}, executedReport, {
	            rawData: (0, _get3.default)(result, resultKey + '.values', []),
	            warnings: (0, _get3.default)(result, resultKey + '.warnings', []),
	            isLoaded: true,
	            isEmpty: status === 204
	        });
	    });
	}

	var MAX_TITLE_LENGTH = 255;
	var getMetricTitle = function getMetricTitle(suffix, title) {
	    var maxLength = MAX_TITLE_LENGTH - suffix.length;
	    if (title && title.length > maxLength) {
	        if (title[title.length - 1] === ')') {
	            return title.substring(0, maxLength - 2) + '\u2026)' + suffix;
	        }
	        return title.substring(0, maxLength - 1) + '\u2026' + suffix;
	    }
	    return '' + title + suffix;
	};

	var getBaseMetricTitle = (0, _partial3.default)(getMetricTitle, '');

	var POP_SUFFIX = ' - previous year';
	var getPoPMetricTitle = (0, _partial3.default)(getMetricTitle, POP_SUFFIX);

	var CONTRIBUTION_METRIC_FORMAT = '#,##0.00%';

	var allFiltersEmpty = function allFiltersEmpty(item) {
	    return (0, _every3.default)((0, _map3.default)((0, _get3.default)(item, 'measureFilters', []), function (f) {
	        return (0, _isEmpty3.default)((0, _get3.default)(f, 'listAttributeFilter.default.attributeElements', []));
	    }));
	};

	var isDerived = function isDerived(measure) {
	    var type = (0, _get3.default)(measure, 'type');
	    return type === 'fact' || type === 'attribute' || !allFiltersEmpty(measure);
	};

	var getFilterExpression = function getFilterExpression(listAttributeFilter) {
	    var attributeUri = (0, _get3.default)(listAttributeFilter, 'listAttributeFilter.attribute');
	    var elements = (0, _get3.default)(listAttributeFilter, 'listAttributeFilter.default.attributeElements', []);
	    if ((0, _isEmpty3.default)(elements)) {
	        return null;
	    }
	    var elementsForQuery = (0, _map3.default)(elements, function (e) {
	        return '[' + e + ']';
	    });
	    var negative = (0, _get3.default)(listAttributeFilter, 'listAttributeFilter.default.negativeSelection') ? 'NOT ' : '';

	    return '[' + attributeUri + '] ' + negative + 'IN (' + elementsForQuery.join(',') + ')';
	};

	var getGeneratedMetricExpression = function getGeneratedMetricExpression(item) {
	    var aggregation = (0, _get3.default)(item, 'aggregation', '').toUpperCase();
	    var objectUri = (0, _get3.default)(item, 'objectUri');
	    var where = (0, _filter3.default)((0, _map3.default)((0, _get3.default)(item, 'measureFilters'), getFilterExpression), function (e) {
	        return !!e;
	    });

	    return 'SELECT ' + (aggregation ? aggregation + '([' + objectUri + '])' : '[' + objectUri + ']') + (notEmpty(where) ? ' WHERE ' + where.join(' AND ') : '');
	};

	var getPercentMetricExpression = function getPercentMetricExpression(_ref, measure) {
	    var category = _ref.category;

	    var metricExpressionWithoutFilters = 'SELECT [' + (0, _get3.default)(measure, 'objectUri') + ']';

	    if (isDerived(measure)) {
	        metricExpressionWithoutFilters = getGeneratedMetricExpression((0, _omit3.default)(measure, 'measureFilters'));
	    }

	    var attributeUri = (0, _get3.default)(category, 'attribute');
	    var whereFilters = (0, _filter3.default)((0, _map3.default)((0, _get3.default)(measure, 'measureFilters'), getFilterExpression), function (e) {
	        return !!e;
	    });
	    var whereExpression = notEmpty(whereFilters) ? ' WHERE ' + whereFilters.join(' AND ') : '';

	    return 'SELECT (' + metricExpressionWithoutFilters + whereExpression + ') / (' + metricExpressionWithoutFilters + ' BY ALL [' + attributeUri + ']' + whereExpression + ')';
	};

	var getPoPExpression = function getPoPExpression(attribute, metricExpression) {
	    var attributeUri = (0, _get3.default)(attribute, 'attribute');

	    return 'SELECT ' + metricExpression + ' FOR PREVIOUS ([' + attributeUri + '])';
	};

	var getGeneratedMetricHash = function getGeneratedMetricHash(title, format, expression) {
	    return (0, _md2.default)(expression + '#' + title + '#' + format);
	};

	var getGeneratedMetricIdentifier = function getGeneratedMetricIdentifier(item, aggregation, expressionCreator, hasher) {
	    var _get$split = (0, _get3.default)(item, 'objectUri').split('/'),
	        _get$split2 = _slicedToArray(_get$split, 6),
	        prjId = _get$split2[3],
	        id = _get$split2[5];

	    var identifier = prjId + '_' + id;
	    var hash = hasher(expressionCreator(item));
	    var hasNoFilters = (0, _isEmpty3.default)((0, _get3.default)(item, 'measureFilters', []));
	    var type = (0, _get3.default)(item, 'type');

	    var prefix = hasNoFilters || allFiltersEmpty(item) ? '' : 'filtered_';

	    return type + '_' + identifier + '.generated.' + prefix + aggregation + '.' + hash;
	};

	var isDateCategory = function isDateCategory(_ref2) {
	    var category = _ref2.category;
	    return category.type === 'date';
	};
	var isDateFilter = function isDateFilter(_ref3) {
	    var dateFilter = _ref3.dateFilter;
	    return dateFilter;
	};

	var getCategories = function getCategories(_ref4) {
	    var categories = _ref4.categories;
	    return categories;
	};
	var getFilters = function getFilters(_ref5) {
	    var filters = _ref5.filters;
	    return filters;
	};

	var getDateCategory = function getDateCategory(mdObj) {
	    var category = (0, _find3.default)(getCategories(mdObj), isDateCategory);

	    return (0, _get3.default)(category, 'category');
	};

	var getDateFilter = function getDateFilter(mdObj) {
	    var dateFilter = (0, _find3.default)(getFilters(mdObj), isDateFilter);

	    return (0, _get3.default)(dateFilter, 'dateFilter');
	};

	var getDate = function getDate(mdObj) {
	    return getDateCategory(mdObj) || getDateFilter(mdObj);
	};

	var getMetricSort = function getMetricSort(sort, isPoPMetric) {
	    if ((0, _isString3.default)(sort)) {
	        // TODO: backward compatibility, remove when not used plain "sort: asc | desc" in measures
	        return sort;
	    }

	    var sortByPoP = (0, _get3.default)(sort, 'sortByPoP');
	    if (isPoPMetric && sortByPoP || !isPoPMetric && !sortByPoP) {
	        return (0, _get3.default)(sort, 'direction');
	    }
	    return null;
	};

	var createPureMetric = function createPureMetric(measure, mdObj, measureIndex) {
	    return {
	        element: (0, _get3.default)(measure, 'objectUri'),
	        sort: getMetricSort((0, _get3.default)(measure, 'sort')),
	        meta: { measureIndex: measureIndex }
	    };
	};

	var createDerivedMetric = function createDerivedMetric(measure, mdObj, measureIndex) {
	    var format = measure.format,
	        sort = measure.sort;

	    var title = getBaseMetricTitle(measure.title);

	    var hasher = (0, _partial3.default)(getGeneratedMetricHash, title, format);
	    var aggregation = (0, _get3.default)(measure, 'aggregation', 'base').toLowerCase();
	    var element = getGeneratedMetricIdentifier(measure, aggregation, getGeneratedMetricExpression, hasher);
	    var definition = {
	        metricDefinition: {
	            identifier: element,
	            expression: getGeneratedMetricExpression(measure),
	            title: title,
	            format: format
	        }
	    };

	    return {
	        element: element,
	        definition: definition,
	        sort: getMetricSort(sort),
	        meta: {
	            measureIndex: measureIndex
	        }
	    };
	};

	var createContributionMetric = function createContributionMetric(measure, mdObj, measureIndex) {
	    var category = (0, _first3.default)(getCategories(mdObj));
	    var getMetricExpression = (0, _partial3.default)(getPercentMetricExpression, category);
	    var title = getBaseMetricTitle((0, _get3.default)(measure, 'title'));
	    var hasher = (0, _partial3.default)(getGeneratedMetricHash, title, CONTRIBUTION_METRIC_FORMAT);
	    return {
	        element: getGeneratedMetricIdentifier(measure, 'percent', getMetricExpression, hasher),
	        definition: {
	            metricDefinition: {
	                identifier: getGeneratedMetricIdentifier(measure, 'percent', getMetricExpression, hasher),
	                expression: getMetricExpression(measure),
	                title: title,
	                format: CONTRIBUTION_METRIC_FORMAT
	            }
	        },
	        sort: getMetricSort((0, _get3.default)(measure, 'sort')),
	        meta: {
	            measureIndex: measureIndex
	        }
	    };
	};

	var createPoPMetric = function createPoPMetric(measure, mdObj, measureIndex) {
	    var title = getPoPMetricTitle((0, _get3.default)(measure, 'title'));
	    var format = (0, _get3.default)(measure, 'format');
	    var hasher = (0, _partial3.default)(getGeneratedMetricHash, title, format);

	    var date = getDate(mdObj);

	    var generated = void 0;
	    var getMetricExpression = (0, _partial3.default)(getPoPExpression, date, '[' + (0, _get3.default)(measure, 'objectUri') + ']');

	    if (isDerived(measure)) {
	        generated = createDerivedMetric(measure, mdObj, measureIndex);
	        getMetricExpression = (0, _partial3.default)(getPoPExpression, date, '(' + (0, _get3.default)(generated, 'definition.metricDefinition.expression') + ')');
	    }

	    var identifier = getGeneratedMetricIdentifier(measure, 'pop', getMetricExpression, hasher);

	    var result = [{
	        element: identifier,
	        definition: {
	            metricDefinition: {
	                identifier: identifier,
	                expression: getMetricExpression(),
	                title: title,
	                format: format
	            }
	        },
	        sort: getMetricSort((0, _get3.default)(measure, 'sort'), true),
	        meta: {
	            measureIndex: measureIndex,
	            isPoP: true
	        }
	    }];

	    if (generated) {
	        result.push(generated);
	    } else {
	        result.push(createPureMetric(measure, mdObj, measureIndex));
	    }

	    return result;
	};

	var createContributionPoPMetric = function createContributionPoPMetric(measure, mdObj, measureIndex) {
	    var date = getDate(mdObj);

	    var generated = createContributionMetric(measure, mdObj, measureIndex);
	    var title = getPoPMetricTitle((0, _get3.default)(measure, 'title'));

	    var format = CONTRIBUTION_METRIC_FORMAT;
	    var hasher = (0, _partial3.default)(getGeneratedMetricHash, title, format);

	    var getMetricExpression = (0, _partial3.default)(getPoPExpression, date, '(' + (0, _get3.default)(generated, 'definition.metricDefinition.expression') + ')');

	    var identifier = getGeneratedMetricIdentifier(measure, 'pop', getMetricExpression, hasher);

	    var result = [{
	        element: identifier,
	        definition: {
	            metricDefinition: {
	                identifier: identifier,
	                expression: getMetricExpression(),
	                title: title,
	                format: format
	            }
	        },
	        sort: getMetricSort((0, _get3.default)(measure, 'sort'), true),
	        meta: {
	            measureIndex: measureIndex,
	            isPoP: true
	        }
	    }];

	    result.push(generated);

	    return result;
	};

	var categoryToElement = function categoryToElement(_ref6) {
	    var category = _ref6.category;
	    return { element: (0, _get3.default)(category, 'displayForm'), sort: (0, _get3.default)(category, 'sort') };
	};

	var attributeFilterToWhere = function attributeFilterToWhere(f) {
	    var elements = (0, _get3.default)(f, 'listAttributeFilter.default.attributeElements', []);
	    var elementsForQuery = (0, _map3.default)(elements, function (e) {
	        return { id: (0, _last3.default)(e.split('=')) };
	    });

	    var dfUri = (0, _get3.default)(f, 'listAttributeFilter.displayForm');
	    var negative = (0, _get3.default)(f, 'listAttributeFilter.default.negativeSelection');

	    return negative ? _defineProperty({}, dfUri, { $not: { $in: elementsForQuery } }) : _defineProperty({}, dfUri, { $in: elementsForQuery });
	};

	var dateFilterToWhere = function dateFilterToWhere(f) {
	    var dateUri = (0, _get3.default)(f, 'dateFilter.dimension') || (0, _get3.default)(f, 'dateFilter.dataSet') || (0, _get3.default)(f, 'dateFilter.dataset'); // dataset with lowercase 's' is deprecated; kept here for backwards compatibility
	    var granularity = (0, _get3.default)(f, 'dateFilter.granularity');
	    var between = [(0, _get3.default)(f, 'dateFilter.from'), (0, _get3.default)(f, 'dateFilter.to')];
	    return _defineProperty({}, dateUri, { $between: between, $granularity: granularity });
	};

	var isPoP = function isPoP(_ref10) {
	    var showPoP = _ref10.showPoP;
	    return showPoP;
	};
	var isContribution = function isContribution(_ref11) {
	    var showInPercent = _ref11.showInPercent;
	    return showInPercent;
	};

	var isCalculatedMeasure = function isCalculatedMeasure(_ref12) {
	    var type = _ref12.type;
	    return type === 'metric';
	};

	var rules = new _rules2.default();

	rules.addRule([isPoP, isContribution], createContributionPoPMetric);

	rules.addRule([isPoP], createPoPMetric);

	rules.addRule([isContribution], createContributionMetric);

	rules.addRule([isDerived], createDerivedMetric);

	rules.addRule([isCalculatedMeasure], createPureMetric);

	function getMetricFactory(measure) {
	    var factory = rules.match(measure);

	    (0, _invariant2.default)(factory, 'Unknown factory for: ' + measure);

	    return factory;
	}

	var isDateFilterExecutable = function isDateFilterExecutable(dateFilter) {
	    return (0, _get3.default)(dateFilter, 'from') !== undefined && (0, _get3.default)(dateFilter, 'to') !== undefined;
	};

	var isAttributeFilterExecutable = function isAttributeFilterExecutable(listAttributeFilter) {
	    return notEmpty((0, _get3.default)(listAttributeFilter, ['default', 'attributeElements']));
	};

	function getWhere(filters) {
	    var executableFilters = (0, _filter3.default)(filters, function (_ref13) {
	        var listAttributeFilter = _ref13.listAttributeFilter;
	        return isAttributeFilterExecutable(listAttributeFilter);
	    });
	    var attributeFilters = (0, _map3.default)(executableFilters, attributeFilterToWhere);
	    var dateFilters = (0, _map3.default)((0, _filter3.default)(filters, function (_ref14) {
	        var dateFilter = _ref14.dateFilter;
	        return isDateFilterExecutable(dateFilter);
	    }), dateFilterToWhere);

	    var resultDate = [].concat(_toConsumableArray(dateFilters)).reduce(_assign3.default, {});
	    var resultAttribute = {
	        $and: attributeFilters
	    };

	    return _extends({}, resultDate, resultAttribute);
	}

	var sortToOrderBy = function sortToOrderBy(item) {
	    return { column: (0, _get3.default)(item, 'element'), direction: (0, _get3.default)(item, 'sort') };
	};

	var getOrderBy = function getOrderBy(metrics, categories, type) {
	    // For bar chart we always override sorting to sort by values (first metric)
	    if (type === 'bar' && notEmpty(metrics)) {
	        return [{
	            column: (0, _first3.default)((0, _compact3.default)((0, _map3.default)(metrics, 'element'))),
	            direction: 'desc'
	        }];
	    }

	    return (0, _map3.default)((0, _filter3.default)([].concat(_toConsumableArray(categories), _toConsumableArray(metrics)), function (item) {
	        return item.sort;
	    }), sortToOrderBy);
	};

	var mdToExecutionConfiguration = exports.mdToExecutionConfiguration = function mdToExecutionConfiguration(mdObj) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var buckets = (0, _get3.default)(mdObj, 'buckets');
	    var measures = (0, _map3.default)(buckets.measures, function (_ref15) {
	        var measure = _ref15.measure;
	        return measure;
	    });
	    var metrics = (0, _flatten3.default)((0, _map3.default)(measures, function (measure, index) {
	        return getMetricFactory(measure)(measure, buckets, index);
	    }));

	    var categories = getCategories(buckets);
	    var filters = getFilters(buckets);
	    if (options.removeDateItems) {
	        categories = (0, _filter3.default)(categories, function (_ref16) {
	            var category = _ref16.category;
	            return category.type !== 'date';
	        });
	        filters = (0, _filter3.default)(filters, function (item) {
	            return !item.dateFilter;
	        });
	    }
	    categories = (0, _map3.default)(categories, categoryToElement);

	    var columns = (0, _compact3.default)((0, _map3.default)([].concat(_toConsumableArray(categories), _toConsumableArray(metrics)), 'element'));

	    return {
	        columns: columns,
	        orderBy: getOrderBy(metrics, categories, (0, _get3.default)(mdObj, 'type')),
	        definitions: (0, _definitions.sortDefinitions)((0, _compact3.default)((0, _map3.default)(metrics, 'definition'))),
	        where: columns.length ? getWhere(filters) : {},
	        metricMappings: (0, _map3.default)(metrics, function (m) {
	            return _extends({ element: m.element }, m.meta);
	        })
	    };
	};

	var getOriginalMetricFormats = function getOriginalMetricFormats(mdObj) {
	    // for metrics with showPoP or measureFilters.length > 0 roundtrip for original metric format
	    return Promise.all((0, _map3.default)((0, _map3.default)((0, _get3.default)(mdObj, 'buckets.measures'), function (_ref17) {
	        var measure = _ref17.measure;
	        return measure;
	    }), function (measure) {
	        if (measure.showPoP === true || measure.measureFilters.length > 0) {
	            return (0, _xhr.get)(measure.objectUri).then(function (obj) {
	                return _extends({}, measure, {
	                    format: (0, _get3.default)(obj, 'metric.content.format', measure.format)
	                });
	            });
	        }

	        return Promise.resolve(measure);
	    }));
	};

	var getDataForVis = exports.getDataForVis = function getDataForVis(projectId, mdObj, settings) {
	    return getOriginalMetricFormats(mdObj).then(function (measures) {
	        var metadata = mdObj;
	        metadata.buckets.measures = (0, _map3.default)(measures, function (measure) {
	            return { measure: measure };
	        });

	        var _mdToExecutionConfigu = mdToExecutionConfiguration(mdObj),
	            columns = _mdToExecutionConfigu.columns,
	            executionConfiguration = _objectWithoutProperties(_mdToExecutionConfigu, ['columns']);

	        return getData(projectId, columns, executionConfiguration, settings);
	    });
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(83),
	    baseDifference = __webpack_require__(84),
	    basePick = __webpack_require__(91),
	    flatRest = __webpack_require__(93),
	    getAllKeysIn = __webpack_require__(94),
	    toKey = __webpack_require__(95);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable string keyed properties of `object` that are
	 * not omitted.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(props, toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});

	module.exports = omit;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(85),
	    arrayIncludes = __webpack_require__(86),
	    arrayIncludesWith = __webpack_require__(88),
	    arrayMap = __webpack_require__(83),
	    baseUnary = __webpack_require__(89),
	    cacheHas = __webpack_require__(90);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(46);

	/**
	 * Casts `value` as an array if it's not one.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.4.0
	 * @category Lang
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast array.
	 * @example
	 *
	 * _.castArray(1);
	 * // => [1]
	 *
	 * _.castArray({ 'a': 1 });
	 * // => [{ 'a': 1 }]
	 *
	 * _.castArray('abc');
	 * // => ['abc']
	 *
	 * _.castArray(null);
	 * // => [null]
	 *
	 * _.castArray(undefined);
	 * // => [undefined]
	 *
	 * _.castArray();
	 * // => []
	 *
	 * var array = [1, 2, 3];
	 * console.log(_.castArray(array) === array);
	 * // => true
	 */
	function castArray() {
	  if (!arguments.length) {
	    return [];
	  }
	  var value = arguments[0];
	  return isArray(value) ? value : [value];
	}

	module.exports = castArray;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(87);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(87);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(92);

	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}

	module.exports = basePick;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(14);

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index],
	        value = object[key];

	    if (predicate(value, key)) {
	      baseAssignValue(result, key, value);
	    }
	  }
	  return result;
	}

	module.exports = basePickBy;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(70),
	    overRest = __webpack_require__(61),
	    setToString = __webpack_require__(63);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(59),
	    createWrap = __webpack_require__(97),
	    getHolder = __webpack_require__(99),
	    replaceHolders = __webpack_require__(100);

	/** Used to compose bitmasks for function metadata. */
	var PARTIAL_FLAG = 32;

	/**
	 * Creates a function that invokes `func` with `partials` prepended to the
	 * arguments it receives. This method is like `_.bind` except it does **not**
	 * alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.2.0
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * function greet(greeting, name) {
	 *   return greeting + ' ' + name;
	 * }
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // Partially applied with placeholders.
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = baseRest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partial));
	  return createWrap(func, PARTIAL_FLAG, undefined, partials, holders);
	});

	// Assign default placeholders.
	partial.placeholder = {};

	module.exports = partial;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(62),
	    createCtor = __webpack_require__(98),
	    root = __webpack_require__(31);

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartial;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(42),
	    isObject = __webpack_require__(43);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
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

	module.exports = createCtor;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(18),
	    copyObject = __webpack_require__(20),
	    createAssigner = __webpack_require__(58),
	    isArrayLike = __webpack_require__(50),
	    isPrototype = __webpack_require__(45),
	    keys = __webpack_require__(21);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	module.exports = assign;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
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
/* 103 */
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
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} predicate The predicate to negate.
	 * @returns {Function} Returns the new negated function.
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
	    var args = arguments;
	    switch (args.length) {
	      case 0: return !predicate.call(this);
	      case 1: return !predicate.call(this, args[0]);
	      case 2: return !predicate.call(this, args[0], args[1]);
	      case 3: return !predicate.call(this, args[0], args[1], args[2]);
	    }
	    return !predicate.apply(this, args);
	  };
	}

	module.exports = negate;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(46),
	    isObjectLike = __webpack_require__(53);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(28),
	    isArguments = __webpack_require__(48),
	    isArray = __webpack_require__(46),
	    isArrayLike = __webpack_require__(50),
	    isBuffer = __webpack_require__(47),
	    isPrototype = __webpack_require__(45),
	    nativeKeys = __webpack_require__(106);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
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
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' ||
	        typeof value.splice == 'function' || isBuffer(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !nativeKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(22);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.every` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if all elements pass the predicate check,
	 *  else `false`.
	 */
	function arrayEvery(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (!predicate(array[index], index, array)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = arrayEvery;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(110),
	    findIndex = __webpack_require__(112);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);

	module.exports = find;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(111),
	    isArrayLike = __webpack_require__(50),
	    keys = __webpack_require__(21);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}

	module.exports = createFind;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(113),
	    baseIteratee = __webpack_require__(111),
	    toInteger = __webpack_require__(77);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(115);


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Creates an array with all falsey values removed. The values `false`, `null`,
	 * `0`, `""`, `undefined`, and `NaN` are falsey.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to compact.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.compact([0, 1, false, 2, '', 3]);
	 * // => [1, 2, 3]
	 */
	function compact(array) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = compact;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(119),
	      utf8 = __webpack_require__(120).utf8,
	      isBuffer = __webpack_require__(121),
	      bin = __webpack_require__(120).bin,

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
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);

	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };

	})();


/***/ },
/* 119 */
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
/* 120 */
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
/* 121 */
/***/ function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(123)))

/***/ },
/* 123 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _every2 = __webpack_require__(107);

	var _every3 = _interopRequireDefault(_every2);

	var _find4 = __webpack_require__(109);

	var _find5 = _interopRequireDefault(_find4);

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _invariant = __webpack_require__(122);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rules = function () {
	    function Rules() {
	        _classCallCheck(this, Rules);

	        this.rules = [];
	    }

	    _createClass(Rules, [{
	        key: 'addRule',
	        value: function addRule(tests, callback) {
	            this.rules.push([tests, callback]);
	        }
	    }, {
	        key: 'match',
	        value: function match(subject) {
	            var _find2 = (0, _find5.default)(this.rules, function (_ref) {
	                var _ref2 = _slicedToArray(_ref, 1),
	                    tests = _ref2[0];

	                return (0, _every3.default)(tests, function (test) {
	                    return test(subject);
	                });
	            }),
	                _find3 = _slicedToArray(_find2, 2),
	                callback = _find3[1];

	            (0, _invariant2.default)(callback, 'Callback not found :-(');

	            return callback;
	        }
	    }]);

	    return Rules;
	}();

	exports.default = Rules;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _map2 = __webpack_require__(108);

	var _map3 = _interopRequireDefault(_map2);

	var _difference2 = __webpack_require__(126);

	var _difference3 = _interopRequireDefault(_difference2);

	exports.sortDefinitions = sortDefinitions;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var IDENTIFIER_REGEX = /{\S+}/g;

	function getDependencies(_ref) {
	    var metricDefinition = _ref.metricDefinition;

	    return (metricDefinition.expression.match(IDENTIFIER_REGEX) || []).map(function (s) {
	        return s.substring(1, s.length - 1);
	    });
	}

	function getIdentifier(_ref2) {
	    var metricDefinition = _ref2.metricDefinition;

	    return metricDefinition.identifier;
	}

	function resolvedDependencies(resolved, _ref3) {
	    var dependencies = _ref3.dependencies;

	    var identifiers = (0, _map3.default)(resolved, 'identifier');

	    return (0, _difference3.default)(dependencies, identifiers).length === 0;
	}

	function scan(resolved, unresolved) {
	    for (var i = 0; i < unresolved.length; i += 1) {
	        var tested = unresolved[i];

	        if (resolvedDependencies(resolved, tested)) {
	            resolved.push(tested);
	            unresolved.splice(i, 1);
	            i -= 1;
	        }
	    }
	}

	function sort(unresolved) {
	    var resolved = [];
	    var lastLength = void 0;

	    while (unresolved.length > 0) {
	        lastLength = unresolved.length;
	        scan(resolved, unresolved);

	        if (unresolved.length === lastLength) {
	            throw new Error('Metric defintions cannot be sorted due to missing dependencies.');
	        }
	    }

	    return resolved;
	}

	function sortDefinitions(definitions) {
	    var indexed = definitions.map(function (definition) {
	        return {
	            definition: definition,
	            identifier: getIdentifier(definition),
	            dependencies: getDependencies(definition)
	        };
	    });

	    return (0, _map3.default)(sort(indexed), 'definition');
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(84),
	    baseFlatten = __webpack_require__(71),
	    baseRest = __webpack_require__(59),
	    isArrayLikeObject = __webpack_require__(49);

	/**
	 * Creates an array of `array` values not included in the other given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * **Note:** Unlike `_.pullAll`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	    : [];
	});

	module.exports = difference;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCurrentProjectId = getCurrentProjectId;
	exports.getProjects = getProjects;
	exports.getDatasets = getDatasets;
	exports.getColorPalette = getColorPalette;
	exports.setColorPalette = setColorPalette;
	exports.getTimezone = getTimezone;
	exports.setTimezone = setTimezone;

	var _xhr = __webpack_require__(1);

	var _util = __webpack_require__(80);

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
	// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
	function getCurrentProjectId() {
	    return (0, _xhr.get)('/gdc/app/account/bootstrap').then(function (result) {
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
	    return (0, _xhr.get)('/gdc/account/profile/' + profileId + '/projects').then(function (r) {
	        return r.projects.map(function (p) {
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
	    return (0, _xhr.get)('/gdc/projects/' + projectId + '/styleSettings').then(function (result) {
	        return result.styleSettings.chartPalette.map(function (c) {
	            return {
	                r: c.fill.r,
	                g: c.fill.g,
	                b: c.fill.b
	            };
	        });
	    }, function (err) {
	        if (err.status === 200) {
	            return DEFAULT_PALETTE;
	        }

	        throw new Error(err.statusText);
	    });
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
	    return (0, _xhr.put)('/gdc/projects/' + projectId + '/styleSettings', {
	        data: {
	            styleSettings: {
	                chartPalette: colors.map(function (fill, idx) {
	                    return { fill: fill, guid: 'guid' + idx };
	                })
	            }
	        }
	    });
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
	    var bootstrapUrl = '/gdc/app/account/bootstrap?projectId=' + projectId;

	    return (0, _xhr.get)(bootstrapUrl).then(function (result) {
	        return result.bootstrapResource.current.timezone;
	    });
	}

	function setTimezone(projectId, timezone) {
	    var timezoneServiceUrl = '/gdc/md/' + projectId + '/service/timezone';
	    var data = {
	        service: { timezone: timezone }
	    };

	    return (0, _xhr.ajax)(timezoneServiceUrl, {
	        method: 'POST',
	        body: data
	    }).then(_xhr.parseJSON);
	}

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cloneDeep2 = __webpack_require__(129);

	var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

	var _omit2 = __webpack_require__(82);

	var _omit3 = _interopRequireDefault(_omit2);

	var _find2 = __webpack_require__(109);

	var _find3 = _interopRequireDefault(_find2);

	var _get2 = __webpack_require__(78);

	var _get3 = _interopRequireDefault(_get2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.loadItems = loadItems;
	exports.loadDateDataSets = loadDateDataSets;

	var _xhr = __webpack_require__(1);

	var _execution = __webpack_require__(81);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var REQUEST_DEFAULTS = {
	    types: ['attribute', 'metric', 'fact'],
	    paging: {
	        offset: 0
	    }
	};

	var LOAD_DATE_DATASET_DEFAULTS = {
	    includeUnavailableDateDataSetsCount: true,
	    includeAvailableDateAttributes: true
	};

	var parseCategories = function parseCategories(bucketItems) {
	    return (0, _get3.default)(bucketItems, 'categories').map(function (_ref) {
	        var category = _ref.category;
	        return {
	            category: _extends({}, category, {
	                displayForm: (0, _get3.default)(category, 'attribute')
	            })
	        };
	    });
	};

	function bucketItemsToExecConfig(bucketItems) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var categories = parseCategories(bucketItems);
	    var executionConfig = (0, _execution.mdToExecutionConfiguration)({
	        buckets: _extends({}, bucketItems, {
	            categories: categories
	        })
	    }, options);
	    var definitions = (0, _get3.default)(executionConfig, 'definitions');

	    return (0, _get3.default)(executionConfig, 'columns').map(function (column) {
	        var definition = (0, _find3.default)(definitions, function (_ref2) {
	            var metricDefinition = _ref2.metricDefinition;
	            return (0, _get3.default)(metricDefinition, 'identifier') === column;
	        });
	        var maql = (0, _get3.default)(definition, 'metricDefinition.expression');

	        if (maql) {
	            return maql;
	        }
	        return column;
	    });
	}

	/**
	 * Convert specific params in options to "requiredDataSets" structure. For more details look into
	 * res file https://github.com/gooddata/gdc-bear/blob/develop/resources/specification/internal/catalog.res
	 *
	 * @param options Supported keys in options are:
	 * <ul>
	 * <li>dataSetIdentifier - in value is string identifier of dataSet - this leads to CUSTOM type
	 * <li>returnAllDateDataSets - true value means to return ALL values without dataSet differentiation
	 * <li>returnAllRelatedDateDataSets - only related date dataSets are loaded across all dataSets
	 * <li>by default we get PRODUCTION dataSets
	 * </ul>
	 * @returns {Object} "requiredDataSets" object hash.
	 */
	var getRequiredDataSets = function getRequiredDataSets(options) {
	    if ((0, _get3.default)(options, 'returnAllRelatedDateDataSets')) {
	        return {};
	    }

	    if ((0, _get3.default)(options, 'returnAllDateDataSets')) {
	        return { requiredDataSets: { type: 'ALL' } };
	    }

	    if ((0, _get3.default)(options, 'dataSetIdentifier')) {
	        return { requiredDataSets: {
	                type: 'CUSTOM',
	                customIdentifiers: [(0, _get3.default)(options, 'dataSetIdentifier')]
	            } };
	    }

	    return { requiredDataSets: { type: 'PRODUCTION' } };
	};

	function loadCatalog(projectId, catalogRequest) {
	    var uri = '/gdc/internal/projects/' + projectId + '/loadCatalog';

	    return (0, _xhr.post)(uri, { data: { catalogRequest: catalogRequest } }).then(_xhr.parseJSON).then(function (data) {
	        return data.catalogResponse;
	    });
	}

	function loadItems(projectId) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var request = (0, _omit3.default)(_extends({}, REQUEST_DEFAULTS, options, getRequiredDataSets(options)), ['dataSetIdentifier', 'returnAllDateDataSets']);

	    var bucketItems = (0, _get3.default)((0, _cloneDeep3.default)(options), 'bucketItems.buckets');
	    if (bucketItems) {
	        bucketItems = bucketItemsToExecConfig(bucketItems);
	        return loadCatalog(projectId, _extends({}, request, {
	            bucketItems: bucketItems
	        }));
	    }

	    return loadCatalog(projectId, request);
	}

	function requestDateDataSets(projectId, dateDataSetsRequest) {
	    var uri = '/gdc/internal/projects/' + projectId + '/loadDateDataSets';

	    return (0, _xhr.post)(uri, { data: { dateDataSetsRequest: dateDataSetsRequest } }).then(_xhr.parseJSON).then(function (data) {
	        return data.dateDataSetsResponse;
	    });
	}

	function loadDateDataSets(projectId, options) {
	    var bucketItems = (0, _get3.default)((0, _cloneDeep3.default)(options), 'bucketItems.buckets');

	    if (bucketItems) {
	        bucketItems = bucketItemsToExecConfig(bucketItems, { removeDateItems: true });
	    }

	    var request = (0, _omit3.default)(_extends({}, LOAD_DATE_DATASET_DEFAULTS, REQUEST_DEFAULTS, options, getRequiredDataSets(options), {
	        bucketItems: bucketItems
	    }), ['filter', 'types', 'paging', 'dataSetIdentifier', 'returnAllDateDataSets', 'returnAllRelatedDateDataSets']);

	    return requestDateDataSets(projectId, request);
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(17);

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true, true);
	}

	module.exports = cloneDeep;


/***/ }
/******/ ])
});
;