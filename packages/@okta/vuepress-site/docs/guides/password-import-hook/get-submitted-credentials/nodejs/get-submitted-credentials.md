Here some basic checks are done to confirm that the properties exist and are strings. Then, their values are populated into an object called `credentials`, to be available later to check against our user store.

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
