You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

In our quickstart, we do this via the `passport-openidconnect` package, which requires an instance of a `Strategy` object with configuration properties. You will set the `issuer`, `authorizationURL`, `tokenURL`,  `userInfoURL`, `clientID`, and `clientSecret` properties inside that object using your own values.

The code changes to configure Okta are shown below.

1. Add the necessary `require` calls into your main `app.js` file, just below the existing `require` calls.

```js
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');
```

2. Add the OIDC `passport` setup just below the existing view engine setup lines (just below `app.use(express.static(path.join(__dirname, 'public')));`, for example):

```js
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

3. Replace the placeholders in the above code with your domain, and with your values from the `.okta.env` file.

> **Note**: If you use `okta start express` to create an app, it has an `.okta.env` file in it that looks a bit different. That's because it's configured to use [dotenv](https://github.com/motdotla/dotenv) to load its configuration from this file.
