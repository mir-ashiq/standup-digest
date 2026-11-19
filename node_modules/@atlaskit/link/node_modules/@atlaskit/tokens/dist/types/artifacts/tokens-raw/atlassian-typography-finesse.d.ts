/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 * @codegen <<SignedSource::aaef6976417b9ceec7ff883bab5f13cf>>
 * @codegenCommand yarn build tokens
 */
type TokenValue = string;
type TokenValueOriginal = {
    fontWeight: string;
    fontSize: string;
    lineHeight: string;
    fontFamily: string;
    fontStyle: string;
    letterSpacing: string;
};
type TokenAttributes = {
    group: string;
    state: string;
    introduced: string;
    description: string;
    suggest?: string[];
    deprecated?: string;
    replacement?: string;
};
type Token = {
    value: TokenValue;
    filePath: string;
    isSource: boolean;
    attributes: TokenAttributes;
    original: {
        value: TokenValueOriginal;
        attributes: TokenAttributes;
    };
    name: string;
    path: string[];
    cleanName: string;
};
declare const tokens: Token[];
export default tokens;
