#### Different browser or device scenarios

`OktaAuth.idx.handleEmailVerifyCallback()` throws a  `EmailVerifyCallbackError` error if the user clicked on the magic link in a different browser or device. If this error is thrown, inform the user to use the OTP.

<div class="common-image-format">

![Screenshot of different device or browser error](/img/authenticators/authenticators-email-magic-link-error.png)

</div>
