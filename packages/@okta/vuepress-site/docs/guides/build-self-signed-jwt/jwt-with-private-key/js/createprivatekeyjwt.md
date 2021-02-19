Using the [NJWT library](https://github.com/jwtk/njwt):

```javascript
const njwt = require('njwt');

const privateKey = // Load an RSA private key from configuration
const clientId = "{clientId}"; // Or load from configuration
const now = Math.floor( new Date().getTime() / 1000 ); // seconds since epoch
const plus5Minutes = new Date( ( now + (5*60) ) * 1000); // Date object
const alg = 'RS256'; // one of RSA or ECDSA algorithms: RS256, RS384, RS512, ES256, ES384, ES512

const claims = {
  aud: "https://${yourOktaDomain}/oauth2/default/v1/token", // audience
};

const jwt = njwt.create(claims, privateKey, alg)
  .setIssuedAt(now)
  .setExpiration(plus5Minutes)
  .setIssuer(clientId)
  .setSubject(clientId)
  .compact();
```
