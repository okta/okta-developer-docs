```javascript
  const credentials = req.body.data.context.credential;
  if (users.validate(credentials.username, credentials.password)) {
    console.log("Password verified! Password imported.")
    return res.status(200).json({
      "commands": [
        {
          "type": "com.okta.action.update",
            "value": {
            "credential": "VERIFIED"
          }
        }
      ]
    });
  }
  console.log("Not verified. Password not imported.")
  return res.status(204).send();
});
```
