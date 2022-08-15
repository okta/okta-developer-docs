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
* [Customized Okta URL domain](/docs/guides/custom-url-domain/), unless you're using the [Brands API](#use-the-brands-api)
* The full-featured code editor enabled in your org <ApiLifecycle access="ea" />

**Sample code**

[Customization examples](#customization-examples)

---

## About error page customization

When using an Okta-hosted flow, you can create a unique sign-in experience by providing a customized [Okta URL domain](/docs/guides/custom-url-domain/) and creating a [Widget style](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget) that matches your application's look and feel.

However, if an error occurs during sign-in, Okta may need to display an error page to the user. To provide a seamless user experience, you can also customize the error page by using an embedded HTML editor.

> **Note:** A custom error page only appears when an app connects to Okta by using your custom domain. Otherwise, the default Okta error page appears when a critical error occurs or an application is misconfigured. See [Okta deployment models &mdash; redirect vs. embedded](/docs/concepts/redirect-vs-embedded/#redirect-authentication) for more information on Okta-hosted (redirect) functionality.

### Use the Brands API

The [Brands API](/docs/reference/api/brands/) allows you to set icons, images, and colors across your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard all at once. You don't need to set a customized Okta URL domain. See [Customize your Okta experience with the Brands API](/docs/guides/customize-themes) for more information on this feature and how to use it.

## Edit the error page

Use the code editor to modify any HTML, CSS, or JavaScript on the error page. See [Customization examples](#customization-examples) for snippets that you can update and use.

> **Note:** There is no draft mode in the code editor. When you click **Publish**, your changes go live. If you want to test changes without impacting production, use a test or development org.

1. In the Admin Console, go to **Customizations** > **Branding**.
2. In the **Okta-hosted Error Pages box**, click **Edit**.
3. To open the code editor, turn on the toggle next to **Code editor**.
4. Make changes directly in the editor. If you enter `{`, `(`, or `.` you see a list of available variables that you can use. See [Use variables](#use-variables).
   * Click **Preview** to see your changes in a new browser window before you publish.
   * Select **Compare with published version** to see the difference between your edited version and the published version. You can choose between a split view and a unified view.

   > **Note:** The Admin Console auto-saves your changes every few seconds. You can navigate away from the code editor and your updates remain. To discard your changes without publishing them, click **Revert changes** or turn off the toggle next to **Code editor**. The console restores the default HTML/CSS and JavaScript code.

5. Click **Publish** to commit your changes.

## Use variables

The Okta error page template is written using [Mustache](http://mustache.github.io/mustache.5.html) and uses predefined variables to insert relevant values into the error page. To see the variables in a code sample, refer to the error page default code in the code editor. See [Edit the error page](#edit-the-error-page).

> **Note:** Variables with double curly braces (`{{`) return escaped HTML by default. Triple curly braces (`{{{`) are used for the `errorDescription` variable to return unescaped HTML. 

| Variable | Description |
|----------|-------------|
| <span v-pre>`{{orgName}}`</span> | Inserts the org name title |
| <span v-pre>`{{errorSummary}}`</span> | Inserts the error title text |
| <span v-pre>`{{bgImageUrl}}`</span> | Inserts a URL to the background image configured for your application.</br>You can change this image by using the [Sign-in Configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-branding-set-theme) option, but this changes the background image in all instances where the variable is used, including your custom sign-in page.</br>If you want to change only the background image for your custom error pages, include the URL to the image instead of the variable. |
| <span v-pre>`{{orgLogo}}`</span> | Inserts the logo image that has been configured for your application.</br>You can change this logo by using the [Sign-in Configuration](https://help.okta.com/okta_help.htm?type=oie&id=ext-branding-set-theme) option, but this changes the org logo in all instances where the variable is used, including your custom sign-in page.</br>If you want to change only the logo image for your custom error pages, include the URL to the image instead of the variable. |
| <span v-pre>`{{{errorDescription}}}`</span> | Inserts a detailed description of the error |
| <span v-pre>`{{back}}`</span> | Inserts the text "Go to Homepage". When the user selects the button, they are returned to the sign-in page. |
| <span v-pre>`{{technicalDetails}}`</span> | Inserts additional messaging, if the error code has any. Here are sample technical details for an error code:</br>"If you are using custom expressions like `\{0}`, make sure that the field `customField` is present in the user profile. Please review your attribute list and make the appropriate change."</br>See [Okta Error Codes](/docs/reference/error-codes/#okta-error-codes-listed-by-error-code). |
| <span v-pre>`{{buttonText}}`</span> | Inserts the button text based on the page context. When the user selects the button, they are directed to the `buttonHref` URL. The <span v-pre>`{{back}}`</span> variable is also supported for the same purpose. |
| <span v-pre>`{{buttonHref}}`</span> | Inserts the hyperlink for the button |
| <span v-pre>`{{themedStylesUrl}}`</span> | Inserts the URL for the themed style sheet |
| <span v-pre>`{{faviconUrl}}`</span> | Inserts the URL for the favicon |

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

Read more about other customization options:

* [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
* [Style the Okta-hosted Sign-In Widget](/docs/guides/custom-widget/main/#style-the-okta-hosted-sign-in-widget)
