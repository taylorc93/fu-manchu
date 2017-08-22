/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(23)('wks')
  , uid        = __webpack_require__(24)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(19);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEFAULT_OPENING_RE = /\{\{/;
const DEFAULT_CLOSING_RE = /\s*\}\}/;
const DEFAULT_NEWLINE_CLOSING_RE = /\s*\}\}(\n?)/;
const TAG_RE = /#|\^|\/|>|\{|&|=|!/;

const TEXT_TAG = `text`;
const VARIABLE_TAG = `variable`;
const SECTION_TAG = `#`;
const CLOSING_TAG = `/`;
const PARTIAL_TAG = `>`;
const INVERTED_TAG = `^`;
const COMMENT_TAG = `!`;
const DELIMITER_TAG = `=`;

/* harmony default export */ __webpack_exports__["a"] = ({
  // Regex constants
  DEFAULT_OPENING_RE,
  DEFAULT_CLOSING_RE,
  DEFAULT_NEWLINE_CLOSING_RE,
  TAG_RE,

  // Tag type constants
  TEXT_TAG,
  VARIABLE_TAG,
  SECTION_TAG,
  CLOSING_TAG,
  PARTIAL_TAG,
  INVERTED_TAG,
  COMMENT_TAG,
  DELIMITER_TAG,

  // Conveniences
  ALL_TAGS: [TEXT_TAG, VARIABLE_TAG, SECTION_TAG, CLOSING_TAG, PARTIAL_TAG, INVERTED_TAG, COMMENT_TAG, DELIMITER_TAG],
  DEFAULT_REGEXPS: [DEFAULT_OPENING_RE, DEFAULT_CLOSING_RE, DEFAULT_NEWLINE_CLOSING_RE]
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(41)
  , toPrimitive    = __webpack_require__(42)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(21)
  , defined = __webpack_require__(13);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys')
  , uid    = __webpack_require__(24);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(50);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(64);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(2)
  , ctx       = __webpack_require__(39)
  , hide      = __webpack_require__(3)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(44)
  , enumBugKeys = __webpack_require__(25);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(13);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
var global        = __webpack_require__(1)
  , hide          = __webpack_require__(3)
  , Iterators     = __webpack_require__(4)
  , TO_STRING_TAG = __webpack_require__(0)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(55)
  , $export        = __webpack_require__(17)
  , redefine       = __webpack_require__(56)
  , hide           = __webpack_require__(3)
  , has            = __webpack_require__(7)
  , Iterators      = __webpack_require__(4)
  , $iterCreate    = __webpack_require__(57)
  , setToStringTag = __webpack_require__(29)
  , getPrototypeOf = __webpack_require__(61)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f
  , has = __webpack_require__(7)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(62)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(28)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render__ = __webpack_require__(34);




const readTemplate = templateId => {
  return __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFileSync(`./tests/${templateId}`, { encoding: `utf8` });
};

const main = () => {
  const template = readTemplate(`basic.txt`);
  const partialLoader = t => {
    if (t === `basicPartial`) {
      return `I am a partial`;
    }
    return `{{text}}`;
  };

  const renderedText = __WEBPACK_IMPORTED_MODULE_1__render__["a" /* default */](template, {
    variable: `foobar`,
    variable2: 1234,
    arraySection: [{ sectionVar: `whos` }, { sectionVar: `on` }, { sectionVar: `first` }],
    emptySection: [],
    indentedVariable: `I am indented`,
    booleanSection: true,
    functionSection: () => {
      return (text, r, context) => {
        return r(text, context, partialLoader);
      };
    },
    anotherFunction: () => {
      return () => `function return`;
    },
    objectSection: {
      text: `Hello world!`,
      nested: {
        foo: `bar`
      }
    },
    text: `Partial text`
  }, partialLoader);

  console.log(renderedText);
};

main();

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parse__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_constants__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_isArray__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_isBoolean__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_isFunction__ = __webpack_require__(75);


/**
 * render.js
 * Written by: Connor Taylor
 */






const TEXT_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].TEXT_TAG,
      VARIABLE_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].VARIABLE_TAG,
      SECTION_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].SECTION_TAG,
      CLOSING_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].CLOSING_TAG,
      PARTIAL_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].PARTIAL_TAG,
      INVERTED_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].INVERTED_TAG,
      COMMENT_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].COMMENT_TAG,
      DELIMITER_TAG = __WEBPACK_IMPORTED_MODULE_3__utils_constants__["a" /* default */].DELIMITER_TAG;


