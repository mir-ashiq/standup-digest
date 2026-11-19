import type tokens from '../artifacts/token-names';
import { type ThemeColorModes } from '../theme-color-modes';
import { type CSSColor } from '../theme-options-schema';
type Token = keyof typeof tokens;
type TokenMap = {
    [key in Token]?: number | string;
};
type Mode = 'light' | 'dark';
export declare const generateTokenMap: (brandColor: CSSColor, mode: ThemeColorModes, themeRamp?: CSSColor[]) => { [mode in Mode]?: TokenMap; };
export {};
