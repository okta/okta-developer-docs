
```javascript

// Basic Auth
const basicAuth = require('express-basic-auth');

app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));

```
