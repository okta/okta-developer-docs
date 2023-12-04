The [cors](https://www.npmjs.com/package/cors) package provides a middleware function that can be used to enable CORS in your project.

1. Install the latest version of `cors` in your project directory:

   ```shell
   npm install cors
   ```

1. Add `cors` to your require statements at the top of `index.js`:

   ```js
   const cors = require('cors');
   ```

1. Update the call to `app.listen()` to include the cors middleware:

   ```js
   app
      .use(cors())
      .listen(port, () => console.log('API listening on port ' + port));
   ```
