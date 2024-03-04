To check for a successful sign-in request whenever an endpoint is requested, use `@before-request` to check for the authorization request header:

```python
@app.before_request
def read_authorization_header():
    auth_header = request.headers.get('Authorization')
    if auth_header != None:
        bearer_removed = auth_header.lstrip("Bearer ")
        sections = bearer_removed.split('.')
        header = sections[0]
        payload = sections[1]
        signature = sections[2]  # Addition verification here
        jsonPayload = pybase64.b64decode(payload + '==')
        session["authpayload"]=jsonPayload
    else:
        session["authpayload"]=None
```

> **Note**: Additional [signature validation](/docs/guides/validate-access-tokens/python/main/) is needed to ensure the token is valid before storing the `jsonPayload` in a session variable.

Each endpoint requiring authentication should check for `session["authpayload"]`. For example:

```python
@app.route("/whoami")
def whoami():
    if session["authpayload"] != None:
        return make_response(session["authpayload"])
    else:
        return make_response("anonymous", 401)
```
