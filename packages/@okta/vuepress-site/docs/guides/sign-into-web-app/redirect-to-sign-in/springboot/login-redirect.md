When accessing protected routes, Spring Security redirects the user to an Okta sign-in page automatically.

You can also give the user a **Sign In** button or link. The link must navigate to `/oauth2/authorization/okta`:

```html
<a href="/oauth/authorization/okta">Sign In</a>
```
