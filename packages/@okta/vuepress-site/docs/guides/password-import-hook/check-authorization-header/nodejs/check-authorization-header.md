For the check of the Authorization header here, we use npm packages to parse the request from Okta and to decode the Authorization header.

We chose to use the Basic Authentication scheme to encode a username and password combination in base64 as the value of the Authorization header, setting that value as the authentication secret when registering the Inline Hook with Okta.

If the Authorization header is missing or the value provided is wrong, we deny the request, returning an HTTP 401 "Unauthorized" status code.

```javascript
app.use(bodyParser.json());
app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  unauthorizedResponse: req => 'Unauthorized'
}));
```

