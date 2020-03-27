Here we some basic checks that the values we actually supplied in the request body, and then we put them into an object called `credentials`.

```javascript
const passwordImportValidation = [
  body('data.context.credential.username', 'Must be a non empty string').exists().bail().isString().bail().notEmpty(),
  body('data.context.credential.password', 'Must be a non empty string').exists().bail().isString().bail().notEmpty(),
];

app.post('/passwordimport', passwordImportValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const credentials = req.body.data.context.credential;
```
