In this implementation of an external service, the code is written for Node and uses the Express framework. Several npm packages are required:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
```

The following code listens for HTTPS requests:

```javascript
const app = express();
const port = process.env.PORT || 3000;
```

```javascript
app.listen(port, () => console.log(`Listening on port ${port}!`));
```

And the following code is required to authorize and parse the call from Okta:

```javascript
const basicAuth = require('express-basic-auth');
```

```javascript
app.use(bodyParser.json());
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));
```
