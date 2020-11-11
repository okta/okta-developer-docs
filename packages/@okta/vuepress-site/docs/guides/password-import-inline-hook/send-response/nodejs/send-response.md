```javascript
  const credentials = req.body.data.context.credential;
  if (users.validate(credentials.username, credentials.password)) {
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
  return res.status(204).send();
});
```