const HANDLER_MAPPINGS = {
  [TEXT_TAG]: ({ tokens, renderedStr }) => ({
    renderedStr: `${renderedStr}${tokens[0].rawContents}`
  }),
  [VARIABLE_TAG]: ({ tokens, renderedStr, context }) => {
    var _tokens = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default.a(tokens, 1);

    const token = _tokens[0];


    return {
      renderedStr: token.context ? `${renderedStr}${token.context[token.key]}` : `${renderedStr}${context[token.key]}`
    };
  },
  [SECTION_TAG]: config => {
    const tokens = config.tokens,
          contextPath = config.contextPath,
          context = config.context,
          renderedStr = config.renderedStr;

    const newContext = context[tokens[0].key];
    const closingTagIndex = tokens.findIndex(t => t.type === CLOSING_TAG);
    const tokensInSection = tokens.slice(1, closingTagIndex);

    if (__WEBPACK_IMPORTED_MODULE_4__utils_isArray__["a" /* default */](newContext)) {
      return {
        tokens: [...newContext.reduce((accum, ctx) => {
          return [...accum, ...tokensInSection.map(t => __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default.a({}, t, {
            context: ctx
          }))];
        }, []), ...tokens.slice(closingTagIndex)],
        contextPath: [...contextPath, tokens[0].key]
      };
    } else if (__WEBPACK_IMPORTED_MODULE_5__utils_isBoolean__["a" /* default */](newContext)) {
      return newContext ? { contextPath: [...contextPath, tokens[0].key] } : { tokens: tokens.slice(closingTagIndex) };
    } else if (__WEBPACK_IMPORTED_MODULE_6__utils_isFunction__["a" /* default */](newContext)) {
      const text = tokensInSection.reduce((str, t) => {
        return `${str}${t.rawContents}`;
      }, ``);

      const renderedText = newContext()(text, render, context); // eslint-disable-line

      return {
        tokens: tokens.slice(closingTagIndex),
        contextPath: [...contextPath, tokens[0].key],
        renderedStr: `${renderedStr}${renderedText}`
      };
    }

    return {
      contextPath: [...contextPath, tokens[0].key]
    };
  },
  [INVERTED_TAG]: ({ tokens, contextPath, context }) => {
    const newContext = context[tokens[0].key];
    const closingTagIndex = tokens.findIndex(t => t.type === CLOSING_TAG);

    return newContext ? { tokens: tokens.slice(closingTagIndex) } : { contextPath: [...contextPath, tokens[0].key] };
  },
  [PARTIAL_TAG]: ({ tokens, context, renderedStr }, partialLoader) => {
    const renderedPartial = render( // eslint-disable-line
    partialLoader(tokens[0].key, context), context, partialLoader);

    return {
      renderedStr: `${renderedStr}${renderedPartial}`
    };
  },
  [CLOSING_TAG]: ({ contextPath }) => ({
    contextPath: contextPath.slice(1)
  }),
  [COMMENT_TAG]: () => ({}),
  [DELIMITER_TAG]: () => ({})
};

const render = (template, context = {}, partialLoader) => {
  // TODO: Add caching logic to prevent reparsing when possible
  const processTokens = config => {
    const tokens = config.tokens,
          contextPath = config.contextPath,
          renderedStr = config.renderedStr;

    var _tokens2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default.a(tokens, 1);

    const token = _tokens2[0];


    if (!token) {
      return renderedStr;
    }

    const currentContext = contextPath.reduce((ctx, k) => {
      if (!ctx) {
        throw new Error(`Context lookup failed for ${token.rawContents}`);
      }

      return ctx[k];
    }, context);

    const handler = HANDLER_MAPPINGS[token.type];
    const configChanges = handler(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default.a({}, config, { context: currentContext }), partialLoader);

    return processTokens(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default.a({}, config, {
      tokens: tokens.slice(1)
    }, configChanges));
  };

  return processTokens({
    tokens: __WEBPACK_IMPORTED_MODULE_2__parse__["a" /* default */](template),
    contextPath: [],
    renderedStr: ``
  });
};

