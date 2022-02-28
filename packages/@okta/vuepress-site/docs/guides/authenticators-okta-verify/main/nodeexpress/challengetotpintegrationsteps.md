### 1: Initiate the sign-in and choose Okta Verify TOTP option

First, the user initiates the user sign-in with username and password. If enrolled in Okta Verify, show options to verify by push notification or TOTP. In this flow, they choose TOTP, and a value of `totp` is sent to
`IdxTransaction.idx.proceed()`. These first steps are common across the challenge flows and are described in [Initiate sign-in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication).

The user chooses TOTP type and the value of `totp` is sent to `IdxTransaction.idx.proceed()`.

### 2: Display page with TOTP input field

The `IdxTransaction` response from the last step in [Initiate sign-in for Okta Verify challenge](#_1-initiate-use-case-requiring-authentication) indicates that the user must enter a TOTP code in your app. Specifically, `IdxTransaction.idx.proceed()` returns a `status` of `PENDING` and `nextStep.name` equal to `challenge-authenticator`, which indicates that the user needs to look up the TOTP in Okta Verify and enter the value in your app. An example `IdxTransaction` response follows:

```json
{
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
      },
    ],
  },
}
```

Using the `IdxTransaction` response, display a page to input the TOTP.

<div class="common-image-format">

![Page displaying TOTP input field](/img/authenticators/authenticators-oktaverify-challenge-otp.png)

</div>

### 3. Open Okta Verify and find TOTP

The user opens Okta Verify and finds the TOTP for the corresponding account.

### 4. Submit the TOTP

After the user enters and submits the TOTP, call `IdxTransaction.idx.proceed()` passing in the verification code.

```javascript
  const { verificationCode } = req.body;
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.proceed({ verificationCode });
```

### 5: Complete successful sign-in

Eventually, `IdxTransaction` returns a status of `SUCCESS` along with access and ID tokens. The page exits the polling and redirects the user to the default home page for the signed in user.
