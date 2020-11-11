The validation logic is contained in a file called `users.js`. Make sure to add or include this file in your project, as well as reference it in `server.js`:

```javascript
const users = require('./users');
```

The file module `users.js` in our implementation contains the following code, which sets up the array `users` and defines the `validate` function. The `validate` function checks username and password pairs that are passed to it by looking them up in the `users` array.

```javascript
const users = [
  {
    username: 'michelletest@doesnotexist.com',
    password: 'hunter2',
  },
  {
    username: 'sanjaytest@doesnotexist.com',
    password: 'password1',
  },
    {
    username: 'josephtest@doesnotexist.com',
    password: 'password2',
  },
]

function validate(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

exports.validate = validate;
```
