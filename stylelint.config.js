"use strict";

module.exports = {
  customSyntax: require("postcss-scss"),
  plugins: [
    "stylelint-scss",
    "stylelint-order"
  ],
  processors: [
    [
      "@mapbox/stylelint-processor-arbitrary-tags",
      {
        fileFilterRegex: [/\.vue$/],
      },
    ],
  ],
  rules: {
    // General / Sheet
    "indentation": 2,
    "max-empty-lines": 1,
    "no-empty-first-line": null,
    "no-extra-semicolons": true,
    "no-missing-end-of-source-newline": true,

    // Duplicate
    "declaration-block-no-duplicate-custom-properties": true,
    "font-family-no-duplicate-names": true,
    "keyframe-block-no-duplicate-selectors": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,

    // Empty
    "block-no-empty": true,
    "no-empty-source": null,

    // Invalid
    "color-no-invalid-hex": true,
    "string-no-newline": true,

    // Irregular
    "no-irregular-whitespace": true,

    // Missing
    "custom-property-no-missing-var-function": true,

    // Unknown
    "annotation-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        "ignorePseudoElements": ["v-deep"]
      }
    ],
    "selector-type-no-unknown": true,
    "unit-no-unknown": true,

    // Allowed, disallowed & required
    // Color
    "color-hex-alpha": "never",
    "color-named": "never",

    // Length
    "length-zero-no-unit": true,

    // Max & min
    "max-nesting-depth": [
      1,
      {
        "ignoreAtRules": [
          "media",
          "include"
        ]
      }
    ],

    // Notation
    "alpha-value-notation": "number",
    "color-function-notation": "modern",
    "color-hex-length": "long",
    "font-weight-notation": "numeric",
    "hue-degree-notation": "angle",

    // Quotes
    "font-family-name-quotes": "always-unless-keyword",
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",

    // Not handled by pretty printers
    "value-keyword-case": "lower",
    "function-name-case": "lower",
    "selector-type-case": "lower",

    // Handled by pretty printers
    "color-hex-case": "lower",

    // Number
    "number-leading-zero": "always",

    // String
    "string-quotes": "double",

    // Unit
    "unit-case": "lower",

    // Property
    "property-case": "lower",

    // Declaration
    "declaration-bang-space-before": "always",
    "declaration-colon-space-after": "always",

    // Declaration block
    "declaration-block-trailing-semicolon": "always",

    // Block
    "block-closing-brace-empty-line-before": "never",
    "block-closing-brace-newline-after": "always",

    // Selector list
    "selector-list-comma-newline-after": "always",

    // At-rule
    "at-rule-name-case": "lower",
    "at-rule-semicolon-space-before": "never",

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
          "all",
          "position",
          "top",
          "right",
          "bottom",
          "left",
          "inset",
          "inset-block",
          "inset-block-start",
          "inset-block-end",
          "inset-inline",
          "inset-inline-start",
          "inset-inline-end",
          "z-index"
        ]
      },

      {
        "groupName": "box model",
        "emptyLineBefore": "always",
        "properties": [
          "display",
          "grid-template",
          "grid-template-rows",
          "grid-template-columns",
          "grid-template-areas",
          "grid-auto-rows",
          "grid-auto-columns",
          "grid-auto-flow",
          "grid-area",
          "grid-row",
          "grid-row-start",
          "grid-row-end",
          "grid-column",
          "grid-column-start",
          "grid-column-end",
          "flex",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "flex-flow",
          "flex-direction",
          "flex-wrap",
          "justify-content",
          "justify-self",
          "justify-items",
          "align-content",
          "align-items",
          "align-self",
          "gap",
          "row-gap",
          "columns",
          "column-count",
          "column-fill",
          "column-gap",
          "column-rule",
          "column-rule-color",
          "column-rule-style",
          "column-rule-width",
          "column-span",
          "column-width",
          "order",
          "float",
          "clear",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "margin-block-start",
          "margin-block-end",
          "margin-inline-start",
          "margin-inline-end",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "padding-block-start",
          "padding-block-end",
          "padding-inline-start",
          "padding-inline-end",
          "box-sizing",
          "width",
          "min-width",
          "max-width",
          "inline-size",
          "min-inline-size",
          "max-inline-size",
          "height",
          "min-height",
          "max-height",
          "block-size",
          "min-block-size",
          "max-block-size",
          "overflow",
          "overflow-x",
          "overflow-y"
        ]
      },

      {
        "groupName": "visual",
        "emptyLineBefore": "always",
        "properties": [
          "box-shadow",
          "outline",
          "outline-width",
          "outline-style",
          "outline-color",
          "outline-offset",
          "border",
          "border-width",
          "border-style",
          "border-color",
          "border-top",
          "border-top-width",
          "border-top-style",
          "border-top-color",
          "border-block-start",
          "border-block-start-width",
          "border-block-start-style",
          "border-block-start-color",
          "border-bottom",
          "border-bottom-width",
          "border-bottom-style",
          "border-bottom-color",
          "border-block-end",
          "border-block-end-width",
          "border-block-end-style",
          "border-block-end-color",
          "border-left",
          "border-left-width",
          "border-left-style",
          "border-left-color",
          "border-inline-start",
          "border-inline-start-width",
          "border-inline-start-style",
          "border-inline-start-color",
          "border-right",
          "border-right-width",
          "border-right-style",
          "border-right-color",
          "border-inline-end",
          "border-inline-end-width",
          "border-inline-end-style",
          "border-inline-end-color",
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-right-radius",
          "border-bottom-left-radius",
          "border-start-start-radius",
          "border-start-end-radius",
          "border-end-end-radius",
          "border-end-start-radius",
          "border-image",
          "border-image-source",
          "border-image-slice",
          "border-image-width",
          "border-image-outset",
          "border-image-repeat",
          "border-collapse",
          "border-spacing",
          "stroke",
          "stroke-dasharray",
          "stroke-dashoffset",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-miterlimit",
          "stroke-opacity",
          "stroke-width",
          "background",
          "background-color",
          "background-image",
          "background-position",
          "background-position-x",
          "background-position-y",
          "background-size",
          "background-clip",
          "background-origin",
          "background-attachment",
          "background-repeat",
          "background-blend-mode",
          "fill",
          "fill-opacity",
          "fill-rule"
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
