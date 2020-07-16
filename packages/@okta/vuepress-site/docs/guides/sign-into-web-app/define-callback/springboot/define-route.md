The Okta Spring Boot Starter configures and hosts this route for you. By default, this route is hosted at `/login/oauth2/code/okta`.

To following along with this guide, set the property `okta.oauth2.redirect-uri` to `/authorization-code/callback` in your `src/main/resources/application.properties` file:

```properties
okta.oauth2.redirect-uri=/authorization-code/callback
```
