import { themeColorModes } from './theme-color-modes';
export var isThemeColorMode = function isThemeColorMode(colorMode) {
  return themeColorModes.find(function (mode) {
    return mode === colorMode;
  }) !== undefined;
};