---
title: Configure the SDK
---

You'll need two values from the Okta Application and the Developer Console you worked with in [Create an Okta Application](/guides/sign-into-spa/-/create-okta-application):

* **Client ID** - Find it in the applications list or on the application's **General** tab.
* **Okta domain** - Find it on the Developer Console dashboard in the upper-right corner. 

In your application code, build a config object. This is used to initialize the Okta services with the values specific to your application:

```javascript
const config = {
  clientId: '{clientId}',
  issuer: 'https://{yourOktaDomain}.com/oauth2/default',
  redirectUri: 'http://localhost:8080/implicit/callback',
};
```

You can also build it from dynamic values like environment variables:

```javascript
const OKTA_DOMAIN = process.env.DOMAIN;
const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_PATH = '/implicit/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
});
```

With the configuration ready, initialize the SDK:

<StackSelector snippet="config"/>

<NextSectionLink/>
