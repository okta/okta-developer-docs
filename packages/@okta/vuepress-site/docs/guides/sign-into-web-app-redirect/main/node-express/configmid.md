The Okta CLI created an `.okta.env` file in your current directory. This file includes your Okta domain, client ID, and client secret:

```properties
export OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
export OKTA_OAUTH2_CLIENT_ID=${clientId}
export OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

The `passport-openidconnect` package requires an instance of an `Strategy` object with configuration properties. You should set the `issuer`, `authorizationURL`, `tokenURL`,  `userInfoURL`, `clientID`, and `clientSecret` properties.

The code changes to configure Okta are shown below. Add these into appropriate places in your main `app.js` file.

```js
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');

app.use(session({
  secret: 'CanYouLookTheOtherWay',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// set up passport
passport.use('oidc', new Strategy({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  authorizationURL: 'https://{yourOktaDomain}/oauth2/default/v1/authorize',
  tokenURL: 'https://{yourOktaDomain}/oauth2/default/v1/token',
  userInfoURL: 'https://{yourOktaDomain}/oauth2/default/v1/userinfo',
  clientID: '{yourClientID}',
  clientSecret: '{yourClientSecret}',
  callbackURL: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile'
}, (issuer, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});
```

If you use `okta start express` to create an app, it has an `.okta.env` file in it that looks a bit different. That's because it's configured to use [dotenv](https://github.com/motdotla/dotenv) to load its configuration from this file.
