If your using the Sign-In Widget or SDK sample app use `http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}`. The following snippet shows how the URL looks in the HTML message:

```html
  <a id="reset-password-link"
    href="http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}"
    style="text-decoration: none;">
    <span style="padding: 9px ...;">
      Reset Password
    </span>
  </a>
```
