The file `users.js` contains the following code, which sets up the array `users`. The `validate` function checks username and password pairs that are passed to it by looking them up in the array.

```javascript
const users = [
  {
    username: 'AzureDiamond',
    password: 'hunter2',
  },
  {
    username: 'sosecure',
    password: 'password',
  },
]

function validate(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

exports.validate = validate;
```

