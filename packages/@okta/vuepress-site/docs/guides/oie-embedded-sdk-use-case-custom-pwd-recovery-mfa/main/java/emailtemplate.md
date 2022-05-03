If you're using the Sign-In Widget sample app or the SDK sample app use `http://localhost:8080/magic-link/callback?otp=${oneTimePassword}&state=${request.relayState}`. The following shows the resulting `<a>` element in the email template:

```html
  <a id="reset-password-link"
    href="http://localhost:8080/magic-link/callback?otp=${oneTimePassword}&state=${request.relayState}"
    style="text-decoration: none;">
    <span style="padding: 9px ...;">
      Reset Password
    </span>
  </a>
```
