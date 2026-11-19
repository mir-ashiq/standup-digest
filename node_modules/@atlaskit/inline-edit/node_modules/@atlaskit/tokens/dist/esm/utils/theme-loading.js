import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { CUSTOM_THEME_ATTRIBUTE, THEME_DATA_ATTRIBUTE } from '../constants';
import { loadThemeCss } from './load-theme-css';
export var loadAndAppendThemeCss = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(themeId, preloadedThemeCss) {
    var themeCss, style, _t;
    return _regeneratorRuntime.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!document.head.querySelector("style[".concat(THEME_DATA_ATTRIBUTE, "=\"").concat(themeId, "\"]:not([").concat(CUSTOM_THEME_ATTRIBUTE, "])"))) {
            _context.next = 1;
            break;
          }
          return _context.abrupt("return");
        case 1:
          if (themeId) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          if (!(preloadedThemeCss !== null && preloadedThemeCss !== void 0)) {
            _context.next = 3;
            break;
          }
          _t = preloadedThemeCss;
          _context.next = 5;
          break;
        case 3:
          _context.next = 4;
          return loadThemeCss(themeId);
        case 4:
          _t = _context.sent;
        case 5:
          themeCss = _t;
          style = document.createElement('style');
          style.textContent = themeCss;
          style.dataset.theme = themeId;
          document.head.appendChild(style);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function loadAndAppendThemeCss(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
export var darkModeMediaQuery = '(prefers-color-scheme: dark)';
export var moreContrastMediaQuery = '(prefers-contrast: more)';