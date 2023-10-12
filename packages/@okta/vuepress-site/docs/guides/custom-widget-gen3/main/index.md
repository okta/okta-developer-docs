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

> **Note:** If you have a new Okta Identity Engine org, the third generation Sign-In Widget isn't enabled by default.

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

* Color
* Border
* Font family
* Font size
* Font weight
* Line height
* Spacing

You need to pass the design token values into the `OktaSignIn` constructor. For example:

```javascript
new OktaSignIn({
  theme: {
    tokens: {
      BorderRadiusMain: '24px',
      PalettePrimaryMain: '#D11DCA',
      Spacing5: '3rem',
      TypographyColorBody: '#00297A',
      TypographySizeBase: '100%'
      TypographyLineHeightBody: 1.75
    }
  }
});
```

The following is a list of available design tokens with default values. See [Customization examples](#customization-examples):

```json
{
  "BorderRadiusMain": "6px",
  "BorderStyleMain": "solid",
  "BorderWidthMain": "1px",
  "PalettePrimaryLighter": "#f2f3fd",
  "PalettePrimaryLight": "#9daaf1",
  "PalettePrimaryMain": "#546be7",
  "PalettePrimaryDark": "#2e40a5",
  "PaletteDangerLighter": "#fff0ee",
  "PaletteDangerLight": "#fe8f7a",
  "PaletteDangerMain": "#e72500",
  "PaletteDangerDark": "#951800",
  "PaletteWarningLighter": "#fcf6ac",
  "PaletteWarningLight": "#eb9e05",
  "PaletteWarningMain": "#a16c03",
  "PaletteWarningDark": "#664402",
  "PaletteSuccessLighter": "#defae7",
  "PaletteSuccessLight": "#59c282",
  "PaletteSuccessMain": "#16884a",
  "PaletteSuccessDark": "#0e562f",
  "PaletteNeutralMain": "#6e6e6e",
  "PaletteNeutralDark": "#272727",
  "ShadowScale0": "0px 1px 4px rgba(29, 29, 33, 0.08), 0px 4px 6px rgba(29, 29, 33, 0.01), 0px 5px 15px rgba(29, 29, 33, 0.05)",
  "ShadowScale1": "0px 1px 4px rgba(29, 29, 33, 0.08), 0px 4px 10px rgba(29, 29, 33, 0.08), 0px 8px 30px rgba(29, 29, 33, 0.1)",
  "Spacing0": "0",
  "Spacing1": "0.28571429rem",
  "Spacing2": "0.57142857rem",
  "Spacing3": "0.85714286rem",
  "Spacing4": "1.14285714rem",
  "Spacing5": "1.71428571rem",
  "Spacing6": "2.28571429rem",
  "Spacing7": "2.85714286rem",
  "Spacing8": "3.42857143rem",
  "Spacing9": "4rem",
  "TypographyColorBody": "#272727",
  "TypographyColorHeading": "#272727",
  "TypographyColorSubordinate": "#6e6e6e",
  "TypographyColorDisabled": "#aeaeae",
  "TypographyFamilyBody": "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
  "TypographyFamilyHeading": "'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
  "TypographyFamilyButton": "'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
  "TypographyFamilyMono": "'Roboto Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  "TypographySizeBase": "87.5%",
  "TypographySizeSubordinate": "0.857rem",
  "TypographySizeBody": "1rem",
  "TypographySizeHeading6": "1.143rem",
  "TypographySizeHeading5": "1.286rem",
  "TypographySizeHeading4": "1.571rem",
  "TypographySizeHeading3": "2.000rem",
  "TypographySizeHeading2": "2.286rem",
  "TypographySizeHeading1": "2.571rem",
  "TypographyStyleNormal": "normal",
  "TypographyWeightBody": "400",
  "TypographyWeightBodyBold": "600",
  "TypographyWeightHeading": "500",
  "TypographyLineHeightBody": 1.5,
  "TypographyLineHeightOverline": 1.3,
  "TypographyLineHeightHeading6": 1.3,
  "TypographyLineHeightHeading5": 1.3,
  "TypographyLineHeightHeading4": 1.25,
  "TypographyLineHeightHeading3": 1.25,
  "TypographyLineHeightHeading2": 1.2,
  "TypographyLineHeightHeading1": 1.2
}
```

## Customization examples

The following examples illustrate the impact of basic changes:

### Color change

* `PalettePrimaryMain` from `#4C64E1` (blue) to `#D11DCA` (magenta)
* `TypographyColorBody` from `#272727` (dark grey) to `#00297A` (navy blue)

**Before color changes**

<div class="half">

![Before color changes](/img/siw-gen3/siw3-color-before.png)

</div>

**After color changes**

<div class="half">

![After color changes](/img/siw-gen3/siw3-color-after.png)

</div>

### Text change

* `TypographyFamilyHeading` from `"'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif"` (default) to `"Helvetica"`
* `TypographyWeightHeading` from `500` (semibold, default) to `600` (bold)
* `TypographyFamilyBody` from `"'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif"` (default) to  `"Helvetica"`
* `TypographySizeBase` from `"87.5%"` (14px, default) to `"100%"` (16px)

**Before text changes**

<div class="half">

![Before text changes](/img/siw-gen3/siw3-text-before.png)

</div>

**After text changes**

<div class="half">

![After text changes](/img/siw-gen3/siw3-text-after.png)

</div>

**After color and text changes**

<div class="half">

![After color and text changes](/img/siw-gen3/siw3-color-text-after.png)

</div>

### Border radius and spacing change

* `BorderRadiusMain` from `4px` to `24px`
* `Spacing5` from `1.71428571rem` (24px, default) to `2.85714286rem` (40px)

**Before border radius and spacing changes**

<div class="half">

![Before border radius and spacing changes](/img/siw-gen3/siw3-border-space-before.png)

</div>

**After border radius and spacing changes**

<div class="half">

![After border radius and spacing changes](/img/siw-gen3/siw3-border-space-after.png)

</div>

**After border, spacing, text, and color changes**

<div class="half">

![After border, spacing, text, and color changes](/img/siw-gen3/siw3-color-text-border-after.png)

</div>

## See also

- [Customize domain and email address](/docs/guides/custom-url-domain/main/)
- [Sign-In Widget, third generation](https://help.okta.com/okta_help.htm?type=oie&id=ext-compare-siw)
