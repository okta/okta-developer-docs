Update your environment variables to include the following:

```bash
CLIENT_ID=${yourClientId}
CLIENT_SECRET=${yourClientSecret}
ISSUER=https://${yourOktaDomain}.com/oauth2/{authServerId}
```

If you're using the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server), set `{authServerId}=default`. If you're using another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), set `{authServerId}` to the custom Authorization Server ID.
