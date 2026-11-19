/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * This file contains a dynamic import for each theme this package exports.
 * Themes are loaded asynchronously at runtime to minimise the amount of CSS we send to the client.
 * This allows users to compose their themes and only use the tokens that are requested.
 * When a new theme is created, the import should automatically be added to the map
 *
 * @codegen <<SignedSource::53ff14285f7c9bd19729a6820212b645>>
 * @codegenCommand yarn build tokens
 */

var themeImportsMap = {
  'light': function light() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-light" */
    './themes/atlassian-light');
  },
  'light-future': function lightFuture() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-light-future" */
    './themes/atlassian-light-future');
  },
  'light-finesse': function lightFinesse() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-light-finesse" */
    './themes/atlassian-light-finesse');
  },
  'light-increased-contrast-finesse': function lightIncreasedContrastFinesse() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-light-increased-contrast-finesse" */
    './themes/atlassian-light-increased-contrast-finesse');
  },
  'light-increased-contrast': function lightIncreasedContrast() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-light-increased-contrast" */
    './themes/atlassian-light-increased-contrast');
  },
  'UNSAFE-dynamic': function UNSAFEDynamic() {
    return import( /* webpackChunkName: "@atlaskit-internal_UNSAFE-dynamic" */
    './themes/UNSAFE-dynamic');
  },
  'UNSAFE-dynamic-dark': function UNSAFEDynamicDark() {
    return import( /* webpackChunkName: "@atlaskit-internal_UNSAFE-dynamic-dark" */
    './themes/UNSAFE-dynamic-dark');
  },
  'UNSAFE-test-light': function UNSAFETestLight() {
    return import( /* webpackChunkName: "@atlaskit-internal_UNSAFE-test-light" */
    './themes/UNSAFE-test-light');
  },
  'UNSAFE-test-dark': function UNSAFETestDark() {
    return import( /* webpackChunkName: "@atlaskit-internal_UNSAFE-test-dark" */
    './themes/UNSAFE-test-dark');
  },
  'dark': function dark() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-dark" */
    './themes/atlassian-dark');
  },
  'dark-future': function darkFuture() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-dark-future" */
    './themes/atlassian-dark-future');
  },
  'dark-finesse': function darkFinesse() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-dark-finesse" */
    './themes/atlassian-dark-finesse');
  },
  'dark-increased-contrast-finesse': function darkIncreasedContrastFinesse() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-dark-increased-contrast-finesse" */
    './themes/atlassian-dark-increased-contrast-finesse');
  },
  'dark-increased-contrast': function darkIncreasedContrast() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-dark-increased-contrast" */
    './themes/atlassian-dark-increased-contrast');
  },
  'spacing': function spacing() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-spacing" */
    './themes/atlassian-spacing');
  },
  'UNSAFE-spacing': function UNSAFESpacing() {
    return import( /* webpackChunkName: "@atlaskit-internal_UNSAFE-spacing" */
    './themes/UNSAFE-spacing');
  },
  'typography': function typography() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-typography" */
    './themes/atlassian-typography');
  },
  'UNSAFE-typography': function UNSAFETypography() {
    return import( /* webpackChunkName: "@atlaskit-internal_UNSAFE-typography" */
    './themes/UNSAFE-typography');
  },
  'typography-finesse': function typographyFinesse() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-typography-finesse" */
    './themes/atlassian-typography-finesse');
  },
  'shape': function shape() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-shape" */
    './themes/atlassian-shape');
  },
  'motion': function motion() {
    return import( /* webpackChunkName: "@atlaskit-internal_atlassian-motion" */
    './themes/atlassian-motion');
  }
};
export { themeImportsMap as themeImportMap };
export default themeImportsMap;