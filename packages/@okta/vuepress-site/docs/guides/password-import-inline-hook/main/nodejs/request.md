Add the following code to the `server.js` file to complete this file. It creates the sample app's endpoint. The code first runs some basic checks to confirm that the properties exist and that they are strings. Then, their values are populated into an object called `credentials`, which is used later to check against a user store.

```javascript
const passwordImportValidation = [
  body('data.context.credential.username', 'Must be a non empty string').exists().bail().isString().bail().notEmpty(),
  body('data.context.credential.password', 'Must be a non empty string').exists().bail().isString().bail().notEmpty(),
];

app.post('/passwordImport', passwordImportValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
