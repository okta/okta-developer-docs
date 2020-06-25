---
exampleDescription: Express.js Auth Code Example
---

## Okta Node.js/Express.js Quickstart

Now that your users can sign in, let's handle the authentication callback from Okta in your Express server. We'll show you how to install and configure the [@okta/oidc-middleware](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware) library, referred to below as ExpressOIDC, to do this automatically.

> If you would prefer to download a complete sample application instead, please visit [Express Sample Applications for Okta][] and follow those instructions.

### Install The Library

This library is available on NPM:

```bash
npm install @okta/oidc-middleware
```

### Configure The OIDC Router

To use ExpressOIDC you create an instance of the middleware by passing the needed configuration, then attaching its router to your Express app.  You will also need to add session support to your app, so that ExpressOIDC can create an Express session after authentication is complete.  Here is an example configuration:
<DomainAdminWarning />

```javascript
const express = require('express');
const app = express();
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

// session support is required to use ExpressOIDC
app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: 'https://${yourOktaDomain}/oauth2/default',
  client_id: '{clientId}',
  client_secret: '{clientSecret}',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile',
  appBaseUrl: '{appBaseUrl}' // In this example, it should be http://localhost:3000
});

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);
```

### Protect Your Routes

If you require authentication for certain routes, add the `oidc.ensureAuthenticated()` middleware.  If the user is not authenticated, they will be redirected to the login page:

```javascript
app.get('/protected', oidc.ensureAuthenticated(), (req, res) => {
  res.send(JSON.stringify(req.userContext.userinfo));
});
```

If you want a page to always be accessible, but change its contents if the user is logged in, you can do a truthy check on `req.userContext.userinfo` to know if the user is authenticated or not:

```javascript
app.get('/', (req, res) => {
  if (req.userContext.userinfo) {
    res.send(`Hi ${req.userContext.userinfo.name}!`);
  } else {
    res.send('Hi!');
  }
});
```

### Starting Your Server

When you create an instance of ExpressOIDC, some initial communication is made to the issuer (your Okta org) to ensure that the provided client credentials are correct.  Because this is asynchronous you will need to wait for ExpressOIDC to be ready, then you can tell your Express app to start listening:

```javascript
oidc.on('ready', () => {
  app.listen(3000, () => console.log(`Started!`));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});
```

### Test The Login Flow

Once the server is running, simply visit `/login` in your browser.  Any GET requests for `/login` will redirect the user the the Okta Sign-In Page for the configured org (as specified by the `issuer` option).  Once login is successful on the Okta Sign-In Page, the user will be sent back to the Express server.  The callback should be automatically handled for you, and a session created for the user.

For more information about other configuration and customization that is available, please see the [@okta/oidc-middleware README](https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware).

[Express Sample Applications for Okta]: https://github.com/okta/samples-nodejs-express-4
