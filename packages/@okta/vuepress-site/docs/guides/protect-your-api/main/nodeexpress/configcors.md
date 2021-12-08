We suggest using the [Cors Package](https://www.npmjs.com/package/cors) for enabling cors. Once you have your express app instance, you can use `cors`:

```js
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
```


For more details, refer to the [Cors Package](https://www.npmjs.com/package/cors).
