### 1 - 9. Sign in and get magic link email

First, the user attempts to sign in, initiating the email challenge flow. Next, they click the magic link that redirects them back to your app. These steps are identical to steps 1 - 9 in [Integrate email challenge with magic links](#integrate-email-challenge-with-magic-links).

### 10. Handle the magic link redirect in your app

Create a callback handler method that takes the `otp` parameters in the query string and passes it as a parameter to `verifyAuthenticator()` on the `IdxAuthenticationWrapper` instance. More importantly, use the state parameter value to retrieve the current IDX proceed context.

```java
// For web application you could store the ProceedContext in the HTTP Session
ProceedContext proceedContext = session.getAttribute("proceedContext");

if (idxContext != null) {
    // Process magic link

    // get `otp` parameter from request
    return idxAuthenticationWrapper.verifyAuthenticator(
         proceedContext, new VerifyAuthenticatorOptions(code));
}
```

If your code can't retrieve the context using the state, assume that this is because the user is in a different browser. Advise the user to return to the original tab and enter the OTP value there.
