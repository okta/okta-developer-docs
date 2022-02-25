---
title: Customize your Okta experience with the Brands API
excerpt: How to use the Brands API to rapidly customize the theme of your Okta org
layout: Guides
---

This guide explains how to use the Brands API to rapidly customize the theme of your Okta org. You can customize the colors, icons, and background images in your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard.

---

**Learning outcomes**

- Use the Brands API to customize the theme of your Okta org.
- Customize the email templates of your Okta org.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* Access to the Brands API: `/api/v1/brands`. Contact [Okta support](https://support.okta.com/help) for help.
* The Brands Postman collection allows you to test the API calls that are described in this guide. Click **Run in Postman** to add the collection to Postman. See [Use Postman with the Okta REST APIs](/code/rest/#set-up-your-environment) for more details.

  [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1d58ab8a3909dd6a3cfb)

---

## About theme customization of your Okta org

Okta provides you with a lot of power to authenticate your users, and using the [Okta-hosted Sign-In Widget](/docs/concepts/hosted-vs-embedded/#okta-hosted-widget) gets you up and running quickly, without having to write much custom code or host the sign-in functionality yourself. However, the trade-off is that your [customization options](/docs/guides/custom-widget/) are more limited, and potentially tricky to administer (with the existing functionality you tend to need to set colors, icons, and so on, in multiple places).

The [Brands API](/docs/reference/api/brands/) allows you to set all of the following items across your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard all at once:

* Primary color
* Secondary color
* Logo
* Favicon
* Background image

## Important: Overriding themes in the code template editors

You can customize individual parts of your Okta org experience using the various code editors available in the Okta Admin Console (for example, **Settings** > **Customizations** > **Custom Sign-in** to customize the Okta-hosted sign-in page). However, when you use the Brands API, your custom brand settings won't apply to theme settings you've customized.

For example, if you update the sign-in page code using the editor and change the background image or logo setting, your customizations may override the values of the Theme objects. To get your Theme object values back, reset the code editors in the Admin Console to the default settings. See [Edit email templates](/docs/guides/custom-email/main/#edit-email-templates).

## Get info about brands and themes

At the top level, Your Okta org contains a brand, which contains a default theme. The default brand is applied to your org's subdomain/[custom domain](/docs/guides/custom-url-domain/) if you have specified one.

> **Note:** Currently, each org can contain only one brand and one theme. However, we are working on a plan to allow multiple themes and multiple brands per org, so stay tuned!

### Get brands

You can return the brands with the following request (**Get brands** in Postman):

<ApiOperation method="get" url="/api/v1/brands" />

This returns an array of [brand response objects](/docs/reference/api/brands/#brand-response-object). You can try this in Postman by running the Get brands request.

You can also return a specific brand by running the **Get brand** request. Before you run the request, you'll need to set the `brandId` variable in Postman, which is used in the request, as seen below.

> **Tip:** The easiest way to set a variable in Postman is to highlight the value that you want to assign to the variable (for example, you can find the ID of a specific brand in the brand response object returned by `GET /api/v1/brands`), right/Ctrl + click on the value, and select **Set: _your-environment-name_ > _your-variable-name_**.

<ApiOperation method="get" url="/api/v1/brands/${brandId}" />

This returns a single brand response object.

### Get themes

You can return the themes contained in a brand with the following request (**Get themes** in postman):

<ApiOperation method="get" url="/api/v1/brands/${brandId}/themes" />

This returns an array of [theme response objects](/docs/reference/api/brands/#theme-response-object).

Once you've set the `themeId` variable to a specific theme ID, you can return a specific theme response object using the following request (**Get theme** in Postman):

<ApiOperation method="get" url="/api/v1/brands/${brandId}/themes/${themeId}" />

This returns a [theme response object](/docs/reference/api/brands/#theme-response-object) that contains all the details of your theme, including logo, favicon, colors, and background image.

## Update your brand

You can also update brand information with the following request (**Update brand** in Postman):

<ApiOperation method="put" url="/api/v1/brands/${brandId}" />

This request needs to contain a [brand object](/docs/reference/api/brands/#brand-object) in the body that contains updates to privacy policy information:

``` json
{
  "agreeToCustomPrivacyPolicy": true,
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}
```

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

## Customize email notifications

Okta provides many customizable **email templates**. For example, the `welcome` email template allows users to activate their account. Each template has **default content** that is translated into any one of the [supported languages](#supported-languages).

The following constraints apply to email customizations:

- If an email template has any customizations, one of them must be the default (where `isDefault` is `true`). The default customization is used when no other customization applies to the user's language settings.
- Each email template can have only one customization for each [supported language](#supported-languages).

> **Note:** If you change any email code using the [Admin Console](/docs/guides/custom-email/main/#edit-a-default-email-template), your customizations override the Brands API settings. To get your Brands API settings back, reset the code editors in the Admin Console to the default settings.

### Supported languages

You can create email customizations for the following languages. Language values must be in [BCP 47 language tag](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) format.

| Language               | BCP 47 Language Tag |
| ---------------------- | ------------------- |
| Czech                  | `cs`                |
| Danish                 | `da`                |
| German                 | `de`                |
| Greek                  | `el`                |
| English                | `en`                |
| Spanish                | `es`                |
| Finnish                | `fi`                |
| French                 | `fr`                |
| Hungarian              | `hu`                |
| Indonesian             | `id`                |
| Italian                | `it`                |
| Japanese               | `ja`                |
| Korean                 | `ko`                |
| Malaysian              | `ms`                |
| Norwegian              | `nb`                |
| Dutch                  | `nl-NL`             |
| Polish                 | `pl`                |
| Portuguese             | `pt-BR`             |
| Romanian               | `ro`                |
| Russian                | `ru`                |
| Swedish                | `sv`                |
| Thai                   | `th`                |
| Turkish                | `tr`                |
| Ukrainian              | `uk`                |
| Vietnamese             | `vi`                |
| Chinese (Simplified)   | `zh-CN`             |
| Chinese (Traditional)  | `zh-TW`             |

### Email template operations

#### List email templates

You can list all supported email templates (**List email templates** in Postman):

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email" />

This operation returns a [paginated](/docs/reference/core-okta-api/#pagination) list of [email template resources](#/docs/reference/api/brands/#email-template).

#### Get an email template

You can fetch a specific email template corresponding to `templateName` (**Get email template** in Postman).

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}" />

This operation returns the requested [email template](/docs/reference/api/brands/#email-template) resource.

#### Get the default content of an email template

You can fetch the default content of a specific email template (**Get email template default content** in Postman).

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/default-content" />

This operation returns the [default content](/docs/reference/api/brands/#email-content) resource for the specified template.

#### Preview the default content of an email template

You can fetch a preview of the default content of a specific email template (**Preview email template default content** in Postman).

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/default-content/preview" />

This operation returns the [default content](/docs/reference/api/brands/#email-content) resource of the specified email template, with the variables populated with the current user's context.

#### Send a test email

You can send a test email (**Send test email** in Postman).

<ApiOperation method="post" url="/api/v1/brands/${brandId}/templates/email/${templateName}/test" />

The following priorities determine the content of the test email:

- The email customization for the language specified in the `language` query parameter
- The default customization of the email template
- The default content of the email template, translated to the current user's language

On success, this operation returns a `204 No Content` message.

#### List email customizations

You can list all customizations for a specific email template (**List email customizations** in Postman).

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations" />

This operation returns a [paginated](/docs/reference/core-okta-api/#pagination) list of [email customization](/docs/reference/api/brands/#email-customization) resources.

#### Create email customizations

You can create a new email customization (**Create email customization** in Postman).

<ApiOperation method="post" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations" />

The request body needs an [email customization](#email-customization) resource. The operation returns the created email customization.

> **Note:** If this is the first customization being created for the email template, `isDefault` is set to `true`.

#### Delete the customizations of an email template

You can delete all customizations made to a specific email template (**Delete all email customizations** in Postman).

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations" />

On success, this operation returns a `204 No Content` message.

#### Get an email customization

You can fetch a specific email customization (**Get email customization** in Postman).

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}" />

This operation returns the requested [email customization](/docs/reference/api/brands/#email-customization) resource.

#### Update an email customization

You can update a specific email customization (**Update email customization** in Postman).

<ApiOperation method="put" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}" />

The request body needs an [email customization](#email-customization) resource. The operation returns the updated email customization.

> **Note:** If `isDefault` is `true`, the previous default email customization has `isDefault` set to `false`.

#### Delete an email customization

You can delete a specific customization made to an email template (**Delete email customization** in Postman).

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}" />

On success, this operation returns a `204 No Content` message.

If the email customization to be deleted is the default, this operation returns a `409 Conflict` message.

#### Preview an email customization

You can fetch a preview of the customizations of an email template (**Preview email customization** in Postman).

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}/preview" />

This operation returns the [default content](/docs/reference/api/brands/#email-content) resource of the specified email template, with the variables populated with the current user's context.

## See also

* [Brands API reference](/docs/reference/api/brands/)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/)
* [Customize email notifications and email domains](/docs/guides/custom-email/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
