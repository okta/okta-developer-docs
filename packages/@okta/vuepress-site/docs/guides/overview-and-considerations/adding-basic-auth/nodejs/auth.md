
```javascript
// Basic Auth
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));
```