---
title: Okta Sign-In Widget Guide
language: JavaScript
icon: code-javascript
excerpt: A drop-in widget with custom UI capabilities to power sign-in with Okta.
---

The Okta Sign-In Widget is a JavaScript library that gives you a fully-featured and customizable login experience which can be used to authenticate users on any website.

Okta uses the Widget as part of its normal sign-in page. If you would like to customize the Widget, then you will need to host it yourself. This guide will walk you through the [installation process](#installation) for the Widget, as well as [a few common use cases](#use-cases) for the Widget and how to implement them. The full Widget reference can be found [on GitHub](https://github.com/okta/okta-signin-widget#okta-sign-in-widget).

> A version of the Widget that you can edit in real time can be found here: <https://developer.okta.com/live-widget/>

![Screenshot of basic Okta Sign-In Widget](/img/okta-signin.png "Screenshot of basic Okta Sign-In Widget")


## Installation

The first step is to install the Widget. For this, you have two options: linking out to the Okta CDN, or local installation via npm instead.

### CDN

To use the CDN, include this in your HTML:

```html
<!-- Latest CDN production Javascript and CSS -->
<script src="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/js/okta-sign-in.min.js" type="text/javascript"></script>

<link href="https://global.oktacdn.com/okta-signin-widget/-=OKTA_REPLACE_WITH_WIDGET_VERSION=-/css/okta-sign-in.min.css" type="text/css" rel="stylesheet"/>
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

### npm

```
# Run this command in your project root folder.
npm install @okta/okta-signin-widget --save
```

More info, including the latest published version, can be found in the [Widget Documentation](https://github.com/okta/okta-signin-widget#using-the-npm-module).

#### Bundling the Widget

If you are bundling your assets, import them from `@okta/okta-signin-widget`. For example, using [webpack](https://webpack.js.org/):

```javascript
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
```

> Loading CSS requires the css-loader plugin. You can find more information about it [here](https://github.com/webpack-contrib/css-loader#usage).

### Enabling Cross-Origin Access

Because the Widget will be making cross-origin requests, you need to enable Cross Origin Access (CORS) by adding your application's URL to your Okta org's Trusted Origins. More information about this can be found on the [Enable CORS](/docs/guides/enable-cors/) page.

> If you are using the Widget to sign users in to your own application, then you can skip this step. When you create an Application in Okta, you will need to specify a `redirectURI`, and the Okta Developer Console will automatically add it as a CORS URL.

## Usage

Once you have installed the Widget and enabled CORS, you can start using it.

### Initializing the Widget

The code that initializes the Widget looks like this:

```javascript
<div id="widget-container"></div>

<script>
  var signIn = new OktaSignIn({baseUrl: 'https://${yourOktaDomain}'});
  signIn.renderEl({
    el: '#widget-container'
  }, function success(res) {
    if (res.status === 'SUCCESS') {
      console.log('Do something with this sessionToken', res.session.token);
    } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  });
</script>
```

<DomainAdminWarning />

#### Mobile Consideration

To ensure that the Widget renders properly on mobile, include the `viewport` metatag in your `head`:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

### Use Cases

The Widget can handle a number of different authentication scenarios. Here are a few common ones:

#### Sign In to Okta with the Default Dashboard

In this case, you would like to use the Widget to sign in to the default Okta dashboard. This requires taking the Widget initialization code, and modifying the success behavior so that it redirects to your org's dashboard.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://${yourOktaDomain}/app/UserHome');
  }
}
```

##### Sign In to Okta and SSO Directly to an App

If you'd like to sign the user directly in to an application within Okta, you just redirect to the specific URL for that application. To find that URL, go to that application's page in your Okta org and find [the embed link](https://help.okta.com/en/prod/okta_help_CSH.htm#ext-apps-page-show-application-embed-links).

#### Sign In to Okta with a Custom Dashboard

If you are still signing your users in to Okta, but you don't want to use the Okta dashboard, then you can change the redirect URL to point to your custom portal instead.

```javascript
function success(res) {
  if (res.status === 'SUCCESS') {
    res.session.setCookieAndRedirect('https://example.com/dashboard');
  }
}
```

#### Sign In to Your Application

If you'd like to use the Widget to sign in to your own application instead of Okta, you will have to [set-up a custom Authorization Server](/docs/guides/customize-authz-server/) in Okta. The Widget also needs to be configured to prompt the user to sign in, and then extract an ID token after a successful redirect:

```javascript

var signIn = new OktaSignIn({
  baseUrl: 'https://${yourOktaDomain}',
  el: '#widget-container',
  authParams: {
    issuer: 'https://${yourOktaDomain}/oauth2/default'
  }
});

signIn.showSignInToGetTokens({
  clientId: '${clientId}',

  // must be in the list of redirect URIs enabled for the OIDC app
  redirectUri: '${redirectUri}',

  // Return an access token from the authorization server
  getAccessToken: true,
  
  // By default, new applications are configured to use the Authorization Code Flow with Proof-of-Code-Key-Exchange (PKCE)
  // If your application uses the Implicit Flow instead, tell the widget not to use PKCE by uncommenting the below line
  // pkce: false,

  // Return an ID token from the authorization server
  getIdToken: true,
  scope: 'openid profile'
});

```

Here is an example of some front-end code that could use this token:

```javascript
function callMessagesApi() {
  var accessToken = signIn.tokenManager.get('access_token');

  if (!accessToken) {
    // This means that the user is not logged in
    return;
  }

  // Make a request using jQuery 
  $.ajax({
    // Your API or resource server:
    url: 'http://localhost:8080/api/messages',
    headers: {
      Authorization: 'Bearer ' + accessToken.accessToken
    },
    success: function(response) {
      // Received messages!
      console.log('Messages', response);
    },
    error: function(response) {
      console.error(response);
    }
  });
}
```

### Handling Errors

The Widget render function either results in a success or error. The error function is called when the Widget has been initialized with invalid config options, or has entered a state it cannot recover from.

The Widget is designed to internally handle any user and API errors. This means that the custom error handler should primarily be used for debugging any configuration errors.

There are three kinds of errors that aren't handled by the Widget, and so can be handled by custom code:

- ConfigError
- UnsupportedBrowserError
- OAuthError

Here is an example of an error handler that adds an error message to the top of the page:

```javascript
function error(err) {
  var errorEl = document.createElement('div');
  errorEl.textContent = 'Error! ' + err.message;
  document.body.insertBefore(
    errorEl,
    document.body.firstChild
  );
}
```

## Customization

The Okta Sign-In Widget is fully customizable via CSS and JavaScript.

> You can try all these customizations for yourself using our [Live Widget](https://developer.okta.com/live-widget/).

### Initial Login Screen

You can modify the look of the initial login screen using parameters in the `config` section of the main Widget initialization block.

![Screenshot of basic Okta Sign-In Widget](/img/widget_theming.png "Screenshot of basic Okta Sign-In Widget")

**Logo**

```javascript
var config = {
  ...
  logo: '/path/to/logo.png',
  ...
};

var signIn = new OktaSignIn(config);
```

**Custom Buttons**

You can add buttons below the "Sign In" button.

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

**Links**

You can also change the "Help", "Forgot Password", and "Unlock" links, including both their text and URLs.

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

#### Modifying CSS

In addition to the parameters in the Widget's `config`, you can also modify the CSS or override the default styles with your own.

**Modify the existing theme**

If you want to add on top of the Okta theme, just edit [okta-theme.scss](https://github.com/okta/okta-signin-widget/blob/master/assets/sass/okta-theme.scss) and add any CSS to the bottom of the file.

##### CSS customization examples

**Background**

```css
#okta-sign-in.auth-container.main-container {
    background-color: red;
}

#okta-sign-in .beacon-blank {
    background-color: red;
}
```

**Border color**

```css
#okta-sign-in.auth-container.main-container {
    border-color: red;
}

#okta-sign-in.auth-container .okta-sign-in-header {
    border-bottom-color: red;
}
```

**Text color**

All text:

```css
#okta-sign-in {
    color: red;
}
```

"Sign In" text:

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

**Widget positioning + width**

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


### Modifying Strings

To modify strings in the Widget, you can override any of the properties set in [login.properties](https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/src/properties/login.properties). You override these properties by specifying new values for them inside an `i18n` object in the Widget's `config` section.

#### Examples

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

For more information about these configuration options, see the [Okta Sign-In Widget Reference page](https://github.com/okta/okta-signin-widget#okta-sign-in-widget).

#### Internationalization

If you'd like to display different strings depending on the user's language, you can specify this using the following structure:

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
