import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { fg } from '@atlaskit/platform-feature-flags/fg';
import getIncreasedContrastTheme from './get-increased-contrast-theme';
var finesseOverrides = {
  light: 'light-finesse',
  'light-increased-contrast': 'light-increased-contrast-finesse',
  dark: 'dark-finesse',
  'dark-increased-contrast': 'dark-increased-contrast-finesse',
  typography: 'typography-finesse'
};
export var getThemeOverridePreferences = function getThemeOverridePreferences(themeState) {
  if (!fg('platform-dst-tokens-finesse')) {
    return [];
  }
  var colorMode = themeState.colorMode,
    contrastMode = themeState.contrastMode,
    dark = themeState.dark,
    light = themeState.light,
    typography = themeState.typography;
  var selectedThemes = [].concat(_toConsumableArray(colorMode === 'auto' ? [light, dark] : [themeState[colorMode]]), [typography]);
  if (contrastMode !== 'no-preference' && fg('platform_increased-contrast-themes')) {
    selectedThemes.forEach(function (themeId) {
      var increasedContrastTheme = getIncreasedContrastTheme(themeId);
      if (increasedContrastTheme) {
        selectedThemes.push(increasedContrastTheme);
      }
    });
  }
  var themeOverridePreferences = selectedThemes.map(function (themeId) {
    return finesseOverrides[themeId];
  }).filter(function (themeId) {
    return themeId !== undefined;
  });
  return _toConsumableArray(new Set(themeOverridePreferences));
};