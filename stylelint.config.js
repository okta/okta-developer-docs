"use strict";

module.exports = {
  processors: [
    [
      "@mapbox/stylelint-processor-arbitrary-tags",
      {
        fileFilterRegex: [/\.vue$/],
      },
    ],
  ],

  "rules": {
    // General / Sheet
    "indentation": 2,
    "max-empty-lines": 1,
    "no-empty-first-line": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": true,

    // Descending
    "no-descending-specificity": true,

    // Duplicate
    "declaration-block-no-duplicate-custom-properties": true,
    "declaration-block-no-duplicate-properties": true,
    "font-family-no-duplicate-names": true,
    "keyframe-block-no-duplicate-selectors": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,

    // Empty
    "block-no-empty": true,
    "comment-no-empty": true,
    "no-empty-source": true,

    // Invalid
    "color-no-invalid-hex": true,
    "function-calc-no-unspaced-operator": true,
    "keyframe-declaration-no-important": true,
    "named-grid-areas-no-invalid": true,
    "no-invalid-double-slash-comments": true,
    "no-invalid-position-at-import-rule": true,
    "string-no-newline": true,

    // Irregular
    "no-irregular-whitespace": true,

    // Missing
    "custom-property-no-missing-var-function": true,
    "font-family-no-missing-generic-family-keyword": true,

    // Non-standard
    "function-linear-gradient-no-nonstandard-direction": true,

    // Overrides
    "declaration-block-no-shorthand-property-overrides": true,

    // Unknown
    "annotation-no-unknown": true,
    "at-rule-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "no-unknown-animations": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "unit-no-unknown": true,

    // Allowed, disallowed & required
    "at-rule-no-vendor-prefix": true,
    "color-named": "never",
    "function-url-no-scheme-relative": true,
    "length-zero-no-unit": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,

    // Max & min
    "max-nesting-depth": 1,
    "number-max-precision": 3,

    // Notation
    "color-function-notation": "modern",
    "color-hex-length": "long",
    "font-weight-notation": "numeric",
    "hue-degree-notation": "angle",
    "keyframe-selector-notation": "percentage",
    "selector-pseudo-element-colon-notation": "double",

    // Quotes
    "font-family-name-quotes": "always-unless-keyword",
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",

    // Not handled by pretty printers
    "value-keyword-case": "lower",
    "function-name-case": "lower",
    "selector-type-case": "lower",
    "rule-empty-line-before": "always",
    "at-rule-empty-line-before": "always",
    "comment-empty-line-before": "always",
    "comment-whitespace-inside": "always",

    // Handled by pretty printers
    "color-hex-case": "lower",
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "string-quotes": "double",
    "unit-case": "lower",
    "property-case": "lower"
  }
};
