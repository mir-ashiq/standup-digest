/**
 * Inputs for the dynamic colour themes. Every colour token is derived from these two colours.
 */

/**
 * Typed inputs for the experimental semantic spacing theme.
 */

/**
 * Optional unitless multipliers for individual heading sizes, applied on top of `dynamicFontScale`.
 * Each defaults to `1`, e.g. `dynamicFontHeadingXxlargeScale: 1.5` makes only `xxlarge` headings
 * larger.
 */

/**
 * Optional line-height multipliers for individual heading sizes, applied on top of font, heading
 * and global line-height scales without changing font sizes. Each defaults to `1`.
 */

/**
 * The variable contract for custom themes that support runtime overrides.
 *
 * Add a theme here when it is introduced. Its theme dimensions and required override values are
 * then shared by TypeScript consumers.
 */

/**
 * A theme configuration that can provide typed overrides alongside a custom theme ID.
 *
 * @example
 * ```tsx
 * <AppProvider defaultTheme={{
 * 		light: {
 * 			id: 'UNSAFE-dynamic',
 * 			overrides: { dynamicForeground: '#172b4d', dynamicBackground: '#ffffff' },
 * 		},
 * 		dark: {
 * 			id: 'UNSAFE-dynamic-dark',
 * 			overrides: { dynamicForeground: '#ffffff', dynamicBackground: '#1d2125' },
 * 		},
 * 	}}
 * />
 * ```
 */

/**
 * Custom CSS variable overrides grouped by the theme dimension and theme ID they apply to.
 */

function isThemeWithOverrides(value) {
  return typeof value === 'object' && value !== null && 'id' in value && 'overrides' in value && typeof value.id === 'string' && typeof value.overrides === 'object' && value.overrides !== null;
}

/**
 * Marks a subtree theme element with its provider's scope, so its override styles only match that
 * element.
 */
export const CUSTOM_THEME_SCOPE_ATTRIBUTE = 'data-theme-overrides-scope';

/**
 * Separates custom theme override values from the plain theme IDs consumed by the theme runtime.
 *
 * Pass a `scope` for subtree themes. The override selector then only matches the element carrying
 * `CUSTOM_THEME_SCOPE_ATTRIBUTE` with that value, so sibling subtrees using the same custom theme
 * with different values don't overwrite each other. Without a scope, the styles target `html` and
 * any subtree using the theme.
 */
export function getThemeAndOverrides(themeWithOverrides, scope) {
  const theme = {};
  const overrides = {};
  for (const [themeKind, value] of Object.entries(themeWithOverrides || {})) {
    if (isThemeWithOverrides(value)) {
      theme[themeKind] = value.id;
      overrides[themeKind] = {
        [value.id]: value.overrides
      };
      continue;
    }
    theme[themeKind] = value;
  }
  return {
    theme: theme,
    inlineStyles: getCustomThemeOverrideStyles(overrides, scope)
  };
}

/**
 * Escapes a value for use inside a double-quoted CSS attribute selector.
 */
function escapeAttributeValue(value) {
  return value.replace(/["\\]/g, '\\$&');
}
function getThemeOverrideSelector(themeKind, themeName, scope) {
  // Colour themes only apply in their own colour mode.
  const colorMode = themeKind === 'light' || themeKind === 'dark' ? `[data-color-mode="${themeKind}"]` : '';
  const theme = `${colorMode}[data-theme~="${themeKind}:${themeName}"]`;
  if (scope) {
    return `[data-subtree-theme][${CUSTOM_THEME_SCOPE_ATTRIBUTE}="${escapeAttributeValue(scope)}"]${theme}`;
  }
  return `html${theme}, [data-subtree-theme]${theme}`;
}
function getCssVariableName(propertyName) {
  return `--ds-${propertyName.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

/**
 * Generates CSS for custom theme overrides.
 *
 * Override property names are converted from camel case to `--ds-` CSS custom properties.
 */
function getCustomThemeOverrideStyles(overrides, scope) {
  if (!overrides) {
    return '';
  }
  return Object.entries(overrides).flatMap(([themeKind, themes]) => Object.entries(themes || {}).flatMap(([themeName, values]) => {
    const styles = Object.entries(values || {})
    // Unset optional inputs are skipped so the theme's `var()` fallback applies. Writing
    // `undefined` would be a valid custom property value that breaks the formula.
    .filter(([, value]) => value !== undefined && value !== null).map(([propertyName, value]) => `${getCssVariableName(propertyName)}: ${typeof value === 'boolean' ? Number(value) : value};`).join('');
    return styles ? `
		${getThemeOverrideSelector(themeKind, themeName, scope)} {
			${styles}
		}
	` : [];
  })).join('');
}