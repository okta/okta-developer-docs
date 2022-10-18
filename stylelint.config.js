"use strict";

module.exports = {
  "plugins": [
    "stylelint-scss",
    "stylelint-order"
  ],

  "processors": [
    "stylelint-processor-html"
  ],

  "rules": {
    "no-descending-specificity": true,

    "declaration-block-no-duplicate-custom-properties": true,
    "declaration-block-no-duplicate-properties": true,
    "font-family-no-duplicate-names": true,
    "keyframe-block-no-duplicate-selectors": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,

    "block-no-empty": true,
    "comment-no-empty": true,
    "no-empty-source": true,

    "function-calc-no-unspaced-operator": true,
    "color-named": "never",
    "keyframe-declaration-no-important": true,
    "color-no-invalid-hex": true,
    "named-grid-areas-no-invalid": true,
    "no-invalid-double-slash-comments": true,
    "no-invalid-position-at-import-rule": true,
    "string-no-newline": true,

    "custom-property-no-missing-var-function": true,
    "font-family-no-missing-generic-family-keyword": true,

    "function-linear-gradient-no-nonstandard-direction": true,
    "declaration-block-no-shorthand-property-overrides": true,

    "annotation-no-unknown": true,
    "at-rule-no-unknown": true,
    "function-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "no-unknown-animations": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "unit-no-unknown": true,

    "at-rule-no-vendor-prefix": true,
    "at-rule-property-required-list": true,

    "no-irregular-whitespace": true,

    "length-zero-no-unit": true,

    "alpha-value-notation": true,
    "color-function-notation": "modern",
    "color-hex-length": "long",
    "font-weight-notation": "numeric",
    "hue-degree-notation": "angle",
    "keyframe-selector-notation": "percentage",
    "selector-pseudo-element-colon-notation": "double",

    "selector-nested-pattern": "^&:(?:hover|active|focus|focus-visible|focus-within|nth-child|nth-last-child|first-child|last-child|nth-of-type|nth-last-of-type|first-of-type|last-of-type)$",

    "selector-attribute-quotes": "always",

    "value-keyword-case": "lower",
    "function-name-case": "lower",
    "selector-type-case": "lower",
    "rule-empty-line-before": "always",
    "at-rule-empty-line-before": "always",
    "comment-whitespace-inside": "always",

    "color-hex-case": "lower",

    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,

    "string-quotes": "double",
    "unit-case": "lower",

    "property-case": "lower",

    "declaration-no-important": true,

    "indentation": 2,
    "max-empty-lines": 1,
    "max-line-length": 80,
    "no-empty-first-line": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": true,

    "no-dollar-variables": true,

    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",

      "display",
      "float",
      "width",
      "height",
      "margin",
      "padding",

      "font-family",
      "font-style",
      "font-size",
      "line-height",
      "font-weight",
      "text-align",
      "color",

      "background-color",
      "border",
      "border-radius",
      "opacity",

      "transition-property",
      "transition-delay",
      "transition-duration",
      "transition-timing-function",
      "animation-name",
      "animation-delay",
      "animation-direction",
      "animation-duration",
      "animation-fill-mode",
      "animation-iteration-count",
      "animation-titmting-function",
      "animation-play-state"
    ]
  }
};
