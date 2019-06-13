Edit `src/main/resources/application.properties` and update these values to include your Okta domain and the Okta Application's client ID and secret:

```properties
okta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
okta.oauth2.clientId={clientId}
okta.oauth2.clientId={clientSecret}

# Customize the callback route path (optional):
security.oauth2.sso.loginPath=/authorization-code/callback
```
