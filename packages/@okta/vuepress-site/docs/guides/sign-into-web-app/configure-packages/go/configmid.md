Update your environment variables to include the following:

```bash
CLIENT_ID={yourClientId}
CLIENT_SECRET={yourClientSecret}
ISSUER=https://{yourOktaDomain}.com/oauth2/{authServerId}
```

If you are using the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server), set `{authServerId}=default`. If you are using another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), set `{authServerId}` to the custom Authorization Server ID.

We also need access to a session store:

```go
var sessionStore = sessions.NewCookieStore([]byte("okta-hosted-login-session-store"))
```
