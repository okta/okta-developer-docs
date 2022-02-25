We suggest using the [CORS package](https://www.npmjs.com/package/cors) for enabling CORS.

Install the `cors` package by running

```shell
npm install cors@2.8 –save
```

Add `cors` to the express app instance inside `server.js`.

```js
  ...

const cors = require('cors');

  ...

app
  .use(cors())
  .listen(port, () => console.log('API Magic happening on port ' + port));
```
