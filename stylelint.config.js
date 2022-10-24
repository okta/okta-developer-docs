"use strict";

module.exports = {
  "plugins": [
    "stylelint-scss",
    "stylelint-order"
  ],
  "extends": "stylelint-config-standard-scss",
  "processors": [
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
    "max-line-length": [
      80,
      {
        "severity": "warning"
      }
    ],
    "no-empty-first-line": true,
    "no-eol-whitespace": true,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": true,

    // Descending
    "no-descending-specificity": [
      true,
      {
        "severity": "warning"
      }
    ],

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
    "no-invalid-position-at-import-rule": [
      true,
      {
        "severity": "warning"
      }
    ],
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
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "function-no-unknown": [
      true,
      {
        "ignoreFunctions": [
          "cv"
        ]
      }
    ],
    "media-feature-name-no-unknown": true,
    "no-unknown-animations": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "unit-no-unknown": true,

    // Allowed, disallowed & required
    // At-rule
    "at-rule-no-vendor-prefix": true,

    // Color
    "color-hex-alpha": "never",
    "color-named": "never",

    // Declaration
    "declaration-no-important": [
      true,
      {
        "severity": "warning"
      }
    ],

    // Function
    "function-url-no-scheme-relative": true,

    // Length
    "length-zero-no-unit": true,

    // Media feature
    "media-feature-name-no-vendor-prefix": true,

    // Property
    "property-no-vendor-prefix": true,

    // Selector
    "selector-no-vendor-prefix": true,

    // Value
    "value-no-vendor-prefix": true,

    // Max & min
    "declaration-block-single-line-max-declarations": 1,
    "max-nesting-depth": 1,
    "number-max-precision": 2,
    "selector-max-attribute": [
      1,
      {
        "severity": "warning"
      }
    ],
    "selector-max-class": [
      2,
      {
        "severity": "warning"
      }
    ],
    "selector-max-combinators": [
      2,
      {
        "severity": "warning"
      }
    ],
    "selector-max-id": [
      0,
      {
        "severity": "warning"
      }
    ],
    "selector-max-universal": [
      0,
      {
        "severity": "warning"
      }
    ],

    // Notation
    "alpha-value-notation": "number",
    "color-function-notation": "modern",
    "color-hex-length": "long",
    "font-weight-notation": "numeric",
    "hue-degree-notation": "angle",
    "import-notation": "string",
    "keyframe-selector-notation": "percentage",
    "selector-not-notation": "simple",
    "selector-pseudo-element-colon-notation": "double",

    // Pattern
    "selector-class-pattern": false,

    // Quotes
    "font-family-name-quotes": "always-unless-keyword",
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",

    // Not handled by pretty printers
    "value-keyword-case": "lower",
    "function-name-case": "lower",
    "custom-property-empty-line-before": "always",
    "rule-empty-line-before": "always",
    "selector-type-case": "lower",
    "comment-empty-line-before": "always",
    "comment-whitespace-inside": "always",

    // Handled by pretty printers
    "color-hex-case": "lower",
    "number-leading-zero": "always",
    "string-quotes": "double",
    "unit-case": "lower",
    "property-case": "lower",

    // Properties order
    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules"
    ],
    "order/properties-order": [
      {
        "groupName": "content",
        "emptyLineBefore": "always",
        "properties": [
          "content"
        ]
      },

      {
        "groupName": "positioning",
        "emptyLineBefore": "always",
        "properties": [
          "position",
          "top",
          "right",
          "bottom",
          "left",
          "z-index"
        ]
      },

      {
        "groupName": "box model",
        "emptyLineBefore": "always",
        "properties": [
          "display",
          "flex",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "flex-direction",
          "flex-flow",
          "flex-wrap",
          "grid",
          "grid-area",
          "grid-template",
          "grid-template-areas",
          "grid-template-rows",
          "grid-template-columns",
          "grid-row",
          "grid-row-start",
          "grid-row-end",
          "grid-column",
          "grid-column-start",
          "grid-column-end",
          "grid-auto-rows",
          "grid-auto-columns",
          "grid-auto-flow",
          "grid-gap",
          "grid-row-gap",
          "grid-column-gap",
          "gap",
          "row-gap",
          "column-gap",
          "align-content",
          "align-items",
          "align-self",
          "justify-content",
          "justify-items",
          "justify-self",
          "order",
          "float",
          "clear",
          "width",
          "min-width",
          "max-width",
          "height",
          "min-height",
          "max-height",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "box-sizing"
        ]
      },

      {
        "groupName": "typography",
        "emptyLineBefore": "always",
        "properties": [
          "font",
          "font-weight",
          "font-style",
          "font-variant",
          "font-size-adjust",
          "font-stretch",
          "font-size",
          "font-family",
          "line-height",
          "letter-spacing",
          "text-align",
          "text-align-last",
          "text-decoration",
          "text-emphasis",
          "text-emphasis-position",
          "text-emphasis-style",
          "text-emphasis-color",
          "text-indent",
          "text-justify",
          "text-outline",
          "text-transform",
          "text-wrap",
          "text-overflow",
          "text-overflow-ellipsis",
          "text-overflow-mode",
          "text-shadow",
          "white-space",
          "word-spacing",
          "word-wrap",
          "word-break",
          "overflow-wrap",
          "tab-size",
          "hyphens",
          "color"
        ]
      },

      {
        "groupName": "visual",
        "emptyLineBefore": "always",
        "properties": [
          "background",
          "background-color",
          "background-image",
          "background-attachment",
          "background-position",
          "background-position-x",
          "background-position-y",
          "background-clip",
          "background-origin",
          "background-size",
          "background-repeat",
          "box-decoration-break",
          "box-shadow",
          "border",
          "border-spacing",
          "border-collapse",
          "border-width",
          "border-style",
          "border-color",
          "border-top",
          "border-top-width",
          "border-top-style",
          "border-top-color",
          "border-right",
          "border-right-width",
          "border-right-style",
          "border-right-color",
          "border-bottom",
          "border-bottom-width",
          "border-bottom-style",
          "border-bottom-color",
          "border-left",
          "border-left-width",
          "border-left-style",
          "border-left-color",
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-right-radius",
          "border-bottom-left-radius",
          "border-image",
          "border-image-source",
          "border-image-slice",
          "border-image-width",
          "border-image-outset",
          "border-image-repeat",
          "border-top-image",
          "border-right-image",
          "border-bottom-image",
          "border-left-image",
          "border-corner-image",
          "border-top-left-image",
          "border-top-right-image",
          "border-bottom-right-image",
          "border-bottom-left-image",
          "outline",
          "outline-width",
          "outline-style",
          "outline-color",
          "outline-offset",
          "list-style",
          "list-style-position",
          "list-style-type",
          "list-style-image"
        ]
      },

      {
        "groupName": "animation",
        "emptyLineBefore": "always",
        "properties": [
          "transition",
          "transition-delay",
          "transition-timing-function",
          "transition-duration",
          "transition-property",
          "animation",
          "animation-name",
          "animation-duration",
          "animation-play-state",
          "animation-timing-function",
          "animation-delay",
          "animation-iteration-count",
          "animation-direction",
          "animation-fill-mode"
        ]
      }
    ]
  }
};
