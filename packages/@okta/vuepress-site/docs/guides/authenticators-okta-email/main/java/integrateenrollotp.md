### 1 - 4. Sign in and select authenticator

The Enrollment flow follows the same first four steps as the Challenge flow:

* Build a sign-in page on the client
* Authenticate the user credentials
* Handle the response from the sign-in flow
* Display a list of possible authenticator factors

### 5. Check authenticator status and send email to the user

When the user selects the Email Authenticator, call the `selectAuthenticator()` method, similar to above.

```java
return idxAuthenticationWrapper.selectAuthenticator(proceedContext,  authenticator);
```

If the call is successful, Okta sends an enrollment email to the user that contains the OTP. The server returns a status of `AWAITING_AUTHENTICATOR_ENROLLMENT` to indicate it is waiting for the user to check their email and either click the magic link in it or enter the OTP.

```java
case AWAITING_AUTHENTICATOR_ENROLLMENT:
    console.writer().println("Check email for activation instructions");
    String code = console.readLine("Enter TOTP code from email: ");
    return idxAuthenticationWrapper.verifyAuthenticator(proceedContext, new VerifyAuthenticatorOptions(code));
```

### 6. Open email and copy OTP

Next, the user opens the email and copies the OTP. The following screenshot shows the OTP in an email generated from the **Email Factor Verification** template.

<div class="common-image-format">

![Screenshot of OTP in enrollment page](/img/authenticators/authenticators-email-enroll-otp.png)

**TODO:** need java version

</div>

### 7. The User is logged in

The next response status will be `SUCCESS` and contain an access token. The user has been authenticated.
