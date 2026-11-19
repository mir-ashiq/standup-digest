import { type ThemeCallback } from './theme-callback';
/**
 * A MutationObserver which watches the `<html>` element for changes to the theme.
 *
 * In React, use the {@link useThemeObserver `useThemeObserver`} hook instead.
 *
 * @param {function} callback - A callback function which fires when the theme changes.
 *
 * @example
 * ```
 * const observer = new ThemeMutationObserver((theme) => {});
 * observer.observe();
 * ```
 */
export declare class ThemeMutationObserver {
    legacyObserver: MutationObserver | null;
    static observer: MutationObserver | null;
    static callbacks: Set<ThemeCallback>;
    callback: ThemeCallback;
    constructor(callback: ThemeCallback);
    observe(): void;
    disconnect(): void;
}
export default ThemeMutationObserver;
