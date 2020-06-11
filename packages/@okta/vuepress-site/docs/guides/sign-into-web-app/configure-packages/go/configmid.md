Update your environment variables to include the following:

```bash
CLIENT_ID={yourClientId}
CLIENT_SECRET={yourClientSecret}
ISSUER=https://{yourOktaDomain}.com/oauth2/default
```


We also need access to a session store:
```go
var sessionStore = sessions.NewCookieStore([]byte("okta-hosted-login-session-store"))
```
