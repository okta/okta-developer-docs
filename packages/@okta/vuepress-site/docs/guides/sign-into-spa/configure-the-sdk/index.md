---
title: Configure the SDK
---
You'll need two values from the Okta application and the Admin Console that you worked with in <GuideLink link="../create-okta-application">Create an Okta application</GuideLink>:

* **Client ID** &mdash; Find it in the applications list or on the application's **General** tab.
* **Okta domain** &mdash; The Okta Domain can be found on the Admin Console's global header in the upper-right corner. Click the section which displays your email and company name.  A drop-down menu will appear and display general org information including the full Okta domain (e.g. subdomain.okta.com).

In your application code, build a config object. This is used to initialize the Okta services with the values specific to your application:

```javascript
const config = {
  clientId: '{clientId}',
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  redirectUri: 'http://localhost:8080/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
```

You can also build it from dynamic values like environment variables:

```javascript
const OKTA_DOMAIN = process.env.DOMAIN;
const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_PATH = '/login/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/)
};
```

> **Note:**
>
> `openid`, `profile`, and `email` are reserved scopes in OpenID Connect that allow you to get access to user's data. You can read more about scopes [here](/docs/reference/api/oidc/#scopes).
>
> The `issuer` in the configuration above points to the default [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server),
which is created by default with the [Okta Developer Edition](https://developer.okta.com/signup/) account.
See [Which Authorization Server should you use](/docs/concepts/auth-servers/#which-authorization-server-should-you-use) for more information on the types of Authorization Servers available to you and what you can use them for.

With the configuration ready, initialize the SDK:

<StackSelector snippet="config"/>

<NextSectionLink/>
