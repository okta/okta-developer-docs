> **Note**: This guide uses [Express](https://expressjs.com) version 4 and compatible versions of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), [JWT verifier]() 2.3, and [cors](https://www.npmjs.com/package/cors) 2.8.

Create a new project using Express.

1. Create a new npm project using `npm init`. Accept the defaults.
2. Run the following command to add Express to your project: `npm install express@4`
3. Create a file called `server.js` inside your project, and add the following minimal Express app to it:

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app
  .listen(port, () => console.log('API Magic happening on port ' + port));
```