## About the direct authentication OTP grant

Use direct authentication when you want your application to directly authenticate users. For example, you don't want to delegate authentication to an IdP or authorization server using an HTTP redirect in a web browser. While delegating authentication is preferred, use direct authentication in situations where there's a high degree of trust between the user and your app.

Also, you can use direct authentication where usability constraints hinder the use of browser-based flows, such as native mobile applications.

Use the OTP flow when you want to use an OTP factor, such as Google time-based one-time passcode (TOTP) or Okta Verify, as a primary factor.
