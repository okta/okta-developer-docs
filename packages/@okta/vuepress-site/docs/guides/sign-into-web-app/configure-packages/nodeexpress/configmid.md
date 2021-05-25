To use ExpressOIDC, create an instance of the middleware by passing the needed configuration, and then attach its router to your Express app. Then, add session support to your app so that ExpressOIDC can create an Express session after authentication is complete. Here is an example configuration:

```js
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

// session support is required to use ExpressOIDC
app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: 'https://${yourOktaDomain}/oauth2/{authServerId}',
  client_id: '{clientId}',
  client_secret: '{clientSecret}',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile'
});

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);
```

If you are using the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server), set `{authServerId}=default`. If you are using another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), set `{authServerId}` to the custom Authorization Server ID.
