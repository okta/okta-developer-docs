Add the file `users.js` to the project with the following code, which sets up the array `users` and defines the `validate` function. The `validate` function checks username and password pairs that are passed to it by looking them up in the `users` array.

This file is referenced from `server.js` file from the line;

```javascript
const users = require('./users');
```

```javascript
const users = [
  {
    username: 'jessie.smith@example.com',
    password: 'password1',
  },
  {
    username: 'kim.sato@example.com',
    password: 'password2',
  },
    {
    username: 'rajiv.tal@dexample.com',
    password: 'password3',
  },
]

function validate(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

exports.validate = validate;
```
