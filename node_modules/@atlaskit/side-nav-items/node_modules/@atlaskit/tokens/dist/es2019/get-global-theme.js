import { COLOR_MODE_ATTRIBUTE, THEME_DATA_ATTRIBUTE } from './constants';
import { isThemeColorMode } from './is-theme-color-mode';
import { themeStringToObject } from './theme-string-to-object';
const getGlobalTheme = () => {
  if (typeof document === 'undefined') {
    return {};
  }
  const element = document.documentElement;
  const colorMode = element.getAttribute(COLOR_MODE_ATTRIBUTE) || '';
  const theme = element.getAttribute(THEME_DATA_ATTRIBUTE) || '';
  return {
    ...themeStringToObject(theme),
    ...(isThemeColorMode(colorMode) && {
      colorMode
    })
  };
};
export { getGlobalTheme };