---
title: Customize the Okta-hosted error pages
excerpt: Learn how to customize the Okta-hosted error pages to fit your brand.
layout: Guides
---

This guide explains how to customize error pages that can appear as part of a custom domain Okta-hosted sign-in flow.

---

**Learning outcomes**

Customize error pages as part of the sign-in flow.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Customized Okta URL domain](/docs/guides/custom-url-domain/), unless you are using the [Brands API](#use-the-brands-api)

**Sample code**

[Customization examples](#customization-examples)

---

## About error page customization

When using an Okta-hosted flow, you can create a unique sign-in experience by providing a customized [Okta URL domain](/docs/guides/custom-url-domain/) and creating a [Widget style](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget) that matches your application's look and feel.

However, if an error occurs during sign-in, Okta may need to display an error page to the user. To provide a seamless user experience, you can also customize the error page by using an embedded HTML editor.

> **Note:** A custom error page only appears when an app connects to Okta by using your custom domain. Otherwise, the default Okta error page appears.

### Common questions

**In what situations does Okta serve error pages to the user?**

The error page appears when a critical error occurs or an application is misconfigured. See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/#redirect-authentication) for more information on Okta-hosted (redirect) functionality.

**What can I customize on the error page?**

You can add any HTML, CSS, or JavaScript that you want to the page.

### Use the Brands API

The [Brands API](/docs/reference/api/brands/) allows you to set icons, images, and colors across your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard all at once. You don't need to set a customized Okta URL domain. See [Customize your Okta experience with the Brands API](/docs/guides/customize-themes) for more information on this feature and how to use it.

## Edit the error page

The HTML editor that is provided on the **Custom Error Pages** tab of the **Customization** page allows you to modify any HTML, CSS, and JavaScript on the error page.

1. In the Admin Console, select **Settings** and then **Customizations**.
1. Click the **Custom Error Pages** tab.
> **Note**: In Okta Identity Engine, select **Customizations** and then **Error pages code editor** to find the error pages editor.
1. Make changes directly in the embedded **Custom Error Pages** editor.
1. Click **Preview** to preview your changes before you publish.
1. Click **Reset to Default** if you need to remove all of your customizations and restore the default HTML/CSS and JavaScript code.
1. Click **Save and Publish** to commit your changes.

> **Note:** See [Customization examples](#customization-examples) for snippets that you can update and use.

## Use macros

The following macros contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

### <span v-pre>`{{orgName}}`</span>

Inserts the org name title.

Example:

```html
<title>{{orgName}} - {{errorSummary}}</title>
```

### <span v-pre>`{{errorSummary}}`</span>

Inserts the error title text.

Example:

```html
<h2 class="o-form-title">{{errorSummary}}</h2>
```

### <span v-pre>`{{bgImageUrl}}`</span>

Inserts a URL to the background image configured for your application. You can change this image by using the **Sign-in Configuration** option that is accessed by selecting **Settings**, and then **Appearance** from the Admin Console, but this changes the background image in all instances where the macro is used, including your custom sign-in page.

If you want to just change the background image for your custom error pages, include the URL to the image instead of the macro:

Example:

```html
<div class="login-bg-image" style="background-image: url('https://example.com//YourBackgroundImage.png')"></div>
```

### <span v-pre>`{{orgLogo}}`</span>

Inserts the logo image that has been configured for your application. You can change this logo by using the **Organization Logo** option that is accessed by selecting **Settings**, and then **Appearance** from the Admin Console, but this changes the org logo in all instances where the macro is used, including your custom sign-in page.

If you want to just change the logo image for your custom error pages, include the URL to the image instead of the macro:

Example:
```html
<img alt="{{orgName}}" src="https://example.com//SomeOtherImage.png" class="org-logo">
```

### <span v-pre>`{{{errorSummary}}}`</span>

### <span v-pre>`{{{errorDescription}}}`</span>

Inserts a title and detailed description of the error.

Example:

```html
<h2 class="o-form-title">{{errorSummary}}</h2>
<p class="o-form-explain">What happened? {{{errorDescription}}}</p>
```

### <span v-pre>`{{back}}`</span>

Inserts the text `Go to Homepage`. When the user selects the button, they are returned to the sign-in page.

Example:

```html
 <a href="/" class="button">{{back}}</a>
```

### <span v-pre>`{{technicalDetails}}`</span>

Inserts additional error codes, if there are any. See [Okta Error Codes](/docs/reference/error-codes/#okta-error-codes-listed-by-error-code).

Example:

```html
<p class="technical-details">Additional Error Details: {{technicalDetails}}</p>
```

> **Note:** The following macros are only available when the Theme Builder feature is enabled in your org.

### <span v-pre>`{{buttonText}}`</span>

Inserts the button text based on the page context. When the user selects the button, they are directed to the `buttonHref` URL. The `{{back}}` macro is also supported for the same purpose.

### <span v-pre>`{{buttonHref}}`</span>

Inserts the hyperlink for the button

Example:

```html
 <a href="{{buttonHref}}" class="button">{{buttonText}}</a>
```

### <span v-pre>`{{themedStylesUrl}}`</span>

Inserts the URL for the themed style sheet

Example:

```html
 <link href="{{themedStylesUrl}}" rel="stylesheet" type="text/css">
```

### <span v-pre>`{{faviconUrl}}`</span>

Inserts the URL for the favicon

Example:

```html
 <link rel="shortcut icon" href="{{faviconUrl}}" type="image/x-icon"/>
```

## Customization examples

Use the following customization examples to help you personalize your error page by extending the look and feel of the page with your own stylesheet (CSS).

### Add a stylesheet

You can add your own stylesheet to extend the look of your error page.

In the embedded HTML editor, add a link to your stylesheet in the `<head>` section, below the  `<link rel="stylesheet" type="text/css" href="/assets/css/sections/errors-v2.css">` line.

Example:

```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />

    <title>{{orgName}} - {{errorSummary}}</title>

    <link rel="stylesheet" type="text/css" href="/assets/css/sections/errors-v2.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/sections/yourstylesheet.css">
</head>
```

### Add styles inline

Alternatively, you can add styles inline for elements of your error page.

Example:

```html
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="none" />

<title>{{orgName}} - {{errorSummary}}</title>

<link rel="stylesheet" type="text/css" href="/assets/css/sections/errors-v2.css">
<style>
    .content {
    background: yellow;
    font: normal bold 20pt Tahoma;
    }
</style>
</head>
```

## Next steps

You should now understand how to customize the error page.

Read more about other customization options:

* [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)