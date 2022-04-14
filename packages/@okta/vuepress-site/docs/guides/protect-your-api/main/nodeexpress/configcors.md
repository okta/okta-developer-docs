We suggest using the [CORS package](https://www.npmjs.com/package/cors) for enabling CORS in Node.js apps.

1. Install the `cors` package by running the following command:

```shell
npm install cors@2.8 –save
```

2. Add `cors` to the express app instance inside `server.js`:

```js
  ...

const cors = require('cors');

  ...

app
  .use(cors())
  .listen(port, () => console.log('API Magic happening on port ' + port));
```
