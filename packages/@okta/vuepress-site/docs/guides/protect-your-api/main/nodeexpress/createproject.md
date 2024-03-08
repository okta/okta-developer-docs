Create a project using Express.

1. Open a terminal and create a directory `test-api` for your project.
1. Initialize your project using `npm init`. Accept the defaults.

   ```shell
   cd test-api
   npm init
   ```

1. Add Express to your project.

   ```shell
   npm install express
   ```

1. Create a file called `index.js` and add the following minimal Express app to it:

   ```js
   const express = require('express');
   const app = express();
   const port = 3000;

   app
     .listen(port, () => console.log('API listening on port ' + port));
   ```

Use the [sample code](https://github.com/okta-samples/okta-express-js-api-quickstart) to follow along.
