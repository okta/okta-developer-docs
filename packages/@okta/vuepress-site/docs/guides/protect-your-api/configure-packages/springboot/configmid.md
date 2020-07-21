Edit `src/main/resources/application.properties` and include your Okta Issuer and Audience from above:

```properties
okta.oauth2.issuer=https://${yourOktaDomain}/oauth2/default

# Optional
okta.oauth2.audience=api://default
```
