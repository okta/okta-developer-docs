In your `sample-app` folder, create a `server.js` file and add the following framework code:

```javascript
// server.js
// where your node app starts

require('dotenv').config();
const express = require("express");
const app = express();
const { body, validationResult } = require('express-validator');
app.use(express.json());

// listen for requests :)
const listener = app.listen(8082, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
```

Add the following code to use Basic authentication to validate the incoming call from Okta against the values in the `.env` file. See [HTTP header: Basic Authentication](/docs/guides/secure-hooks/nodejs/main/#http-header-basic-authentication).

```javascript
const basicAuth = require('express-basic-auth');

/* HTTP Basic auth middleware for Express
//
// Refer to https://www.npmjs.com/package/express-basic-auth#custom-authorization for more information
//
// Ensure you securely store your credentials for your external service */

app.use(basicAuth( { authorizer: myAuthorizer } ))

function myAuthorizer(username, password) {

    const userMatches = basicAuth.safeCompare(username, process.env.BASIC_AUTH_USER)
    const passwordMatches = basicAuth.safeCompare(password, process.env.BASIC_AUTH_PASSWORD)

    return userMatches & passwordMatches
}
```
