For the check of the authorization in header here, we use Node packages to parse the request from Okta and to decode BasicAuth, which we choose to use for the content of the Authorization header.

```javascript
app.use(bodyParser.json());
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));
```
