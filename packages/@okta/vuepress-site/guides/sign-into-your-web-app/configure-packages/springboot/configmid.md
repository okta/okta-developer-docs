Edit `src/main/resources/application.properties` and include your Okta Issuer, Client Id, Client Secret from the previous section:

```properties
okta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
okta.oauth2.clientId={yourClientId}
okta.oauth2.clientId={clientSecret}
# Configure the callback URL to match the previous section (optional)
security.oauth2.sso.loginPath=/authorization-code/callback
```
