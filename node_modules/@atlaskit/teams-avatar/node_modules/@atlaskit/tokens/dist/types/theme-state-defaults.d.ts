import type { ThemeState } from './theme-state';
/**
 * Can't evaluate typography feature flags at the module level,
 * it will always resolve to false when server side rendered or when flags are loaded async.
 */
interface ThemeStateDefaults extends Omit<ThemeState, 'motion'> {
    motion: () => ThemeState['motion'];
}
/**
 * themeStateDefaults: the default values for ThemeState used by theming utilities
 */
export declare const themeStateDefaults: ThemeStateDefaults;
export {};