/* harmony default export */ __webpack_exports__["a"] = (render);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(36);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
module.exports = __webpack_require__(2).Object.assign;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(17);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(43)});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(40);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(11)(function(){
  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(20)
  , gOPS     = __webpack_require__(48)
  , pIE      = __webpack_require__(49)
  , toObject = __webpack_require__(26)
  , IObject  = __webpack_require__(21)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(7)
  , toIObject    = __webpack_require__(12)
  , arrayIndexOf = __webpack_require__(45)(false)
  , IE_PROTO     = __webpack_require__(15)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(46)
  , toIndex   = __webpack_require__(47);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(14)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(30);
module.exports = __webpack_require__(63);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(53)
  , step             = __webpack_require__(54)
  , Iterators        = __webpack_require__(4)
  , toIObject        = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(28)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(58)
  , descriptor     = __webpack_require__(19)
  , setToStringTag = __webpack_require__(29)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(3)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(5)
  , dPs         = __webpack_require__(59)
  , enumBugKeys = __webpack_require__(25)
  , IE_PROTO    = __webpack_require__(15)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(18)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(60).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(9)
  , anObject = __webpack_require__(5)
  , getKeys  = __webpack_require__(20);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(7)
  , toObject    = __webpack_require__(26)
  , IE_PROTO    = __webpack_require__(15)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14)
  , defined   = __webpack_require__(13);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(31)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(4);
module.exports = __webpack_require__(2).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(30);
module.exports = __webpack_require__(66);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5)
  , get      = __webpack_require__(67);
module.exports = __webpack_require__(2).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(31)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(4);
module.exports = __webpack_require__(2).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_constants__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tokens_createTextToken__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tokens_createTagToken__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tags_getNewTagRegExps__ = __webpack_require__(71);

/**
 * parse.js
 * Written by: Connor Taylor
 */





const DELIMITER_TAG = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* default */].DELIMITER_TAG,
      DEFAULT_REGEXPS = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* default */].DEFAULT_REGEXPS,
      TEXT_TAG = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* default */].TEXT_TAG;


/* harmony default export */ __webpack_exports__["a"] = (template => {
  const parse = (str, tokens, tags) => {
    var _tags = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default.a(tags, 1);

    const openingRe = _tags[0];

    const openingMatch = str.match(openingRe);

    if (!openingMatch) {
      // Get any text that might be after the last tag
      const text = __WEBPACK_IMPORTED_MODULE_2__tokens_createTextToken__["a" /* default */](str, str.length);
      return [...tokens, text];
    }

    const text = __WEBPACK_IMPORTED_MODULE_2__tokens_createTextToken__["a" /* default */](str, openingMatch.index);
    const token = __WEBPACK_IMPORTED_MODULE_3__tokens_createTagToken__["a" /* default */](str.slice(openingMatch.index), tags);

    // Remove the text and tag contents to process the next part of the string
    const remainingStr = str.replace(text.rawContents, ``).replace(token.rawContents, ``);

    // If we encountered a delimiter tag, we need to update the tag regexps
    // accordingly
    const newTags = token.type === DELIMITER_TAG ? __WEBPACK_IMPORTED_MODULE_4__tags_getNewTagRegExps__["a" /* default */](token.key) : tags;

    return parse(remainingStr, [...tokens, text, token], newTags);
  };

  const allTokens = parse(template, [], DEFAULT_REGEXPS);

  // Remove any empty string text tags that may have been created
  return allTokens.filter(({ type, rawContents }) => {
    return type !== TEXT_TAG || rawContents !== ``;
  });
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_constants__ = __webpack_require__(8);
/**
 * createTextToken.js
 * Written by: Connor Taylor
 */


/* Creates a new text token of all chars before a match was found */
const createTextToken = (str, endIndex) => ({
  type: __WEBPACK_IMPORTED_MODULE_0__utils_constants__["a" /* default */].TEXT_TAG,
  rawContents: str.slice(0, endIndex),
  key: ``
});

/* harmony default export */ __webpack_exports__["a"] = (createTextToken);

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_constants__ = __webpack_require__(8);

/**
 * createTagToken.js
 * Written by: Connor Taylor
 */


const TAG_RE = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* default */].TAG_RE,
      VARIABLE_TAG = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* default */].VARIABLE_TAG,
      PARTIAL_TAG = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* default */].PARTIAL_TAG;
