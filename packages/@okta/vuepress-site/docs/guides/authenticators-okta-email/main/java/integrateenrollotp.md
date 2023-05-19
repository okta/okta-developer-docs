### 1 - 4. Start enrollment flow and display list of authenticators

The Enrollment flow follows the same first four steps as the [Challenge flow](#integrate-email-challenge-with-magic-links):

* [Build a sign-in page on the client](#_1-build-a-sign-in-page-on-the-client)
* [Authenticate the user credentials](#_2-authenticate-the-user-credentials)
* [Handle the response from the sign-in flow](#_3-handle-the-response-from-the-sign-in-flow)
* [Display a list of possible authenticator factors](#_4-display-a-list-of-available-authenticators)

### 5. Check authenticator status and send email to the user

When the user selects the Email Authenticator, call `selectAuthenticator()`, similar to above.

```java
return idxAuthenticationWrapper.selectAuthenticator(proceedContext, authenticator);
```

If the call is successful, Okta sends an enrollment email to the user that contains the OTP. The server returns a status of `AWAITING_AUTHENTICATOR_VERIFICATION` to indicate it is waiting for the user to check their email and either click the magic link in it or enter the OTP.

```java
case AWAITING_AUTHENTICATOR_VERIFICATION:
    console.writer().println("Check email for activation instructions");
    String code = console.readLine("Enter TOTP code from email: ");
    return idxAuthenticationWrapper.verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
```

### 6. Display OTP input page

Build a form that allows the user to enter the One-Time Passcode (OTP) sent to them by email. This is exactly the same as Step 8 in the challenge flow instructions.

### 7. Open email and copy OTP

Next, the user opens the email and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Factor Verification** template.

<div class="full">

![Screenshot of OTP in enrollment page](/img/authenticators/authenticators-email-enroll-otp.png)

</div>

### 8. Process the OTP

Pass the OTP as a parameter to `verifyAuthenticator()`.


```java

   VerifyAuthenticatorOptions verifyAuthenticatorOptions = new VerifyAuthenticatorOptions(otp);
   authenticationResponse = authenticationWrapper
            .verifyAuthenticator(proceedContext, verifyAuthenticatorOptions);
```

### 9. Complete challenge and sign user in

If the `otp` value is valid, the `AuthenticationStatus` property of the `AuthenticationResponse` object returned by `verifyAuthenticator()` is `SUCCESS`. In this case, call `getTokenResponse()` to retrieve the user's ID and access tokens.

```java
case SUCCESS:
    TokenResponse tokenResponse = authenticationResponse.getTokenResponse();
    String accessToken = tokenResponse.getAccessToken();
    … your code …
```
