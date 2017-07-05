(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Core"] = factory(require("react"));
	else
		root["Core"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.state = {
      height: 0
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: "updateHeight",
    value: function updateHeight(node) {
      if (node && node.offsetHeight !== this.state.height) {
        this.setState({ height: node.offsetHeight });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.props.active) {
        return null;
      }

      var width = 200;
      var leftMax = window.innerWidth - width;

      var coloring = {};
      switch (this.props.colorScheme) {
        case "light":
          coloring.backgroundColor = "#ffffff";
          coloring.borderColor = "#DCDCDC";
          coloring.fontColor = "#000000";
          break;
        case "dark":
          coloring.backgroundColor = "#181818";
          coloring.borderColor = "#585858";
          coloring.fontColor = "#ffffff";
          break;
        default:
          coloring.backgroundColor = this.props.backgroundColor;
          coloring.borderColor = this.props.borderColor;
          coloring.fontColor = this.props.fontColor;
          break;
      }

      var style = {
        outer: {
          zIndex: "1",
          position: "absolute"
        },
        inner: {
          display: "inline-block",
          position: "absolute",
          width: width,
          textAlign: "center",
          padding: this.props.padding,
          backgroundColor: coloring.backgroundColor,
          border: "1px solid",
          borderColor: coloring.borderColor,
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.25)",
          color: coloring.fontColor
        },
        svgWrapper: {
          display: "inline-block",
          position: "absolute"
        },
        triangle: {
          fill: coloring.borderColor,
          stroke: coloring.borderColor,
          strokeWidth: "1"
        }
      };

      var svgHeight = void 0;
      var svgWidth = void 0;
      var svgStyle = void 0;
      var transform = void 0;

      if (this.props.align === "top" || this.props.align === "bottom") {
        style.outer.width = width;
        style.outer.height = this.state.height + 5;
        style.outer.left = Math.min(leftMax, Math.max(0, this.props.x - width / 2));
        style.svgWrapper.width = width;
        style.svgWrapper.height = 5;
        style.svgWrapper.textAlign = "center";
        svgHeight = 5;
        svgWidth = 10;
      } else {
        /* this.props.align === "right" or "left" */
        style.outer.width = width + 5;
        style.outer.height = this.state.height;
        style.outer.top = this.props.y - this.state.height / 2;
        style.inner.top = 0;
        style.svgWrapper.width = 5;
        style.svgWrapper.height = this.state.height;
        svgHeight = 10;
        svgWidth = 5;
        svgStyle = {
          position: "absolute",
          top: this.state.height / 2 - 5
        };
      }

      switch (this.props.align) {
        case "top":
          style.outer.bottom = window.innerHeight - this.props.y;
          style.inner.top = 0;
          style.svgWrapper.bottom = 0;
          break;
        case "bottom":
          style.outer.top = this.props.y;
          style.inner.bottom = 0;
          style.svgWrapper.top = 0;
          transform = "rotate(180,5,5) translate(0,5)";
          break;
        case "right":
          style.outer.left = Math.min(leftMax, Math.max(0, this.props.x));
          style.inner.right = 0;
          style.svgWrapper.left = 0;
          transform = "rotate(90,5,5) translate(0,5)";
          break;
        case "left":
          style.outer.left = Math.min(leftMax, Math.max(0, this.props.x - width));
          style.inner.left = 0;
          style.svgWrapper.right = 0;
          transform = "rotate(270,5,5)";
          break;
        default:
          console.log("invalid align argument");
          return null;
      }

      return _react2.default.createElement(
        "div",
        { style: style.outer },
        _react2.default.createElement(
          "div",
          { ref: function ref(node) {
              return _this2.updateHeight(node);
            }, style: style.inner },
          this.props.contents
        ),
        _react2.default.createElement(
          "div",
          { style: style.svgWrapper },
          _react2.default.createElement(
            "svg",
            { height: svgHeight, width: svgWidth, style: svgStyle },
            _react2.default.createElement("polygon", { points: "0,0 5,5 10,0", style: style.triangle,
              transform: transform })
          )
        )
      );
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.defaultProps = {
  width: 200,
  padding: 10,
  backgroundColor: "#181818",
  fontColor: "#ffffff",
  borderColor: "#585858",
  active: true,
  align: "top"
};

exports.default = Tooltip;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tooltip = __webpack_require__(0);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tooltip2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});