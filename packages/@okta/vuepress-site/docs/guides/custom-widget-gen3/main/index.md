---
title: Style the Sign-In Widget (third generation)
excerpt: Learn how to customize the Sign-In Widget (third generation)
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

The third generation of the Sign-In Widget offers the same user experience as the second generation. It adds accessibility improvements to the following:

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
2. On the **Pages** tab, click **Configure** in the **Sign-in page** panel.
3. To open the code editor, click the **Code editor** toggle.
4. Make changes directly in the editor. See [Use design tokens](#use-design-tokens).
   * Click **Save to draft**, then **Preview**, **Revert**, or **Publish**.
   * Select **Compare with published version** to see the difference between your edited version and the published version. You can choose between a split view and a unified view.

   > **Note:** To discard your changes without publishing them, click **Revert changes** or click the **Code editor** toggle again. Turning off the code editor restores the default JavaScript code.

## Use design tokens

Design tokens make the Sign-In Widget's visual style consistent and easier to update. Tokens replace static values to customize the following:

* Color
* Border
* Font family
* Font size
* Font weight
* Line height
* Spacing

Pass the design token values into the `OktaSignIn` constructor. For example:

```javascript
new OktaSignIn({
  theme: {
    tokens: {
      PalettePrimaryMain: '#D11DCA',
      TypographyColorBody: '#00297A',
      TypographyColorHeading: '#00297A',
      TypographyFamilyHeading: 'Helvetica',
      TypographyFamilyBody: 'Helvetica',
      TypographyWeightHeading: 600,
      BorderRadiusMain: '24px',
      Spacing5: '2.85714286rem',
    }
  }
});
```

The following is a list of available design tokens with default values. See [Customization examples](#customization-examples):
```json
{
  "BorderColorDisplay": "#e1e1e1",
  "BorderColorDisabled": "#e1e1e1",
  "BorderColorDangerLight": "#fe8f7a",
  "BorderColorDangerControl": "#e72500",
  "BorderColorDangerDark": "#951800",
  "BorderColorPrimaryControl": "#546be7",
  "BorderColorPrimaryDark": "#2e40a5",
  "BorderRadiusTight": "4px",
  "BorderRadiusMain": "6px",
  "BorderStyleMain": "solid",
  "BorderWidthMain": "1px",
  "FocusOutlineColorPrimary": "#546be7",
  "FocusOutlineOffsetMain": "2px",
  "FocusOutlineOffsetTight": "0",
  "FocusOutlineStyle": "solid",
  "FocusOutlineWidthMain": "2px",
  "FocusOutlineWidthTight": "1px",
  "HueNeutral50": "#f4f4f4",
  "HueNeutral100": "#ededed",
  "HueNeutral200": "#e1e1e1",
  "HueNeutral300": "#cbcbcb",
  "HueNeutral400": "#aeaeae",
  "HueNeutral500": "#8d8d8d",
  "HueNeutral600": "#6e6e6e",
  "HueNeutral700": "#4b4b4b",
  "HueNeutral800": "#383838",
  "HueNeutral900": "#272727",
  "HueNeutralWhite": "#ffffff",
  "HueBlue50": "#f2f3fd",
  "HueBlue100": "#dbe0fa",
  "HueBlue200": "#c1c9f6",
  "HueBlue300": "#9daaf1",
  "HueBlue400": "#7286eb",
  "HueBlue500": "#546be7",
  "HueBlue600": "#4c64e1",
  "HueBlue700": "#2e40a5",
  "HueBlue800": "#22307c",
  "HueBlue900": "#182257",
  "HueGreen50": "#defae7",
  "HueGreen100": "#94f5b3",
  "HueGreen200": "#7be09e",
  "HueGreen300": "#59c282",
  "HueGreen400": "#31a061",
  "HueGreen500": "#16884a",
  "HueGreen600": "#197f48",
  "HueGreen700": "#0e562f",
  "HueGreen800": "#0a4023",
  "HueGreen900": "#072e19",
  "HueRed50": "#fff0ee",
  "HueRed100": "#ffd8d1",
  "HueRed200": "#febbae",
  "HueRed300": "#fe8f7a",
  "HueRed400": "#fd4e2d",
  "HueRed500": "#e72500",
  "HueRed600": "#d92300",
  "HueRed700": "#951800",
  "HueRed800": "#711200",
  "HueRed900": "#500d00",
  "HueYellow50": "#fcf6ac",
  "HueYellow100": "#fce101",
  "HueYellow200": "#f9c503",
  "HueYellow300": "#eb9e05",
  "HueYellow400": "#bf8004",
  "HueYellow500": "#a16c03",
  "HueYellow600": "#966603",
  "HueYellow700": "#664402",
  "HueYellow800": "#4c3302",
  "HueYellow900": "#352401",
  "PalettePrimaryLighter": "#f2f3fd",
  "PalettePrimaryLight": "#9daaf1",
  "PalettePrimaryMain": "#546be7",
  "PalettePrimaryDark": "#2e40a5",
  "PalettePrimaryDarker": "#22307c",
  "PalettePrimaryText": "#4c64e1",
  "PalettePrimaryHeading": "#182257",
  "PalettePrimaryHighlight": "#dbe0fa",
  "PaletteDangerLighter": "#fff0ee",
  "PaletteDangerLight": "#fe8f7a",
  "PaletteDangerMain": "#e72500",
  "PaletteDangerDark": "#951800",
  "PaletteDangerDarker": "#711200",
  "PaletteDangerText": "#d92300",
  "PaletteDangerHeading": "#500d00",
  "PaletteDangerHighlight": "#ffd8d1",
  "PaletteWarningLighter": "#fcf6ac",
  "PaletteWarningLight": "#eb9e05",
  "PaletteWarningMain": "#a16c03",
  "PaletteWarningDark": "#664402",
  "PaletteWarningDarker": "#4c3302",
  "PaletteWarningText": "#966603",
  "PaletteWarningHeading": "#352401",
  "PaletteWarningHighlight": "#fce101",
  "PaletteSuccessLighter": "#defae7",
  "PaletteSuccessLight": "#59c282",
  "PaletteSuccessMain": "#16884a",
  "PaletteSuccessDark": "#0e562f",
  "PaletteSuccessDarker": "#0a4023",
  "PaletteSuccessText": "#197f48",
  "PaletteSuccessHeading": "#072e19",
  "PaletteSuccessHighlight": "#94f5b3",
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
  "TransitionDurationMain": "100ms",
  "TypographyColorBody": "#272727",
  "TypographyColorHeading": "#272727",
  "TypographyColorInverse": "#ffffff",
  "TypographyColorSupport": "#4b4b4b",
  "TypographyColorSubordinate": "#6e6e6e",
  "TypographyColorDisabled": "#aeaeae",
  "TypographyColorAction": "#4c64e1",
  "TypographyColorDanger": "#d92300",
  "TypographyColorSuccess": "#197f48",
  "TypographyColorWarning": "#966603",
  "TypographyFamilyBody": "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
  "TypographyFamilyHeading": "'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
  "TypographyFamilyButton": "'Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif",
  "TypographySizeSubordinate": "0.857rem",
  "TypographySizeBody": "1rem",
  "TypographySizeHeading6": "1.143rem",
  "TypographySizeHeading5": "1.286rem",
  "TypographySizeHeading4": "1.571rem",
  "TypographySizeHeading3": "2rem",
  "TypographySizeHeading2": "2.286rem",
  "TypographySizeHeading1": "2.571rem",
  "TypographyWeightBody": "400",
  "TypographyWeightBodyBold": "600",
  "TypographyWeightHeading": "500",
  "TypographyWeightHeadingBold": "700",
  "TypographyLineHeightBody": 1.5,
  "TypographyLineHeightUi": 1.2,
  "TypographyLineHeightOverline": 1.3,
  "TypographyLineHeightHeading6": 1.3,
  "TypographyLineHeightHeading5": 1.3,
  "TypographyLineHeightHeading4": 1.25,
  "TypographyLineHeightHeading3": 1.25,
  "TypographyLineHeightHeading2": 1.2,
  "TypographyLineHeightHeading1": 1.2,
  "TypographyLineLengthMax": "55ch"
}
```

## Customization examples

The following examples illustrate the impact of basic changes:

### Color change

* `PalettePrimaryMain` from `#546be7` (blue) to `#D11DCA` (magenta)
* `TypographyColorBody` from `#272727` (dark gray) to `#00297A` (navy blue)
* `TypographyColorHeading` from `#272727` (dark gray) to `#00297A` (navy blue)

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

* `BorderRadiusMain` from `6px` to `24px`
* `Spacing5` from `1.71428571rem` (24 px, default) to `2.85714286rem` (40 px)

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
