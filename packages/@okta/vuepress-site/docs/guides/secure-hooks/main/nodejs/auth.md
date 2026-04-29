
```JavaScript

// Basic Auth
const basicAuth = require('express-basic-auth');

app.use(basicAuth( { authorizer: myAuthorizer } ))

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.USER)
    const passwordMatches = basicAuth.safeCompare(password, process.env.PASSWORD)

    return userMatches & passwordMatches
}

```
