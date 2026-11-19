import { type ThemeColorModes } from '../theme-color-modes';
import { type ThemeOptionsSchema } from '../theme-options-schema';
type ThemeAttributeId = 'light' | 'dark';
export declare function findMissingCustomStyleElements(UNSAFE_themeOptions: ThemeOptionsSchema, mode: ThemeColorModes): ThemeAttributeId[];
export {};
