/**
 * This file contains the source of truth for themes and all associated meta data.
 */
import type { ThemeColorModes } from './theme-color-modes';
import { type ThemeIds } from './theme-ids';
import type { ThemeState } from './theme-state';
/**
 * Themes: The internal identifier of a theme.
 * These ids are what the actual theme files/folders are called.
 * style-dictionary will attempt to locate these in the file-system.
 */
export type Themes = 'UNSAFE-dynamic' | 'UNSAFE-dynamic-dark' | 'atlassian-light' | 'atlassian-light-future' | 'atlassian-light-increased-contrast' | 'UNSAFE-test-light' | 'atlassian-dark' | 'atlassian-dark-future' | 'atlassian-dark-increased-contrast' | 'UNSAFE-test-dark' | 'atlassian-shape' | 'atlassian-spacing' | 'UNSAFE-spacing' | 'atlassian-typography' | 'UNSAFE-typography' | 'atlassian-motion';
/**
 * ThemeOverrides: The internal identifier of a theme override. Which are themes that contain
 * a subset of tokens intended to override an existing theme. These ids are what the actual
 * theme files/folders are called. style-dictionary will attempt to locate these in the file-system.
 * Theme overrides are temporary and there may not be any defined at times.
 */
type FinesseThemeOverrides = 'atlassian-light-finesse' | 'atlassian-light-increased-contrast-finesse' | 'atlassian-dark-finesse' | 'atlassian-dark-increased-contrast-finesse' | 'atlassian-typography-finesse';
export type ThemeOverrides = Themes | FinesseThemeOverrides;
export type ThemeFileNames = Themes | FinesseThemeOverrides;
/**
 * Theme kinds: The type of theme.
 * Some themes are entirely focused on Color, whilst others are purely focused on spacing.
 * In the future other types may be introduced such as typography.
 */
type ThemeKinds = 'color' | 'spacing' | 'typography' | 'shape' | 'motion';
export type DataColorModes = Exclude<ThemeColorModes, 'auto'>;
/**
 * Contrast preferences: The system contrast preference
 */
declare const themeContrastModes: readonly ['more', 'no-preference', 'auto'];
export type ThemeContrastModes = (typeof themeContrastModes)[number];
export type DataContrastModes = 'more' | 'no-preference' | 'auto';
/**
 * Theme override ids: the equivalent of themeIds for theme overrides.
 * Theme overrides are temporary and there may not be any defined at times.
 */
export declare const themeOverrideIds: readonly ['light-finesse', 'light-increased-contrast-finesse', 'dark-finesse', 'dark-increased-contrast-finesse', 'typography-finesse'];
export type ThemeOverrideIds = (typeof themeOverrideIds)[number];
export declare const themeIdsWithOverrides: readonly [
    'light-increased-contrast',
    'light',
    'light-future',
    'UNSAFE-dynamic',
    'UNSAFE-dynamic-dark',
    'UNSAFE-test-light',
    'dark',
    'UNSAFE-test-dark',
    'dark-future',
    'dark-increased-contrast',
    'spacing',
    'UNSAFE-spacing',
    'shape',
    'typography',
    'UNSAFE-typography',
    'motion',
    'light-finesse',
    'light-increased-contrast-finesse',
    'dark-finesse',
    'dark-increased-contrast-finesse',
    'typography-finesse'
];
export type ThemeIdsWithOverrides = (typeof themeIdsWithOverrides)[number];
/**
 * Theme to use a base. This will create the theme as
 * an extension with all token values marked as optional
 * to allow tokens to be overridden as required.
 */
type ExtensionThemeId = ThemeIds;
/**
 * Palettes: The set of base tokens a given theme may be populated with.
 * For example: legacy light & dark themes use the "legacyPalette" containing colors from our
 * previous color set.
 */
export type Palettes = 'defaultPalette' | 'spacingScale' | 'shapePalette' | 'typographyPalette' | 'motionPalette';
/**
 * ThemeConfig: the source of truth for all theme meta-data.
 * This object should be used whenever interfacing with themes.
 */
interface ThemeConfig {
    id: ThemeIds | ThemeOverrideIds;
    displayName: string;
    palette: Palettes;
    attributes: ({
        type: 'color';
        mode: DataColorModes;
    } | {
        type: Extract<ThemeKinds, 'spacing' | 'typography' | 'shape' | 'motion'>;
    }) & {
        /**
         * @deprecated Use top-level `extends` property instead
         */
        extends?: ExtensionThemeId;
    };
    /**
     * Theme to use a base. This will create the theme as
     * an extension with all token values marked as optional
     * to allow tokens to be overridden as required.
     *
     * The resulting theme css will contain a complete theme.
     * All tokens specified in the child theme will be overridden.
     * All tokens not specified in the child theme will be inherited from the parent theme.
     */
    extends?: ThemeIds;
    /**
     * Theme to override. This will cause the theme to only
     * output css variables which can be imported to temporarily
     * override existing themes for testing purposes.
     *
     *
     * The resulting theme css will be only the tokens specified
     * and will need the dependant theme to be loaded alongside
     * it in order to function correctly.
     */
    override?: ThemeIds;
    /**
     * Use when the theme provides an increased contrast
     * version of another theme. This will cause the theme to be loaded
     * under the media query `@media (prefers-contrast: more)`.
     */
    increasesContrastFor?: ThemeIds;
}
export declare const themeConfig: Record<ThemeFileNames, ThemeConfig>;
/**
 * Represents theme state once mounted to the page
 * (the page doesn't have an "auto" color mode, it's either light or dark)
 */
export interface ActiveThemeState extends ThemeState {
    colorMode: DataColorModes;
}
export default themeConfig;
/**
 * @deprecated Use `import { themeColorModes, ThemeColorModes } from '@atlaskit/tokens/theme-color-modes'` instead.
 */
export { themeColorModes, type ThemeColorModes } from './theme-color-modes';
/**
 * @deprecated Use `import { themeIds, ThemeIds } from '@atlaskit/tokens/theme-ids'` instead.
 */
export { themeIds, type ThemeIds } from './theme-ids';
/**
 * @deprecated Use `import { themeStateDefaults } from '@atlaskit/tokens/theme-state-defaults'` instead.
 */
export { themeStateDefaults } from './theme-state-defaults';
export { type ThemeOptionsSchema, type CSSColor } from './theme-options-schema';
export { type ThemeState } from './theme-state';
