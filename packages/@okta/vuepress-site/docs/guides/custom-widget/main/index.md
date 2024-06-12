---
title: Style the sign-in page
excerpt: Learn how to customize the sign-in page for both redirect and embedded authentication models.
layout: Guides
---

This guide explains how to customize the sign-in page for both redirect and embedded deployment models.

---

#### Learning outcomes

* Add style sheets and custom JavaScript.
* (Redirect authentication): Modify strings and customize localization content.

#### What you need

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* (Redirect authentication): [Custom URL domain](/docs/guides/custom-url-domain/main/)
* (Embedded authentication): [Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#embedded-self-hosted) installed into your project with configured authentication scenarios

#### Sample code

* [Redirect authentication](#use-variables-and-request-context)
* [Embedded authentication](#style-for-embedded-authentication)
* [Customization examples](#customization-examples)

---

## About the sign-in page

The sign-in page is a JavaScript library that gives you a fully featured and customizable sign-in experience that you can use to authenticate users on any website. How you customize the sign-in page depends on whether Okta hosts it (redirect authentication) or you embed it in your app (embedded authentication).

* Redirect authentication: Okta hosts the sign-in page that appears when your applications redirect to Okta to sign users in. You can customize the page using easy controls or a code editor that is provided. See [Style for redirect authentication](#style-for-redirect-authentication).

* Embedded authentication: After you've [installed the Okta Sign-In Widget](https://github.com/okta/okta-signin-widget#embedded-self-hosted) in your project, configure the authentication scenarios that you want to support. Then you can customize the sign-in page. Match your branding using CSS and JavaScript to apply customizations. See [Style for embedded authentication](#style-for-embedded-authentication).

## Style for redirect authentication

You can add HTML, CSS, or JavaScript to the sign-in page, customize it [per application](#per-application-customization) and for multiple brands. You can use variables and request context, and bypass the custom sign-in page.

> **Note:** Before you can customize for redirect authentication, you must customize your [Okta URL domain](/docs/guides/custom-url-domain/).

### Content Security Policy (CSP) for your custom domain

Set up a [custom domain](/docs/guides/custom-url-domain/main/) and customize your [CSP](https://content-security-policy.com/) if you also want to customize the sign-in page or error pages. CSP customizations only take effect on custom domains.

To analyze and detect potentially malicious IP addresses that seek to bypass your CSP, use [Okta ThreatInsight](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-threatinsight).

#### Known limitations

* Avoid using `meta` tags to customize the CSP. `meta` tags impact the overall policy. It's easier to control CSP customizations by adding trusted external resources in the Admin Console. See [Customize the Content Security Policy (CSP) for a custom domain](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-csp).
See also [Multiple content security policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#multiple_content_security_policies).
* If you add too many trusted external resources to your custom CSP, the HTTP header size can exceed the limit allowed by some server software. Update the default server limits or reduce the number of trusted external resources.
* You can have a maximum of 20 URIs.
* If you add a trusted origin URL that redirects to a different URL, you need to include the redirect URL on the trusted origin list.

<!-- nonce not supported yet
#### Add a nonce reference

Add a [`nonce`](https://content-security-policy.com/nonce/) reference to your HTML if you want to customize the Okta-hosted sign-in page or error pages. Without the `nonce` reference, when you turn on your CSP customizations, your `script` and `style` tags don't run.

To add the `nonce` reference, include it as a variable in the code editor. See [Use the code editor](#use-the-code-editor).

Example:

```html
<style nonce="{{nonceValue}}">
```
-->

#### Configure the default CSP

1. In the Admin Console, go to **Customizations** > **Brands**.
2. In the **Pages** panel in the **Sign-in Page** section, click **Configure**.
3. Click **Settings**.
4. In the **Content Security Policy** panel, click **Edit**. Set the following:

   - **Trusted external resources**: Add resources to the CSP. For example: mydomain.com, *.mydomain.com, or mydomain.com/images. Click **Add**.
     > **Note:** Okta adds these resources to all fetch-directives in the CSP.
   - **Report URI**: Enter the URI to which you want to send violation report details. The URI entered here appears in the report-uri directive of the CSP.
   - **Enforcement**:
     - Select **Enforced** to block any resources that the CSP doesn't trust. The header is `content-security-policy`.
     - Use **Not enforced** to leave the customized CSP in the report-only header (`content-security-policy-report-only`). Use this option for testing and validation before turning on **Enforced** mode.
5. Click **Save to draft**.
6. Make changes directly in the editor. See steps 4 and 5 in [Edit the sign-in page](#edit-the-sign-in-page).

### Edit the sign-in page

The **Custom Sign-In Page** offers basic and advanced customization options to transform the sign-in experience.

### Use the code editor

Use the code editor to modify any HTML, CSS, or JavaScript on the sign-in page. See [Customization examples](#customization-examples) for snippets that you can update and use.

1. In the Admin Console, go to **Customizations** > **Brands**, and then select the brand you want.
2. In the **Pages** tab, click **Configure** in the **Sign-in page** panel.
3. To open the code editor, turn on the toggle next to **Code editor**.

   > **Note:** You can only enable the code editor if you configure a [custom domain](/docs/guides/custom-url-domain/).

4. Make changes directly in the editor. If you enter `{`, `(`, or `.` you see a list of available variables that you can use. See [Use variables](#use-variables).
   * Click **Save to draft**, then **Preview**, **Revert**, or **Publish**.
   * Select **Compare with published version** to see the difference between your edited version and the published version. You can choose between a split view and a unified view.

   > **Note:** To discard your changes without publishing them, click **Revert changes** or turn off the toggle next to **Code editor**. Turning off the code editor restores the default HTML/CSS and JavaScript code.

> **Note:** See the [Customization examples](#customization-examples) section for examples that you can alter and use on your hosted sign-in page.

### Use the Brands API

The [Brands API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/) is a feature that allows you to set icons, images, and colors across your Okta-hosted sign-in page, error pages, email templates, and End-User Dashboard all at once, without needing to set a customized Okta URL domain.

### Bypass the custom sign-in page

Use the `/login/default` backdoor sign-in URL to bypass the custom sign-in page. If, for example, something goes wrong with your customizations and your sign-in page won't load, add `/login/default` to the end of your Okta URL to bring up the default sign-in page and enter your credentials:

```
https://{yourOktaDomain}/login/default
```

This URL only bypasses changes that you have made to the HTML in the HTML editor. It doesn't bypass changes that you made using the controls on the left side of the page.

### Use variables

The Okta sign-in page template is written with [Mustache](http://mustache.github.io/mustache.5.html) and uses predefined variables to insert relevant values into the sign-in page. To see the variables in a code sample, refer to the error page default code in the code editor. See [Use the code editor](#use-the-code-editor).

Variables with double curly braces (`{{`) return escaped HTML by default. Escaping allows you to show "special" characters in HTML. For example, `<p>hello</p>` displays as a paragraph element and the `<p>` tags don't render. For the `<p>` tags to render, escape or replace the `<p>` tags by using `&lt;p&gt; hello &lt;/p&gt;`. In this example, `&lt;p&gt;` escapes `<` and `&lt;/p&gt;` escapes `>`.

Triple curly braces (`{{{`) are only used for the `errorDescription` variable to return unescaped HTML.

The following variables in the HTML contain the configuration parameters for certain page elements. These variables inject specific content or functionality automatically.

#### <span v-pre>`{{pageTitle}}`</span>

Inserts the page title.

Example:

```html
<title>{{pageTitle}}</title>
```

#### <span v-pre>`{{{SignInWidgetResources}}}`</span>

Inserts the JavaScript and CSS files required to use the Okta sign-in page.

#### <span v-pre>`{{bgImageUrl}}`</span>

Inserts a URL to the background image configured in your Okta organization. This setting can be changed by selecting **Customization**, and then **Appearance**.

Example:

```html
<style>
  #login-bg-image-id {
    background-image: {{bgImageUrl}}
  }
</style>
```

#### <span v-pre>`{{{OktaUtil}}}`</span>

Defines a global `OktaUtil` JavaScript object that contains methods used to complete the Okta sign-in flow. When an application uses the Okta-hosted sign-in page to sign a user in, information (called request context) is available about the target application and the request.

### Use request context

By calling the `OktaUtil.getRequestContext()` method, JavaScript code on your sign-in page can inspect the current request and make decisions based on the target application or other details.

Identity Engine users get the following object returned from `OktaUtil.getRequestContext()`:

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

Classic Engine users get the following object returned from `OktaUtil.getRequestContext()`:

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

There's more information available about the client app, such as `label`.

> **Note:** The `getRequestContext()` method only returns a value when the Okta-hosted sign-in page is loaded in the context of an application. For example, SP-initiated flows in SAML or the `/authorize` route for OpenID Connect. Otherwise, it returns `undefined`.

See [Per-application customization](#per-application-customization) for an example of what you can do with request context.

> **Note:** The following variables are only available when the Theme Builder feature is enabled in your org.

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

### Hide or suppress the transient Sign-In Widget

In Okta Identity Engine, the sign-in page uses a JavaScript redirect method (instead of HTTP 302).

There are two main impacts:

* **Visual:** The Okta Sign-In Widget could appear briefly to end users during the transition, interrupting the custom branded experience.

* **Programmatic:** Non-user (or back-end) authentication flows receive an `HTTP 200 OK` response with a body, instead of an `HTTP 302 Found` redirect status response. As a result, back-end coding doesn't detect the status response and the JavaScript method performs the redirect.

**Resolve the visual impact**

To suppress the brief appearance of the Sign-In Widget, use a [custom domain](/docs/guides/custom-url-domain/main/#about-okta-domain-customization) and update some JavaScript/CSS:

- (Required) In the HTML header, add the following to remove the opacity of the `okta-login-container`:

```html
<style> #okta-login-container{ opacity:0; transition-delay:200ms; transition:opacity 500ms; -webkit-transition:opacity 500ms; /* Safari */ }</style>
```

- (Optional) In the HTML header as part of the JavaScript code block, add the following to allow for additional context that you could use for build-out:

```javascript
var myContext = {
    isLoginHidden: true,
}
```

- (Required) In the HTML body, add the following to access the query string in JavaScript and to toggle the display based on presence:

```javascript
// Get the login container.
var loginContainer = document.getElementById("okta-login-container")

// Utility: Get a Query String Parameters
var urlParams = new URLSearchParams(window.location.search);

// Detect the IDP param
if (urlParams.has("idp")) {
    console.log(urlParams.get('idp')); // just to capture... if additional logic needed
    // Let the Default opacity remain;
} else {
    // Allow the login container to be seen;
    loginContainer.style.opacity = 1;
    myContext.isLoginHidden = false; // (OPTIONAL - if additional Logic needed (would not set opacity)
}
```

- (Optional) In the HTML body, add the following if you need the additional context and there isn't any display of the Sign-In Widget at the bottom of the page build-out:

```javascript
if (myContext.isLoginHidden) {
    // Make sure the login is displayed by default
    console.log('show the login!'); // Indicate login should not be hidden just in case it renders again.
    myContext.isLoginHidden = false; // Show the login container;
    loginContainer.style.opacity = 1;
}
```

**Solutions for the programmatic impact**

Consider alternative integrations within your application. Since the IdP is known, you can redirect for IdP verification for all authentication flows, or leverage the [Web Finger API](/docs/reference/api/webfinger/). However, your integration may be limited based on context.

> **Note:** In OIE, [authentication policy rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-auth-policy) include conditions about the device platform and the target application. The WebFinger API doesn't include device and application details in its responses.

## Style for embedded authentication

This section discusses the customization options that you have when you're self-hosting the sign-in page.

### Initial sign-in page

You can modify the look of the initial sign-in page using parameters in the `config` section of the main initialization block.

<div class="three-quarter">

![Image of basic Okta Sign-In Widget](/img/siw/widget_theming.png)

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

In addition to the parameters in the `config` of the sign-in page, you can also modify the CSS or override the default styles.

This section provides examples that you can use to make your own customizations to the sign-in page.

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

For a more in-depth look at styling the sign-in page, you can watch this video:

<div style="text-align: center">

<iframe width="100%" class="video-tutorial" height="315" src="https://www.youtube.com/embed/Q__ugprsOWo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

### Modify strings

To modify strings on the sign-in page, you can override any of the properties set in [login.properties](https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/src/properties/login.properties). Override these properties by adding new values for them. Configure the `i18n` object in the `config` section of the sign-in page.

You can add values for any of the labels found on the sign-in page.

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
  baseUrl: 'https://{yourOktaDomain}',
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

### Add your own style sheet

You can add your own style sheet to extend the look of the sign-in page. In the embedded HTML editor, add a link to your style sheet in the `<head>` section, below the <span v-pre>`{{{SignInWidgetResources}}}`</span> line.

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

The Sign-In Widget for embedded authentication is application aware. This means that your client-side customizations can understand which application caused the sign-in page to load. This is useful when you have multiple applications or brands that you want to support.

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

Using this method, you can inspect the client ID and update it. For example, if you have a CSS file on your server that's for a particular client's CSS:

1. In the Admin Console, go to **Applications** > **Applications**.
2. Select the app integration that you need the client ID for. 
3. On the **General** tab, copy the ID from the **Client ID** box in the **Client Credentials** section.

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

### About the Sign-In Widget version

The Okta-hosted sign-in page uses the [Sign-In Widget](https://github.com/okta/okta-signin-widget#okta-hosted-sign-in-page-default) component to interact with the user.

If you aren't familiar with the Sign-In Widget, Okta recommends that you select the highest **Major Version** and the latest **Minor Version** (default). For details, major and minor versions, and the Sign-In Widget capabilities they support, see the [GitHub releases page](https://github.com/okta/okta-signin-widget/releases).

1. To update the major and minor versions, select **Edit** in the **Okta Sign-In Widget Version** section header.
2. Make your changes, and then click **Save** at the bottom of the page.

## See also

For information about other Okta customization options:

* [Customize domain and email address](/docs/guides/custom-url-domain/)
* [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/)
* [Customize SMS messages](/docs/guides/custom-sms-messaging)
* [Customize email notifications](/docs/guides/custom-email/)
