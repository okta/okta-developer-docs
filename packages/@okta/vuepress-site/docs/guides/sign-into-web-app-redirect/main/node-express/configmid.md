Use the `passport-openidconnect` package to store these configuration values.

1. Open **app.js**.
1. Add the following `require` calls to the existing list at the top of the file.

   ```js
   var session = require('express-session');
   var passport = require('passport');
   var { Strategy } = require('passport-openidconnect');
   ```

1. Add the OIDC `passport` setup just below the existing view engine setup lines (just below `app.use(express.static(path.join(__dirname, 'public')));`, for example). Replace the placeholders with your own values:

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
     clientID: '{clientID}',
     clientSecret: '{clientSecret}',
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
