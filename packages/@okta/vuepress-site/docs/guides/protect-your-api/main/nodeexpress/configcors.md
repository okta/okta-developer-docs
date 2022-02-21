We suggest using the [Cors Package](https://www.npmjs.com/package/cors) for enabling cors.

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