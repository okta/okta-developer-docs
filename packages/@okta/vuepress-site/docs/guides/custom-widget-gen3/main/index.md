---
title: Style the Sign-In Widget (third generation)
excerpt: Learn how to customize the Sign-In Widget (third generation).
layout: Guides
---

This guide explains how to customize the Sign-In Widget (third generation) for redirect authentication.

---

**Learning outcomes**

* Enable the third-generation widget.
* Learn about design tokens.
* Call the JS API using design tokens.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Custom URL domain](/docs/guides/custom-url-domain/main/)

**Sample code**

[Customization examples](#customization-examples)

---

## About the Sign-In Widget (third generation)

The Sign-In Widget enables the following:

* Registration
* Enrollment
* Verification
* Recovery experiences for your users

It's where everyone in your org starts their Okta session.

The third generation of the Sign-In Widget offers the same user experience as the second generation. It adds accessibility improvements in the following:

* Color contrast
* Focus management
* Screen reader behavior

See [Sign-In Widget, third generation](https://help.okta.com/okta_help.htm?type=oie&id=ext-compare-siw) to verify if the third generation is right for your org.

## Upgrade to the third generation

> **Note:** If you have a new Okta Identity Engine org, the third-generation Sign-In Widget isn't enabled by default.

To upgrade to the third generation:

1. In the **Admin Console**, go to **Customizations** > **Brands**.
1. Select a brand.
1. Go to the **Pages** tab, and then click **Edit** or **Configure** for the **Sign-in page**.
1. Click the **Settings** tab.
1. In the **Sign-In Widget version** section, click **Edit**.
1. To use the third generation, click the **Use the third generation** toggle so that it's active. Leave the toggle inactive to remain on the second generation.
1. Click **Save to draft**.

See [Style the sign-in page](/docs/guides/custom-widget/main/) for details about customizing the second generation.

## Use the code editor

Use the code editor to add design tokens to your code. Design tokens call a JavaScript API.

> **Note:** You can only enable the code editor if you configure a [custom domain](/docs/guides/custom-url-domain/).

See [Customization examples](#customization-examples) for snippets that you can update and use.

1. In the Admin Console, go to **Customizations** > **Brands**, and then select the brand you want.
2. In the **Pages** tab, click **Configure** in the **Sign-in page** panel.
3. To open the code editor, turn on the toggle next to **Code editor**.
4. Make changes directly in the editor. See [Use design tokens](#use-design-tokens).
   * Click **Save to draft**, then **Preview**, **Revert**, or **Publish**.
   * Select **Compare with published version** to see the difference between your edited version and the published version. You can choose between a split view and a unified view.

   > **Note:** To discard your changes without publishing them, click **Revert changes** or turn off the toggle next to **Code editor**. Turning off the code editor restores the default JavaScript code.

## Use design tokens

Design tokens make the Sign-In Widget's visual style consistent and easier to update. Tokens replace static values to customize the following:

* color
* font
* line height
* size
* tracking
* weight

The following is a list of available design

```json
{
    BorderRadiusMain: "20px", // theme.mixins.borderRadius
    // BorderStyleMain: "solid", // theme.mixins.borderStyle
    BorderWidthMain: "4px", // theme.mixins.borderWidth
    // PalettePrimaryLighter: "#f2f3fd", // theme.palette.primary.lighter
    // PalettePrimaryLight: "#9daaf1", // theme.palette.primary.light
    PalettePrimaryMain: '#1098AD', // theme.palette.primary.main
    // PalettePrimaryDark: "#2e40a5", // theme.palette.primary.dark
    // PaletteDangerLighter: "#fff0ee", // theme.palette.error.lighter
    // PaletteDangerLight: "#fe8f7a", // theme.palette.error.light
    PaletteDangerMain: "#D6336C", // theme.palette.error.main
    // PaletteDangerDark: "#951800", // theme.palette.error.dark
    // PaletteWarningLighter: "#fcf6ac", // theme.palette.warning.lighter
    // PaletteWarningLight: "#eb9e05", // theme.palette.warning.light
    PaletteWarningMain: "#F59F00", // theme.palette.warning.main
    // PaletteWarningDark: "#664402", // theme.palette.warning.dark
    // PaletteSuccessLighter: "#defae7", // theme.palette.success.lighter
    // PaletteSuccessLight: "#59c282", // theme.palette.success.light
    PaletteSuccessMain: "#0CA678", // theme.palette.success.main
    // PaletteSuccessDark: "#0e562f", // theme.palette.success.dark
    // ShadowScale0: "0px 1px 4px rgba(29, 29, 33, 0.08), 0px 4px 6px rgba(29, 29, 33, 0.01), 0px 5px 15px rgba(29, 29, 33, 0.05)", // theme.shadows[1]
    // ShadowScale1: "0px 1px 4px rgba(29, 29, 33, 0.08), 0px 4px 10px rgba(29, 29, 33, 0.08), 0px 8px 30px rgba(29, 29, 33, 0.1)", // theme.shadows[2]
    // TypographyColorBody: "#272727", // theme.palette.text.primary
    // TypographyColorHeading: "#272727", // theme.typography.h1.color
    // TypographyColorSubordinate: "#6e6e6e", // theme.typography.caption.color
    // TypographyColorDisabled: "#aeaeae", // theme.palette.text.disabled
    // TypographyFamilyBody: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif", // theme.typography.fontFamily
    // TypographyFamilyHeading: "'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif", // theme.typography.h1.fontFamily
    // TypographyFamilyButton: "'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif", // theme.typography.button.fontFamily
    // TypographyFamilyMono: "'Roboto Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace", // theme.typography.kbd.fontFamily
    // TypographySizeBase: "87.5%", // theme.typography.body1.fontSize
    // TypographySizeSubordinate: "0.857rem", // theme.typography.caption.fontSize
    // TypographySizeBody: "1rem", // theme.typography.body1.fontSize
    // TypographySizeHeading6: "1.143rem", // theme.typography.h6.fontSize
    // TypographySizeHeading5: "1.286rem", // theme.typography.h5.fontSize
    // TypographySizeHeading4: "1.571rem", // theme.typography.h4.fontSize
    // TypographySizeHeading3: "2.000rem", // theme.typography.h3.fontSize
    // TypographySizeHeading2: "2.286rem", // theme.typography.h2.fontSize
    // TypographySizeHeading1: "2.571rem", // theme.typography.h1.fontSize
    // TypographyStyleNormal: "normal", // theme.typography.body1.fontStyle
    // TypographyWeightBody: "400", // theme.typography.fontWeightMedium
    // TypographyWeightBodyBold: "600", // theme.typography.fontWeightBold
    // TypographyWeightHeading: "500", // theme.typography.h1.fontWeight
    // TypographyLineHeightBody: 1.5, // theme.typography.body1.lineHeight
    // TypographyLineHeightOverline: 1.3, // theme.typography.overline.lineHeight
    // TypographyLineHeightHeading6: 1.3, // theme.typography.h6.lineHeight
    // TypographyLineHeightHeading5: 1.3, // theme.typography.h5.lineHeight
    // TypographyLineHeightHeading4: 1.25, // theme.typography.h4.lineHeight
    // TypographyLineHeightHeading3: 1.25, // theme.typography.h3.lineHeight
    // TypographyLineHeightHeading2: 1.2, // theme.typography.h2.lineHeight
    // TypographyLineHeightHeading1: 1.2, // theme.typography.h1.lineHeight
  }
```

## Customization examples

The following examples illustrate the impact of basic changes:

### Color change

* Button `#4C64E1` to `#D11DCA`
* Text `E272727` to `#00297A`

**Before color changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-color-before.png)

</div>

**After color changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-color-after.png)

</div>

### Text change

* Heading Inter: `semibold 22` to `Helvetica, bold, 25`
* Text Inter: `semibold, 14` to `Helvetica, regular, 16`

**Before text changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-text-before.png)

</div>

**After text changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-text-after.png)

</div>

**After color and text changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-color-text-after.png)

</div>

### Border radius and spacing change

* Input/button border radius: `4px` to `24px`
* Vertical spacing between elements in main content area: `24px` to `40px`

**Before border radius and spacing changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-border-space-before.png)

</div>

**After border radius and spacing changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-border-space-after.png)

</div>

**After border, spacing, text, and color changes**

<div class="full">

![Your Alt Text](/img/siw-gen3/siw3-color-text-border-after.png)

</div>

## See also

- [Customize domain and email address](/docs/guides/custom-url-domain/main/)
- [Sign-In Widget, third generation](https://help.okta.com/okta_help.htm?type=oie&id=ext-compare-siw)
