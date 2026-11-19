import { themeColorModes } from './theme-color-modes';
export const isThemeColorMode = colorMode => {
  return themeColorModes.find(mode => mode === colorMode) !== undefined;
};