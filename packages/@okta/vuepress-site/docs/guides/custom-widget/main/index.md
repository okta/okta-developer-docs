---
title: Style the Sign-In Widget
excerpt: Learn how to customize the self-hosted sign-in Widget and the Okta-hosted sign-in Widget.
layout: Guides
---

This guide explains how to customize the Sign-In Widget when Okta is hosting it or when you are embedding it in your app.

---

**Learning outcomes**

* Add stylesheets and custom JavaScript.
* (Self-hosted) Modify strings and customize localization content.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* (Okta-hosted) [Custom URL domain](/docs/guides/custom-url-domain/main/)
* (Self-hosted) [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#embedded-self-hosted) installed into your project with configured authentication scenarios

**Sample code**

* [Okta-hosted](#use-macros-and-request-context)
* [Self-hosted](#style-the-self-hosted-sign-in-widget)
* [Customization examples](#customization-examples)

---

## About the Sign-In Widget

The Okta Sign-In Widget is a JavaScript library that gives you a fully-featured and customizable sign-in experience that you can use to authenticate users on any website. How you customize the Widget depends on whether Okta is hosting it or you are embedding it in your app (self-hosting the Widget).

* Okta-hosted Sign-In Widget: Okta hosts the sign-in page that appears when your applications redirect to Okta to sign users in. You can customize the Okta-hosted sign-in page using easy controls or an embedded HTML editor that is provided. See [Style the Okta-hosted Sign-In Widget](#style-the-okta-hosted-sign-in-widget).

* Self-hosted Sign-in Widget: After you have [installed the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#embedded-self-hosted) into your project and configured the authentication scenarios that you want to support, you can then customize the widget. You can apply customizations to match your branding using CSS and JavaScript. See [Style the self-hosted Sign-In Widget](#style-the-self-hosted-sign-in-widget).

## Style the Okta-hosted Sign-In Widget

You can add any HTML, CSS, or JavaScript to the sign-in page and also customize the sign-in page [per application](#per-application-customization) and with multiple brands. This page covers what you can change when you are using the Okta-hosted Sign-In Widget, how to use the macros and request context, and also how to bypass the custom sign-in page.

> **Note:** Before you can get started customizing the Okta-hosted sign-in page, you must have already customized your [Okta URL domain](/docs/guides/custom-url-domain/), unless you are using the [Brands API](/docs/guides/customize-themes).

### Edit the sign-in page

The **Custom Sign-In Page** offers basic and advanced customization options to create a completely transformed sign-in experience.

> **Note:** Before you can get started customizing the Okta-hosted sign-in page, you must have already customized your [Okta URL domain](/docs/guides/custom-url-domain/), unless you are using the [Brands API](/docs/guides/customize-themes).

To access this page:

* Okta Identity Engine: In the Admin Console, go to **Customizations** > **Sign-in page code editor**.
* Okta Classic Engine: In the Admin Console, go to **Settings** > **Customization**. On the **Customization Page**, click the **Custom Sign in** tab.

### Change the Okta Sign-In Widget version

The Okta-hosted sign-in page uses the [Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-hosted-sign-in-page-default) component to interact with the user. If you aren't familiar with the Okta Sign-In Widget, Okta recommends that you select the highest **Major Version** and the latest **Minor Version** (default). For details about the Okta Sign-In Widget capabilities that are supported by major and minor versions, see the [GitHub releases page](https://github.com/okta/okta-signin-widget/releases).

1. To make changes to the major and minor versions, select **Edit** in the **Okta Sign-In Widget Version** section header.
2. Make your changes, and then click **Save** at the bottom of the page.

### Change headings and labels

To change the heading and labels, and to customize help links on the sign-in page, make changes to the **Sign-In Page** section.

1. Click **Edit** in the **Sign-In Page** section header.
2. Use the form fields on the left side of the page to customize links, labels, and headings.

You can also customize the placeholder text that appears in recovery flows when end users click account recovery links (for example, Forgot password and Unlock account). If you leave a label field blank, Okta uses the default text.

> **Note:** Although Okta displays default labels, links, and headings in the end user's display language or browser language, Okta doesn't display localized versions of customized text and links. Text that you change here is hard-coded. To specify multiple localized versions of headings and labels, use the [Sign-in Widget text configuration options](https://github.com/okta/okta-signin-widget/#language-and-text).

### Use the embedded HTML editor

If you are familiar with using HTML and want to change the page layout, colors, button shapes, and other elements, use the embedded HTML editor in the middle of the page. You can modify the current HTML/CSS and JavaScript or paste your own code.

1. Make changes directly in the embedded editor.
2. Click **Preview** to preview your changes before you publish.
3. Click **Reset to Default** if you need to remove all of your customizations and restore the default HTML/CSS and JavaScript code.
4. Click **Save and Publish** when you finish.

> **Note:** See the [Customization examples](#customization-examples) section for examples that you can alter and use on your hosted sign-in page.

### Use the Brands API

The [Brands API](/docs/reference/api/brands/) is a feature (currently in Early Access) that allows you to set icons, images, and colors across your Okta-hosted sign-in widget, error pages, email templates, and End-User Dashboard all at once, without needing to set a customized Okta URL domain. To find out more about this feature and how to use it, see [Customize your Okta experience with the Brands API](/docs/guides/customize-themes).

### Bypass the Custom Sign-In Page

Use the `/login/default` backdoor sign-in URL to bypass the custom sign-in page. If, for example, something goes wrong with your customizations and your sign-in page won't load, add `/login/default` to the end of your Okta URL to bring up the default sign-in page and enter your credentials:

```
https://${yourOktaDomain}/login/default
```

This URL only bypasses changes that you have made to the HTML in the HTML editor. It doesn't bypass changes that you made using the controls on the left side of the page.

### Use macros and request context

The following macros in the HTML contain the configuration parameters for certain page elements. These macros inject specific content or functionality automatically.

#### <span v-pre>`{{pageTitle}}`</span>

Inserts the page title.

Example:

```html
<title>{{pageTitle}}</title>
```

#### <span v-pre>`{{{SignInWidgetResources}}}`</span>

Inserts the JavaScript and CSS files required to use the Okta Sign-In Widget.

#### <span v-pre>`{{bgImageUrl}}`</span>

Inserts a URL to the background image configured in your Okta organization. This setting can be changed by selecting **Customization**, and then **Appearance**.

Example:

```html
<div class="login-bg-image" style="background-image: {{bgImageUrl}}"></div>
```

#### <span v-pre>`{{{OktaUtil}}}`</span>

Defines a global `OktaUtil` JavaScript object that contains methods used to complete the Okta sign-in flow. When an application uses the Okta-hosted sign-in page to sign a user in, information (called request context) is available about the target application and the request.

### Request context

By calling the `OktaUtil.getRequestContext()` method, JavaScript code on your sign-in page can inspect the current request and make decisions based on the target application or other details.

If you're using Okta Identity Engine, the following object is returned by invoking `OktaUtil.getRequestContext()`:

```json
{
  "app": {
    "type": "object",
    "value": {
      "name": "sample_client",
      "label": "Demo App",
      "id": "0oadday782XUlHyp90h3"
    }
  },
  "authentication": {
    "type": "object",
    "value": {
      "request": {
        "max_age": -1,
        "scope": "openid",
        "display": "page",
        "response_type": "code",
        "redirect_uri": "https://example.com/enduser/callback",
        "state": "VqpCUgGCSYkbwuCfnqHLSehAJvI5En1XxtywWxfiGSXQ0bVeSNKMh4gscswtUhPa",
        "code_challenge_method": "S256",
        "nonce": "i2Q3rgA3fPGx3f9yfuglKc0PdzZRB8tODSoJFWMZSccH6Hi4dhIXGl6PNFj0pyUo",
        "code_challenge": "C0bfLXeyH61AWEyznLh-JsZP55uJTJqxGAhXBcH-lO8",
        "response_mode": "query"
      },
      "protocol": {},
      "issuer": {
        "name": "default",
        "uri": "https://{yourOktaDomain}/oauth2/default"
      }
    }
  }
}
```

Okta Classic Engine users get the following object returned from `OktaUtil.getRequestContext()`:

```json
{
  "target": {
    "clientId": "0oadday782XUlHyp90h3",
    "name": "sample_client",
    "label": "Demo App"
  },
  "authentication": {
    "request": {
      "scope": "openid",
      "response_type": "code",
      "redirect_uri": "https://example.com/debug",
      "state": "asdf",
      "response_mode": "form_post"
    },
    "client": {
      "name": "Demo App",
      "id": "0oadday782XUlHyp90h3"
    },
    "issuer": {
      "name": "default",
      "id": "ausblkmh242Vtu5430h2",
      "uri": "https://{yourOktaDomain}/oauth2/default"
    }
  }
}
```

For an OpenID Connect application, the application's client ID is stored in the request context object and is retrievable using the following commands:

```javascript
// Identity Engine
OktaUtil.getRequestContext().app.value.id
// Classic
OktaUtil.getRequestContext().target.clientId
```

There is also additional information available about the client app, such as `label`.

> **Note:** The `getRequestContext()` method only returns a value when the Okta-hosted sign-in page is loaded in the context of an application (such as SP-initiated flows in SAML or the `/authorize` route for OpenID Connect). Otherwise, it returns `undefined`.

See [Per-application customization](#per-application-customization) for an example of what you can do with request context.

> **Note:** The following macros are only available when the Theme Builder feature is enabled in your org.

#### <span v-pre>`{{themedStylesUrl}}`</span>

Inserts the URL for the themed style sheet

Example:

```html
 <link href="{{themedStylesUrl}}" rel="stylesheet" type="text/css">
```

#### <span v-pre>`{{faviconUrl}}`</span>

Inserts the URL for the favicon

Example:

```html
 <link rel="shortcut icon" href="{{faviconUrl}}" type="image/x-icon"/>
```

## Style the self-hosted Sign-In Widget

This section discusses the customization options that you have when you are self-hosting the Sign-In Widget.

### Initial sign-in page

You can modify the look of the initial sign-in page using parameters in the `config` section of the main Widget initialization block.

<div class="three-quarter">

![Screenshot of basic Okta Sign-In Widget](/img/siw/widget_theming.png)

<!--
Image source: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3238%3A30940  widget-theming
 -->

</div>

### Logo

```javascript
var config = {
  ...
  logo: '/path/to/logo.png',
  ...
};

var signIn = new OktaSignIn(config);
```

### Custom buttons

You can add buttons below the **Sign In** button.

```javascript
var config = {
  ...
  customButtons: [
    {
      title: 'Click Me 1',
      className: 'btn-customAuth',
      click: function() {
          // clicking on the button navigates to another page
          window.location.href = 'http://www.example1.com';
        }
    },
    {
      title: 'Click Me 2',
      className: 'btn-customAuth',
      click: function() {
          // clicking on the button navigates to another page
          window.location.href = 'http://www.example2.com';
      }
    }
  ],
  ...
};
```

### Links

You can also change the **Help**, **Forgot Password**, and **Unlock** links, including both their text and URLs.

```javascript
var config = {
  ...
  helpLinks: {
    help: 'https://example.com/help',
    forgotPassword: 'https://example.com/forgot-password',
    unlock: 'https://example.com/unlock-account',
    custom: [
      {
        text: 'What is Okta?',
        href: 'https://example.com/what-is-okta'
      },
      {
        text: 'Example Portal',
        href: 'https://example.com'
      }
    ]
  },
  ...
};
```

### Modify the CSS

In addition to the parameters in the Widget's `config`, you can also modify the CSS or override the default styles with your own.

### CSS customization examples

This section provides examples that you can use to make your own customizations to the widget.

#### Background

```css
#okta-sign-in.auth-container.main-container {
  background-color: red;
}

#okta-sign-in .beacon-blank {
  background-color: red;
}
```

#### Border color

```css
#okta-sign-in.auth-container.main-container {
  border-color: red;
}

#okta-sign-in.auth-container .okta-sign-in-header {
  border-bottom-color: red;
}
```

#### Text color

All text:

```css
#okta-sign-in * {
  color: red;
}
```

**Sign In** text:

```css
#okta-sign-in.auth-container .o-form-head {
  color: red;
}
```

Link text:

```css
#okta-sign-in.auth-container a.link:link {
  color: red;
}
```

#### Widget positioning + width

Width:

```css
#okta-sign-in {
  width: 600px;
}
```

Position:

```css
#okta-sign-in {
  margin: 100px auto 8px;
}
```

#### Identity Provider buttons

```css
#okta-sign-in.auth-container .custom-style {
  background: url(logo.png) no-repeat 10px, linear-gradient(90deg, hotpink 50px, lightpink 0);
}
```

### Video Tutorial

For a more in-depth look at styling the widget, you can watch this video:

<div style="text-align: center">

<iframe width="100%" class="video-tutorial" height="315" src="https://www.youtube.com/embed/Q__ugprsOWo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

### Modify strings

To modify strings in the Widget, you can override any of the properties set in [login.properties](https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/src/properties/login.properties). You override these properties by specifying new values for them inside an `i18n` object in the Widget's `config` section.

You can modify any of the labels found in the Widget by providing new values for them.

```javascript
var config = {
  ...
  i18n: {
      en: {
        // Labels
        'primaryauth.title': 'ExampleApp Login',
        'primaryauth.username.placeholder': 'ExampleApp ID',
        'primaryauth.username.tooltip': 'Enter your ExampleApp ID',
        'primaryauth.password.placeholder': 'Password',
        'primaryauth.password.tooltip': 'Super secret password',
        // Errors
        'error.username.required': 'Please enter an ExampleApp ID',
        'error.password.required': 'Please enter a password',
        'errors.E0000004': 'Sign in failed!'
      }
  }
  ...
};
```

For more information about these configuration options, see the [Okta Sign-In Widget Reference page](https://github.com/okta/okta-signin-widget#language-and-text).

### Localization

If you want to display different strings depending on the user's language, you can specify this using the following structure:

```javascript
lang: {
  'key': 'value'
}
```

- `lang`: one of the [i18n country abbreviations](https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/src/properties/country.properties)
- `key`: a string specified in [login.properties](https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/src/properties/login.properties)
- `value`: A new value for that string

**Example**

```javascript
var config = {
  baseUrl: 'https://${yourOktaDomain}',
  ...
  i18n: {
    'en': {
      'primaryauth.title': 'Sign in to ExampleApp'
    },
    'es': {
      'primaryauth.title': 'Iniciar sesión en ExampleApp'
    },
    'zh-CN': {
      'primaryauth.title': '登录 ExampleApp'
    },
    'zh-TW': {
      'primaryauth.title': '登錄入 ExampleApp'
    }
  },
  ...
};
```

## Customization examples

Use the following examples to help you customize the sign-in page with your own CSS, scripts, and per-application branding.

### Add your own stylesheet

You can add your own stylesheet to extend the look of the sign-in page. In the embedded HTML editor, add a link to your stylesheet in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

Example:

```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />
    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}

    <!-- Custom styles for your sign-in page -->
    <link rel="stylesheet" type="text/css" href="http://example.com/yourCustomStyleSheet.css">
</head>
...
```

### Add your own scripts

You can add custom JavaScript code to the sign-in page. In the embedded HTML editor, add a script in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

Example:

```html
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="none" />
    <title>{{pageTitle}}</title>
    {{{SignInWidgetResources}}}

    <!-- Add your scripts here -->
    <script src="https://example.com/yourCustomScript.js"></script>

    <!-- Or, inline scripts -->
    <script>
      // Do something
    </script>
</head>
...
```

### Per-application customization

The Okta-hosted sign-in page is application-aware. This means that your client-side customizations can understand which application caused the sign-in page to load. This is useful when you have multiple applications or brands that you want to support.

When the page renders, an object called `OktaUtil` exists on the page. By calling the `OktaUtil.getRequestContext()` method, scripts on the page can get details about the current request.

To access the application's client ID (which uniquely identifies the application), write a function to safely get the client ID from the request context:

```html
// Identity Engine
<script>
  function getClientId() {
    if (!OktaUtil) return undefined;

    var requestContext = OktaUtil.getRequestContext();
    if (requestContext && requestContext.app && requestContext.app.value.id) {
      return requestContext.app.value.id;
    }
  }
</script>

// Classic
<script>
  function getClientId() {
    if (!OktaUtil) return undefined;

    var requestContext = OktaUtil.getRequestContext();
    if (requestContext && requestContext.target && requestContext.target.clientId) {
      return requestContext.target.clientId;
    }
  }
</script>
```

Elsewhere in your file, using the method above, you can inspect the client ID and take action. For example, if you had a CSS file on your server that was for a particular client's CSS:

> **Note:** To locate the client ID for an app, in the Admin Console, go to **Applications** > **Applications**. Select the app integration that you need the client ID for. On the **General** tab, copy the ID from the **Client ID** box in the **Client Credentials** section.

```html
<script>
  var clientId = getClientId();

  if (clientId === '00exampleclientid'){
    // add application-specific CSS
    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = 'https://example.com/styles/' + clientId + '.css';
    head.appendChild(link);
  }
</script>
```

## See also

For information about other Okta customization options:

* [Customize the Okta URL domain](/docs/guides/custom-url-domain/)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/)
* [Customize SMS messages](/docs/guides/custom-sms-messaging)
* [Customize email notifications and email domains](/docs/guides/custom-email/)