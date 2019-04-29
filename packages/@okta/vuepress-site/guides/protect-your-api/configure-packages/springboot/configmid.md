Edit `src/main/resources/application.properties` and include your Okta Issuer Client Id from above:

```properties
okta.oauth2.issuer=https://{yourOktaDomain}/oauth2/default
okta.oauth2.clientId={yourClientId}
```
