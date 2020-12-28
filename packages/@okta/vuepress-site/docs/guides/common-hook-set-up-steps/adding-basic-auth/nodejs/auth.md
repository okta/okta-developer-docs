
```javascript

// Basic Auth
const basicAuth = require('express-basic-auth');
// Body Parsing
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));
