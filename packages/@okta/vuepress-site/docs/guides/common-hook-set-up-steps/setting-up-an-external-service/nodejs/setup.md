The following code is included in the Glitch project templates and includes basic `npm` packages to define routine tasks for a Node.js application, including listening for requests:

Default code:

```javascript
const express = require('express');
const app = express();
```

The following code listens for HTTPS requests:

```javascript
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
```