/* Given a string and a set of regexes to match on, creates a new tag token
 * by parsing the string properly. Expects the provided string to match the
 * opening regex (ie. /\{\{/ by default)
 */

const createTagToken = (str, tagRegexes) => {
  var _tagRegexes = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default.a(tagRegexes, 3);

  const openingRegExp = _tagRegexes[0],
        closingRegExp = _tagRegexes[1],
        newlineClosingRegExp = _tagRegexes[2];

  const openingMatch = str.match(openingRegExp);
  const openRemovedStr = str.slice(openingMatch[0].length);
  const tagMatch = openRemovedStr.match(TAG_RE);
  const type = tagMatch && tagMatch.index === 0 ? openRemovedStr.slice(0, 1) : VARIABLE_TAG;

  // Unless we have a variable or partial tag, we want to remove a newline
  // if there's one at the end of a tag
  const shouldRemoveNewLine = type !== VARIABLE_TAG && type !== PARTIAL_TAG;

  const closingMatch = str.match(shouldRemoveNewLine ? newlineClosingRegExp : closingRegExp);

  if (closingMatch) {
    const rawContents = str.slice(0, closingMatch.index + closingMatch[0].length);

    // If we have a variable tag, we don't want to replace TAG_RE since it
    // may remove part of a custom delimiter. 
    const key = rawContents.replace(openingRegExp, ``).replace(type !== VARIABLE_TAG ? TAG_RE : ``, ``).replace(closingRegExp, ``).trim();

    // If there is still an opening tag in the tag contents, then the tag was
    // not closed properly (ie. a new tag was started before closing the
    // previous one)
    if (key.match(openingRegExp)) {
      throw new Error(`Unclosed tag: ${rawContents}`);
    }

    return { type, rawContents, key };
  }

  var _str$split = str.split(`\n`),
      _str$split2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default.a(_str$split, 1);

  const badLine = _str$split2[0];

  throw new Error(`Unclosed tag: ${badLine}`);
};

/* harmony default export */ __webpack_exports__["a"] = (createTagToken);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_escapeRegExp__ = __webpack_require__(72);
/**
 * getNewTagRegExps.js
 * Written by: Connor Taylor
 */


const getNewTagRegExps = delimiterTagContents => {
  const newTags = delimiterTagContents.split(` `);
  if (newTags.length !== 2) {
    throw new Error(`Set delimter tag contains invalid number of tags. It must be 2 (opening and closing), you included ${newTags.length}`);
  }

  return [new RegExp(__WEBPACK_IMPORTED_MODULE_0__utils_escapeRegExp__["a" /* default */](newTags[0])), new RegExp(`\\s*${__WEBPACK_IMPORTED_MODULE_0__utils_escapeRegExp__["a" /* default */](newTags[1])}`), new RegExp(`\\s*${__WEBPACK_IMPORTED_MODULE_0__utils_escapeRegExp__["a" /* default */](newTags[1])}\\n`)];
};

/* harmony default export */ __webpack_exports__["a"] = (getNewTagRegExps);

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * escapeRegExp.js
 * Written by: Connor Taylor
 */

/* Given an input string, escapes all special characters such that when the new
 * string is passed to the RegExp constructor, it will search for the specific
 * character instead of treating it as a special character.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

/* harmony default export */ __webpack_exports__["a"] = (escapeRegExp);

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * isArray.js
 * Written by: Connor Taylor
 */

/* Checks if a value is an array. */
const isArray = x => Array.isArray(x);

/* harmony default export */ __webpack_exports__["a"] = (isArray);

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * isBoolean.js
 * Written by: Connor Taylor
 */

const isBoolean = x => typeof x === `boolean`;

/* harmony default export */ __webpack_exports__["a"] = (isBoolean);

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* @flow */
/**
 * isFunction.js
 * Written by: Connor Taylor
 */

/* Checks if a variable is a function */
const isFunction = x => typeof x === `function`;

/* harmony default export */ __webpack_exports__["a"] = (isFunction);

/***/ })
/******/ ]);