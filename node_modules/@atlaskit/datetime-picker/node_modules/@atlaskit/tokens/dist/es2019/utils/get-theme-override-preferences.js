import { fg } from '@atlaskit/platform-feature-flags/fg';
import getIncreasedContrastTheme from './get-increased-contrast-theme';
const finesseOverrides = {
  light: 'light-finesse',
  'light-increased-contrast': 'light-increased-contrast-finesse',
  dark: 'dark-finesse',
  'dark-increased-contrast': 'dark-increased-contrast-finesse',
  typography: 'typography-finesse'
};
export const getThemeOverridePreferences = themeState => {
  if (!fg('platform-dst-tokens-finesse')) {
    return [];
  }
  const {
    colorMode,
    contrastMode,
    dark,
    light,
    typography
  } = themeState;
  const selectedThemes = [...(colorMode === 'auto' ? [light, dark] : [themeState[colorMode]]), typography];
  if (contrastMode !== 'no-preference' && fg('platform_increased-contrast-themes')) {
    selectedThemes.forEach(themeId => {
      const increasedContrastTheme = getIncreasedContrastTheme(themeId);
      if (increasedContrastTheme) {
        selectedThemes.push(increasedContrastTheme);
      }
    });
  }
  const themeOverridePreferences = selectedThemes.map(themeId => finesseOverrides[themeId]).filter(themeId => themeId !== undefined);
  return [...new Set(themeOverridePreferences)];
};