In this implementation of an external service, the code is written for Node, and the Express framework is used. Several npm packages are used to handle the routine tasks of REST request processing needed to process the Inline Hook calls that come from Okta:

```javascript
const express = require('express');
const basicAuth = require('express-basic-auth')
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
```

Our implementation of the external service also separates, into its own file module, the code that implements the business logic of our external service, which is the actual check of the submitted user credentials against our user store. The file module that contains this code is named `users`:

```javascript
const users = require('./users');
```

