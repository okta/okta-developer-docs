### 1 - 4. Sign in and select authenticator

The Enrollment flow follows the same first four steps as the Challenge flow:

* Build a sign-in page on the client
* Authenticate the user credentials
* Handle the response from the sign-in flow
* Display a list of possible authenticator factors

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

### 6 - 7. Open email and copy OTP

Next, the user opens the email and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Factor Verification** template.

<div class="common-image-format">

![Screenshot of OTP in enrollment page](/img/authenticators/authenticators-email-enroll-otp.png)

</div>

### 7. The user is signed in

The next response status will be `SUCCESS` and contain an access token. The user has been authenticated.
