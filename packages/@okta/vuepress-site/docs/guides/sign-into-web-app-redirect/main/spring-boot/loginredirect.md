By default, the redirect to the sign-in page happens automatically when users access a protected route (by default, Spring Security protects all routes).

Give the user a **Sign In** button or link using whatever templating language you prefer (our [samples repo](https://github.com/okta/samples-java-spring/tree/master/okta-hosted-login) uses Thymeleaf). The link must navigate to `/oauth2/authorization/okta`:

```html
<a href="/oauth2/authorization/okta">Sign In</a>
```
