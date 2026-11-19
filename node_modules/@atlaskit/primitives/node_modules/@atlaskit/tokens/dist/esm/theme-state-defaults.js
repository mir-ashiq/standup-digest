/**
 * Can't evaluate typography feature flags at the module level,
 * it will always resolve to false when server side rendered or when flags are loaded async.
 */

function getMotionDefault() {
  return 'motion';
}

/**
 * themeStateDefaults: the default values for ThemeState used by theming utilities
 */
export var themeStateDefaults = {
  colorMode: 'auto',
  contrastMode: 'auto',
  dark: 'dark',
  light: 'light',
  shape: 'shape',
  spacing: 'spacing',
  typography: 'typography',
  motion: getMotionDefault,
  UNSAFE_themeOptions: undefined
};