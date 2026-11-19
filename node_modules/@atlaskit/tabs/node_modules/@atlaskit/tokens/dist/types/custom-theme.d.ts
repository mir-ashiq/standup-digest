import { type ThemeOptionsSchema } from './theme-options-schema';
import { type ThemeState } from './theme-state';
export declare const CUSTOM_STYLE_ELEMENTS_SIZE_THRESHOLD = 10;
export declare function loadAndAppendCustomThemeCss(themeState: Partial<ThemeState> & {
    UNSAFE_themeOptions: ThemeOptionsSchema;
}): void;
