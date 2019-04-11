---
title: Create Your Okta Config Object
---
After you create the application, there are two values that you need:

* **Client ID** - Find it in the applications list or on the **General** tab of a specific application.
* **Org URL** - Find it on the Developer console dashboard in the upper-right corner. 

These values are used in your application to set up the OpenID Connect flow with Okta.

Somewhere in your app, construct a config object. This is used to initialize the Okta services with the values specific to your application.  The required properties are:

* clientId
* issuer
* redirectUri

It could use hardcoded values:

```javascript
const config = {
  clientId: '{clientId}',
  issuer: 'https://{yourOktaDomain}.com/oauth2/default',
  redirectUri: 'http://localhost:8080/implicit/callback',
};
```

Or it could be built from dynamic values:

```javascript
const DOMAIN = process.env.DOMAIN;
const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_PATH = '/implicit/callback';

const ISSUER = `https://${DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
});

```

It's not important how you construct this object, but you need to create an object with the values specific for your app. This object is used to initialize the Okta SDK. We refer to this `config` object throughout the guide.

<NextSectionLink/>
