The file `users.js` contains the following code, setting up the sample username and password pairs in an array, doing the validation against the array contents.

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

