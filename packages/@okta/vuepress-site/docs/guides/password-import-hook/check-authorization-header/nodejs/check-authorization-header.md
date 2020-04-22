For the check of the Authorization header, we use npm packages to parse the request from Okta and to decode the value of the Authorization header.

For the secret value, we chose to use the Basic Authentication scheme to encode a username and password combination in Base64, setting that value as our authentication secret when registering the Inline Hook with Okta.

If the Authorization header is missing or the value provided is wrong, we deny the request, returning an HTTP 401 "Unauthorized" status code.

```javascript
app.use(bodyParser.json());
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));
```

