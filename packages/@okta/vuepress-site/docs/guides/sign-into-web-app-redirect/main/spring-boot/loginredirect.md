By default, the redirect to the login page happens automatically when users access a protected route (by default, Spring Security protects all routes).

You can give the user a **Sign In** button or link. The link must navigate to `/oauth2/authorization/okta`:

```html
<a href="/oauth2/authorization/okta">Sign In</a>
```
