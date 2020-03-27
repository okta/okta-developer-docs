In this implementation of the external service in NodeJS, we use a few packages to handle the routine tasks of REST request processing.


```javascript
const express = require('express');
const basicAuth = require('express-basic-auth')
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
```

We're also going to separate out into its own file the code that implements the business logic, doing the actual check of the submitted user credentials against our user store:

```javascript
const users = require('./users');
```

