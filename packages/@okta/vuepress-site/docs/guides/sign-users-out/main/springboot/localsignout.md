To log out, just `POST` a message to `/logout` and Spring Security invalidates the current session. For example, an HTML form with a [CSRF token](https://docs.spring.io/spring-security/site/docs/5.0.x/reference/html/csrf.html) looks like:

```html
<form method="post" action="/logout">
  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
  <button id="logout-button" type="submit">Logout</button>
</form>
```
