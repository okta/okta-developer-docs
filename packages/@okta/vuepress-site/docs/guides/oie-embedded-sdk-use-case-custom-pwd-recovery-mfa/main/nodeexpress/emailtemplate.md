If you're using the Sign-In Widget or SDK sample app to test this feature, use `http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}` for the `href` property. The following shows the resulting `<a>` element in the email template:

```html
  <a id="reset-password-link"
    href="http://localhost:8080/login/callback?otp=${oneTimePassword}&state=${request.relayState}"
    style="text-decoration: none;">
    <span style="padding: 9px ...;">
      Reset Password
    </span>
  </a>
```
