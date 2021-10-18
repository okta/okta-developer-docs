---
title: Customize your Okta experience with the Brands API
excerpt: How to use the Brands API to rapidly customize the theme of your Okta org
layout: Guides
---

<ApiLifecycle access="ea" />

This article explains how to use the Brands API to rapidly customize the theme of your Okta org, including colors, icons, and background images in your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard.

## Overview

Okta provides you with a lot of power to authenticate your users, and using the [Okta-hosted Sign-In Widget](/docs/concepts/hosted-vs-embedded/#okta-hosted-widget) gets you up and running quickly, without having to write much custom code or host the sign-in functionality yourself. However, the trade off is that your [customization options](/docs/guides/style-the-widget/before-you-begin/) are more limited, and potentially tricky to administer (with the existing functionality you tend to need to set colors, icons, and so on, in multiple places).

The [Brands API](/docs/reference/api/brands/) allows you to set all of the following items across your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard all at once:

* Primary color
* Secondary color
* Logo
* Favicon
* Background image

## Before you begin

You need to make sure that you have an [Okta organization](/docs/guides/quickstart/cli/create-org/) set up to test this functionality, and you need to request access to the Brands API from [Okta support](https://support.okta.com/help).

It is up to you how you make requests to the API to update your branding. In this guide, we are demonstrating the required API calls using a Postman collection to demonstrate them in a language/platform neutral way. To run the API calls:

1. [Create an API token](/docs/guides/create-an-api-token/main/) to use when accessing the API.
1. [Download](https://www.postman.com/downloads/) and install Postman.
1. After you install Postman, import the Okta environment and add your Okta domain and API token to Postman, as explained in [Use Postman with the Okta REST APIs > Set up your environment](/code/rest/#set-up-your-environment).
1. Click **Run in Postman** to add the Brands collection to Postman, which allows you to test the API calls that are described below.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1d58ab8a3909dd6a3cfb)

## Important: overriding themes in the code template editors

You can customize individual parts of your Okta org experience using the various code editors we've made available in the Okta Admin Console (for example, **Settings** > **Customizations** > **Custom Sign-in** to customize the Okta-hosted sign-in page). Note that when you use the Brands API, your custom brand settings won't apply to the places where you've customized the theme settings.

So for example, if you make changes to the sign-in page code using the editor referenced above and change the background image or logo setting, your customizations override the Brands API settings. To get your Brands API settings back, reset the code editors to the default code again.

## Top-level overview: Brands and themes

At the top level, Your Okta organization contains a brand, which contains a default theme. The default brand is applied to your organization's subdomain/[custom domain](https://developer.okta.com/docs/guides/custom-url-domain/overview/) if you have specified one.

  > **Note:** Currently, each org can contain only one brand and one theme. However, we are working on a plan to allow multiple themes and multiple brands per org, so stay tuned!

### Get brands

You can return the brands with the following request (**Get brands** in Postman):

<ApiOperation method="get" url="/api/v1/brands" />

This returns an array of [brand response objects](/docs/reference/api/brands/#brand-response-object). You can try this in Postman by running the Get brands request.

You can also return a specific brand by running the **Get brand** request. Before you run the request, you'll need to set the `brandId` variable in Postman, which is used in the request, as seen below.

  > **Tip:** The easiest way to set a variable in Postman is to highlight the value that you want to assign to the variable (for example, you can find the ID of a specific brand in the brand response object returned by `GET /api/v1/brands`), right/Ctrl + click on the value, and select **Set: _your-environment-name_ > _your-variable-name_**.

<ApiOperation method="get" url="/api/v1/brands/${brandId}" />

This returns a single brand response object.

### Get brands

You can also update brand information with the following request (**Update brand** in Postman):

<ApiOperation method="put" url="/api/v1/brands/${brandId}" />

This request needs to contain a [brand object](/docs/reference/api/brands/#brand-object) in the body that contains updates to privacy policy information:

``` json
{
  "agreeToCustomPrivacyPolicy": true,
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}
```

### Get themes

You can return the themes contained in a brand with the following request (**Get themes** in postman):

<ApiOperation method="get" url="/api/v1/brands/${brandId}/themes" />

This returns an array of [theme response objects](/docs/reference/api/brands/#theme-response-object).

Once you've set the `themeId` variable to a specific theme ID, you can return a specific theme response object using the following request (**Get theme** in Postman):

<ApiOperation method="get" url="/api/v1/brands/${brandId}/themes/${themeId}" />

This returns a [theme response object](/docs/reference/api/brands/#theme-response-object) that contains all the details of your theme, including logo, favicon, colors, and background image.

## Update your theme

In this section we look at how we can update all of the different facets of your theme.

### Update theme colors and asset placement

You can update your theme colors and the settings that dictate where your assets will be used with the following request (**Update theme** in Postman):

<ApiOperation method="put" url="/api/v1/brands/${brandId}/themes/${themeId}" />

The request body needs to contain a JSON object:

``` json
{
  "primaryColorHex": "#1662dd",
  "secondaryColorHex": "#ebebed",
  "signInPageTouchPointVariant": "BACKGROUND_IMAGE",
  "endUserDashboardTouchPointVariant": "FULL_THEME",
  "errorPageTouchPointVariant": "BACKGROUND_IMAGE",
  "emailTemplateTouchPointVariant": "FULL_THEME"
}
```

  > **Note:** The different properties are explained in the [Theme object reference](/docs/reference/api/brands/#theme-object).

  > **Note:** To see your custom colors and image assets being used on your Okta org, you need to set the `...Variant` properties to non-`OKTA_DEFAULT` values when you update your theme. See [Variant definition](/docs/reference/api/brands/#variant-definition) for explanations of the available variant values.

A successful request results in an updated [Theme response object](/docs/reference/api/brands/#theme-response-object).

### Update and delete theme logos and images

You can upload a logo, favicon, and background image for use in your theme (on your email templates, your Okta End-User Dashboard, and so on) with the following requests (**Upload logo**, **Upload favicon**, and **Upload background image** in Postman):

<ApiOperation method="post" url="/api/v1/brands/${brandId}/themes/${themeId}/logo" />
<ApiOperation method="post" url="/api/v1/brands/${brandId}/themes/${themeId}/favicon" />
<ApiOperation method="post" url="/api/v1/brands/${brandId}/themes/${themeId}/background-image" />

The request body needs to be form data with a file property that contains a file to upload. Guidelines are as follows:

* Logos must be in PNG, JPG, or GIF format and less than 1 MB in size. The file dimensions should be less than 3840 x 2160 px. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling.
* Favicons must be in PNG or ICO format and must be in 1:1 ratio with a maximum dimension of 512 x 512 px.
* Background images must be a PNG, JPG, or GIF file, and be less than 2MB in size.

A successful response results in a JSON object that contains the `url` of the uploaded image, such as:

``` json
{
  "url": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png"
}
```

You can also delete these assets using the following requests (**Delete logo**, **Delete favicon**, and **Delete background image** in Postman):

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/themes/${themeId}/logo" />
<ApiOperation method="delete" url="/api/v1/brands/${brandId}/themes/${themeId}/favicon" />
<ApiOperation method="delete" url="/api/v1/brands/${brandId}/themes/${themeId}/background-image" />

## See also

* [Brands API reference](/docs/reference/api/brands/)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/overview/)
* [Customize email notifications and email domains](/docs/guides/email-customization/before-you-begin/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/style-the-widget/style-okta-hosted/)
