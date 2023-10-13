By default, the redirect to the sign-in page happens automatically when users access a protected route (by default, Spring Security protects all routes).

Create a **Sign In** button or link that goes to `/oauth2/authorization/okta`:

```html
<a href="/oauth2/authorization/okta">Sign In</a>
```
